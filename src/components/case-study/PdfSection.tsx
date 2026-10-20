/*
 * File: PdfSection.tsx
 * Purpose: An inline PDF preview for a case study — embeds a document (a paper,
 *          report, or write-up) directly on the project page so a reader can
 *          page through it without leaving the site, with a download/open-in-new
 *          -tab fallback for browsers that won't render an embedded PDF. The file
 *          is served from /public (e.g. /projects/<slug>/report.pdf), so adding
 *          the document is dropping the file in and setting `file` — no code
 *          change. Until the file exists the frame still renders with its
 *          open-in-new-tab link, matching how the image sections stay complete
 *          before their assets are added.
 */

'use client';

import { motion } from 'framer-motion';

export interface PdfDoc {
  /** URL of the PDF, served from /public (e.g. "/projects/depth-contact-ai/report.pdf"). */
  file: string;
  /** Short label shown above the viewer and used for the download filename. */
  title: string;
  /** Optional one-line caption under the embed. */
  caption?: string;
}

interface PdfSectionProps {
  doc: PdfDoc;
}

/**
 * Render an embedded PDF with a download / open-in-new-tab action.
 *
 * @param doc - The document to embed (file URL + title + optional caption)
 * @returns A framed PDF viewer
 */
export function PdfSection({ doc }: PdfSectionProps): React.ReactElement {
  return (
    <motion.div
      className="pdf-embed"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="pdf-embed-bar">
        <div className="pdf-embed-actions">
          <a href={doc.file} target="_blank" rel="noopener noreferrer" className="secondary-action sweep-button">
            <span>Open in new tab</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 15 15 5M8 5h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href={doc.file} download className="secondary-action sweep-button">
            <span>Download</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 17h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="pdf-embed-frame">
        {/* A plain <object> renders the browser's native PDF viewer and falls
            back to the child link when the browser can't display it inline. */}
        <object data={`${doc.file}#view=FitH`} type="application/pdf" className="pdf-embed-object">
          <div className="pdf-embed-fallback">
            <p>Your browser can&apos;t preview this PDF inline.</p>
            <a href={doc.file} target="_blank" rel="noopener noreferrer" className="primary-action sweep-button">
              <span>Open the document</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 15 15 5M8 5h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </object>
      </div>

    </motion.div>
  );
}
