import { IPlugin } from "@m2d/core";
import emojis from "./emoji.json";

interface IEmojiPluginOptions {
  /**
   * A mapping of emoji shortcodes to their corresponding Unicode characters.
   * This allows for easy customization or extension of the emoji representation.
   */
  emojis?: Record<string, string>;
}

/**
 * This plugin adds support for emoji shortcodes (e.g., `:smile:`, `:rocket:`) in your Markdown-to-DOCX
 * conversion pipeline. It replaces recognized emoji shortcodes with their corresponding Unicode
 * characters during the MDAST transformation.
 */
export const emojiPlugin: (options?: IEmojiPluginOptions) => IPlugin = options => {
  const consolidatedEmojis = {
    ...emojis,
    ...options?.emojis,
  };
  return {
    /**
     * Handles inline-level nodes in the MDAST, specifically looking for emoji shortcodes.
     *
     * @param _docx - The DOCX context (not used in this plugin).
     * @param node - The MDAST node being processed.
     * @returns An empty array since no new nodes are being added.
     */
    inline: async (_docx, node) => {
      if (node.type === "text") {
        node.value = node.value.replace(
          /:[a-z0-9_+-]+:/g,
          match =>
            consolidatedEmojis[match.slice(1, -1) as keyof typeof consolidatedEmojis] ?? match,
        );
      }
      return [];
    },
  };
};
