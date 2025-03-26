import { describe, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import fs from "fs";
import { remarkDocx } from "../src";

const markdown = fs.readFileSync("../sample.md", "utf-8");

describe("toDocx", () => {
  it("should handle remark-docxs", async ({ expect }) => {
    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkDocx);

    const docxBlob = await processor.process(markdown).then(res => res.result);

    expect(docxBlob).toBeInstanceOf(Blob);
  });
});
