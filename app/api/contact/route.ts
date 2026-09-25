/*
 * File: route.ts
 * Purpose: API endpoint for contact form submission
 */

import { NextRequest, NextResponse } from "next/server";
import { ContactFormData } from "@/types";

/**
 * Handle POST request to /api/contact
 * Forwards contact form data to backend Lambda function
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as ContactFormData;

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Forward to Lambda function via API Gateway
    // For now, return success response
    return NextResponse.json(
      { message: "Message received. Lambda integration coming in Phase 2." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
