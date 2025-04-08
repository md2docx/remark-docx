import { describe, it, vi } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import fs from "fs";
import { remarkDocx } from "../src";

const markdown = fs.readFileSync("../sample.md", "utf-8");

describe("toDocx", () => {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkDocx);
  it("should handle remark-docxs", async ({ expect }) => {
    const docxBlob = await processor.process(markdown).then(res => res.result);
    expect(docxBlob).toBeInstanceOf(Blob);
  });

  it("should not have any console.log", async ({ expect }) => {
    const consoleSpy = vi.spyOn(console, "log");
    await processor.process(markdown).then(res => res.result);
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
