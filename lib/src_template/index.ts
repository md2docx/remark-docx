import { IPlugin } from "@m2d/core";
import { InlineDocxNodes } from "@m2d/core/utils";
import type { Paragraph, Table } from "docx";

interface IEmojiPluginOptions {
  /**
   * A mapping of emoji shortcodes to their corresponding Unicode characters.
   * This allows for easy customization of the emoji representation.
   */
  emojis?: Record<string, string>;
}

/**
 * Emoji plugin for @m2d/core.
 * This plugin provides support for custom emoji transformation within Markdown content
 * during conversion to DOCX format.
 */
export const emojiPlugin: (options?: IEmojiPluginOptions) => IPlugin = options => {
  // merge options with the default options if needed
  return {
    /**
     * Handles inline-level MDAST nodes (e.g., text, strong, emphasis).
     *
     * @param docx - DOCX context (factory methods, styles, etc.)
     * @param node - MDAST inline node to be processed
     * @param runProps - Formatting properties like bold, italics, etc.
     * @param definitions - Reference definitions (e.g., for links)
     * @param footnoteDefinitions - Footnote mappings
     * @param inlineChildrenProcessor - Helper function to process child inline nodes
     * @returns Array of InlineDocxNodes representing the DOCX output
     */
    inline: async (
      docx,
      node,
      runProps,
      definitions,
      footnoteDefinitions,
      inlineChildrenProcessor,
    ) => {
      const docxNodes: InlineDocxNodes[] = [];

      if (node.type === "") {
        /**
         * TODO: Add logic to handle specific inline node types (e.g., emoji).
         * This block should convert the node into one or more InlineDocxNodes.
         */
        node.type = "";
      }

      return docxNodes;
    },

    /**
     * Handles block-level MDAST nodes (e.g., paragraphs, headings, lists).
     *
     * @param docx - DOCX context
     * @param node - MDAST block node to be processed
     * @param paraProps - Paragraph formatting properties
     * @param blockChildrenProcessor - Processes child block nodes recursively
     * @param inlineChildrenProcessor - Processes child inline nodes inside block nodes
     * @returns Array of Paragraph or Table objects representing DOCX content
     */
    block: async (docx, node, paraProps, blockChildrenProcessor, inlineChildrenProcessor) => {
      const docxNodes: (Paragraph | Table)[] = [];

      if (node.type === "") {
        /**
         * TODO: Add logic to handle specific block node types.
         * This block should convert the node into one or more Paragraph/Table objects.
         */
        node.type = "";
      }

      return docxNodes;
    },

    /**
     * Optional: Modifies the DOCX document metadata or style before rendering.
     *
     * @param props - Root-level properties such as title, styles, metadata, etc.
     */
    root: props => {
      // Example: Override the document title
      props.title = "My custom title";
    },

    /**
     * Optional: Runs before conversion starts, allowing transformation or filtering
     * of the MDAST (Markdown Abstract Syntax Tree).
     *
     * @param tree - The full MDAST tree before processing
     */
    preprocess: tree => {
      // TODO: Modify or traverse the MDAST tree if needed (e.g., convert emoji syntax)
    },
  };
};
