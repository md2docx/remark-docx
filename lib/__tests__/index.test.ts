import { describe, it } from "vitest";
import { toDocx } from "@m2d/core"; // Adjust path based on your setup
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import fs from "fs";
import { remark-docxPlugin } from "../src";

const markdown = fs.readFileSync("../sample.md", "utf-8");

describe("toDocx", () => {
  it("should handle remark-docxs", async ({ expect }) => {
    const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

    const docxBlob = await toDocx(mdast, {}, { plugins: [remark-docxPlugin()] });

    expect(docxBlob).toBeInstanceOf(Blob);
  });
});
