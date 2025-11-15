import type { OutputType } from "docx";
import type { Root } from "mdast";
import { type IDocxProps, type ISectionProps, toDocx } from "mdast2docx";
import {
  emojiPlugin,
  htmlPlugin,
  imagePlugin,
  listPlugin,
  mathPlugin,
  mermaidPlugin,
  tablePlugin,
} from "mdast2docx/dist/plugins";
import type { Plugin } from "unified";

/**
 * A unified compiler plugin to convert MDAST to DOCX output using `mdast2docx`.
 *
 * @param outputType - The output type for DOCX generation (e.g. "blob", "buffer", "base64").
 *                     Defaults to `"blob"`.
 * @param docxProps - Global DOCX document properties passed to `toDocx`. Optional.
 * @param sectionProps - Section-level props including plugin overrides. Optional.
 * @returns A unified plugin that injects a DOCX compiler.
 */
export const remarkDocx: Plugin<
  [
    outputType?: OutputType,
    docxProps?: IDocxProps,
    sectionProps?: ISectionProps,
    pluginProps?: {
      mermaid?: Parameters<typeof mermaidPlugin>[0];
      list?: Parameters<typeof listPlugin>[0];
      table?: Parameters<typeof tablePlugin>[0];
      emoji?: Parameters<typeof emojiPlugin>[0];
      image?: Parameters<typeof imagePlugin>[0];
    },
  ],
  Root
> = function remarkDocxPlugin(
  outputType = "blob",
  docxProps = {},
  sectionProps = {},
  pluginProps,
) {
  // @ts-expect-error -- compiler type does not support Promise
  this.compiler = (node) => {
    // If plugins are not defined in sectionProps, use the default set
    if (!sectionProps.plugins) {
      const plugins = [
        mermaidPlugin(pluginProps?.mermaid),
        htmlPlugin(),
        listPlugin(pluginProps?.list),
        mathPlugin(),
        tablePlugin(pluginProps?.table),
        emojiPlugin(pluginProps?.emoji),
        imagePlugin(pluginProps?.image),
      ];
      sectionProps.plugins =
        typeof window === "undefined"
          ? plugins.slice(2, -1) // server-side: skip html & image plugins
          : plugins;
    }

    return toDocx(
      node as Root,
      docxProps,
      sectionProps,
      outputType,
    ) as Promise<OutputType>;
  };
  return (node) => node;
};
