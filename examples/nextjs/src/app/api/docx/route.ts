import { readFileSync } from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import { remarkDocx } from "@m2d/remark-docx";
import { NextResponse } from "next/server";

const docxProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkFrontmatter)
  .use(remarkMath)
  .use(remarkDocx, "arraybuffer");

/**
 * Generate a docx file from markdown on server side.
 * @returns docx file
 */
export const GET = async () => {
  const md = readFileSync("../../sample.md", "utf-8");
  const buffer = await docxProcessor.process(md).then(res => res.result);
  return new NextResponse(new Uint8Array(buffer as ArrayBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="sample.docx"',
    },
  });
};
