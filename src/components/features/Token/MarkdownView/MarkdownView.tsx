"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownViewProps {
  content?: string | null;
}

export function MarkdownView({
  content,
}: MarkdownViewProps): React.ReactElement | null {
  if (!content) return null;
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-4 prose-headings:mt-6 prose-headings:mb-2 prose-headings:pl-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: (props) => (
            <p
              className="my-4 pl-2 leading-relaxed indent-8"
              {...props}
            />
          ),
          h1: (props) => (
            <h1
              className="mt-0 mb-4 text-3xl font-semibold"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="mt-6 mb-3  text-2xl font-semibold"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="mt-5 mb-2 text-2xl font-semibold"
              {...props}
            />
          ),
          table: ({ children, ...props }) => (
            <div className="my-4 overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden rounded-xs border border-neutral-400">
                <table
                  className="min-w-full table-fixed border-neutral-400 border-separate border-spacing-0 text-sm"
                  {...props}
                >
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead
              className="bg-neutral-500/50 dark:bg-neutral-500/30"
              {...props}
            >
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody {...props}>{children}</tbody>
          ),
          tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
          th: ({ children, ...props }) => (
            <th
              className="border border-border px-3 py-2 text-left font-medium"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-border px-3 py-2 align-top"
              {...props}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownView;
