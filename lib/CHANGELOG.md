# @m2d/remark-docx

## 1.0.0

### Major Changes

- The following dependencies were upgraded:

  ### mdast2docx: 0.4.1 → 1.4.1

  **Minor Changes**
  - The following @m2d/\* dependencies were upgraded:
  - feat: add trimInnerSpaces option to section processing for whitespace normalization
  - Attempt to keep entire code block on same page.
  - feat/utils: add mergeOptions function for deep merging user and default options
  - Support block elements inside table cell, e.g., table inside table
  - refactor: enhance table plugin options merging and alignment handling - headers can now be aligned independent of rest of table
  - Update types
  - The following @m2d/\* dependencies were upgraded:
  - Refactored `createPersistentCache` to accept a `config` object for optional settings.
  - **In-memory cache sharing**: Pass a shared cache object to coordinate between modules or tabs.
  - **Configurable cache strategies**:
  - `cacheTarget`: choose where data is stored — RAM, IndexedDB, or both.
  - `parallel`: race compute and read to optimize latency.
  - Update types to ensure sufficient data for converting to jsx
  - refactor plugin interface to update postprocess hook. Since there is very limited scope for utilizing the document object once creted, we are moving the postprocess hook to be called just before creating the document object. It gets list of sections which can be finished up just before converting to docx.
  - Better type safety and minor rename cacheTarget to cacheMode
  - fix: Bring back the Extended Node support and default to EmptyNode
  - Simplify types.
  - fix: Update types for supporting HTML and advanced tables
  - fix tag types in node data
  - Support block node inside table cells. Add tag to data for easy JSX creation
  - fix advanced table handling
  - fix: empty HTML table cells
  - Added support for optimized in-memory caching of resolved image data.
  - Introduced `cacheConfig.cache` option to share or inject a memory cache instance across multiple plugin invocations.
  - Consumers can now fine-tune cache behavior using `cacheConfig.parallel` (to avoid redundant parallel resolutions) and `cacheConfig.cacheMode` (choose between `"memory"`, `"idb"`, or `"both"`).
  - Enhances image resolution performance in multi-page or repeated image scenarios, especially when used across sessions or documents.
  - provide cache field to avoid entire cacheConfig option for simple cache sharing optimizations.
  - Store type in \_type for conversion to JSX
  - Ensure enough data is available on node after processing to convert to JSX.
  - Added support for optimized in-memory caching of resolved mermaid data.
  - Introduced `cacheConfig.cache` option to share or inject a memory cache instance across multiple plugin invocations.
  - Consumers can now fine-tune cache behavior using `cacheConfig.parallel` (to avoid redundant parallel resolutions) and `cacheConfig.cacheMode` (choose between `"memory"`, `"idb"`, or `"both"`).
  - Enhances mermaid resolution performance in multi-page or repeated mermaid scenarios, especially when used across sessions or documents.
  - fix: handle edgecase when cache is deleberately set to null.
  - provide cache field to avoid entire cacheConfig option for simple cache sharing optimizations.
  - Update types to be competible with the rest of the ecosystem.
  - The following @m2d/\* dependencies were upgraded:
  - Add configurable SVG rendering fixes to improve diagram rendering, particularly for Mermaid pie charts. Extract SVG fixes into a separate exportable function that can be customized through plugin options.
  - fix: Mermaid title alignment in pie chart
  - Add caching to indexeddb

  **Major Changes**
  - Upgrade to V1 - @see - https://github.com/md2docx/mdast2docx/discussions/15

  **Patch Changes**
  - The following @m2d/\* dependencies were upgraded:
  - Fix HTML parsing issues in case of empty tags.
  - The following @m2d/\* dependencies were upgraded:
  - Keep enough metadata for JSX creation.
  - Upgrade core package to v1
  - The following @m2d/\* dependencies were upgraded:
  - fix: td or th tags should be lowercase
  - The following @m2d/\* dependencies were upgraded:
  - Fix tags
  - The following @m2d/\* dependencies were upgraded:
  - fix: INPUT element style parsing
  - fix: Extract styles in createFragmentWithParentNodes as well to avoid misleading data.
  - The following @m2d/\* dependencies were upgraded:
  - Expand data type to handle more of HTML Input element data.
  - fix: Improve HTML Input element handling
  - Update types
  - Update image plugin
  - Do cache cleanup in postprocess hook
  - Update types and add image placeholder option
  - Enhance: Allow to provide placeholder image when not able to fetch image or some error.

## 0.1.0

### Minor Changes

- 8868e3a: Add support for mermaid, improve image handling,...
