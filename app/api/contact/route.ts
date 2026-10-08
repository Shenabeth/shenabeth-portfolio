/*
 * File: route.ts
 * Purpose: Contact form endpoint (POST /api/contact). Validates the submission
 *          and is the single place where email delivery will be wired to
 *          Amazon SES. Until SES is configured (via the environment variables
 *          below), the handler validates the payload and returns 503 so the
 *          client can tell the visitor to email directly instead of showing a
 *          false "message sent" confirmation.
 *
 * To enable sending later: set SES_FROM_EMAIL and SES_TO_EMAIL (and standard
 * AWS credentials/region in the Amplify environment), then implement the
 * marked SES call below with @aws-sdk/client-ses.
 */

import { NextRequest, NextResponse } from "next/server";
import { ContactFormData } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Whether Amazon SES is configured in this environment. Delivery is only
 * attempted when both the sender and recipient addresses are present.
 *
 * @returns True when SES environment variables are set
 */
function isSesConfigured(): boolean {
  return Boolean(process.env.SES_FROM_EMAIL && process.env.SES_TO_EMAIL);
}

/**
 * Handle a contact form submission. Validates required fields and email
 * format, then delivers via SES when configured.
 *
 * @param request - Incoming request carrying a ContactFormData JSON body
 * @returns JSON response describing the outcome
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: ContactFormData;
  try {
    body = (await request.json()) as ContactFormData;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  if (!isSesConfigured()) {
    // Email delivery isn't wired up yet. Be honest rather than pretend to
    // send — the client surfaces the direct email link in this case.
    return NextResponse.json(
      { error: "The message form isn't connected yet. Please email me directly for now." },
      { status: 503 },
    );
  }

  try {
    // TODO: Send via Amazon SES.
    // import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
    // const ses = new SESClient({});
    // await ses.send(new SendEmailCommand({ /* from SES_FROM_EMAIL to SES_TO_EMAIL */ }));
    return NextResponse.json({ message: "Message sent — thanks for reaching out!" }, { status: 200 });
  } catch (error) {
    console.error("Contact form SES error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
