## 🧩 Plugin Template for `mdast2docx` & `@m2d/remark-docx` <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 40px"/>

[![test](https://github.com/md2docx/md2docx-plugin-template/actions/workflows/test.yml/badge.svg)](https://github.com/md2docx/md2docx-plugin-template/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/md2docx/md2docx-plugin-template/maintainability) [![codecov](https://codecov.io/gh/md2docx/md2docx-plugin-template/graph/badge.svg)](https://codecov.io/gh/md2docx/md2docx-plugin-template) [![Version](https://img.shields.io/npm/v/@m2d/emoji.svg?colorB=green)](https://www.npmjs.com/package/@m2d/emoji) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/emoji.svg)](https://www.npmjs.com/package/@m2d/emoji) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/emoji)

> This repository serves as a starting point for building plugins that extend the functionality of [`mdast2docx`](https://www.npmjs.com/package/mdast2docx), [`@m2d/core`](https://www.npmjs.com/package/@m2d/core) and [`@m2d/remark-docx`](https://www.npmjs.com/package/@m2d/remark-docx).

<details>
<summary style="cursor:pointer"><h2 style="display:inline-block">Features</h2></summary>

This template offers the following pre-configured features. Additionally, your repository will automatically be re-branded with the help of workflows and post-install scripts.

✅ Monorepo powered by Turborepo and GitHub actions for automating building, testing, and deploying your plugin library

✅ Examples with Next.js, and Vite to showcase how your library can be utilized, also helps in quick manual testing

✅ Examples pre-configured for Light/Dark theme based on user preference

✅ Examples ready to be deployed to Vercel

✅ Code of Conduct and contributing files, ready for customization

✅ Prettier and linter configured according to modern best practices (Feel free to add your flavor)

✅ Recommended VSCode extensions - Prettier and [Kanban board](https://github.com/mayank1513/vscode-extension-trello-kanban-board) for code formatting and project management directly within your IDE

✅ Test setup with Vitest - A modern and fast testing framework supporting Jest-like APIs

✅ Workflows to automate testing on every pull-request or code push event

✅ Workflow to automatically publish and create GitHub releases when you update your library's `package.json` file.

✅ Workflow to automatically rebrand the entire template based on your repository name. (Refer [TODO.md](./TODO.md))

✅ Plus, this repo includes a quick checklist for configuring Codecov and other badges, setting up your docs website on GitHub pages, and more. See [Checklist](./TODO.md) or open TKB(Workspace) if you have installed the Trello-Kanban-Board extension.

</details>

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Star [this repository](https://github.com/md2docx/md2docx-plugin-template) and share it with your friends.

---

## Getting Started:

This template is based on [Turborepo Template](https://github.com/react18-tools/turborepo-template/). But this one is optimized for md2docx plugins. It includes pre-configured unit-tests, a lot of extra stuff provided by the turborepo-template is removed, and comes with dependencies and scripts optimized for md2docx plugin development.

To get started, simply click on the `"Use this template"` button to create a new repository based on this template, and install dependencies. Customize it according to your requirements for your next md2docx plugin.

For detailed instructions and a checklist, please refer to [TODO.md](./TODO.md).

### 🤩 Don't forget to star [this repository](https://github.com/react18-tools/turborepo-template)!

Looking for a hands-on course to get started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescript/?referralCode=851A28F10B254A8523FE)

---

### 🧰 Helpful References

- [`@m2d/core`](https://www.npmjs.com/package/@m2d/core) – Core MDAST to DOCX engine
- [`@m2d/remark-docx`](https://www.npmjs.com/package/@m2d/remark-docx) – Remark plugin
- [Unified Ecosystem](https://unifiedjs.com) – AST-based processors for markdown, html, etc.
- [MDAST Spec](https://github.com/syntax-tree/mdast) – Markdown Abstract Syntax Tree

---

### 💡 Derive Ideas from existing Plugins

- `@m2d/math`: Parse math blocks and convert to equation DOCX
- `@m2d/image`: Convert Markdown/HTML images to inline DOCX images
- `@m2d/html`: Parse raw HTML into extended MDAST with styles
- `@m2d/table`: Advanced table support with merged cells, widths, styles

---

### 🙌 Contribute

If you’re building a plugin you'd like to share, let us know or open a PR in the [mdast2docx plugins repo](https://github.com/m2djs/mdast2docx)!

> <img src="https://raw.githubusercontent.com/mayank1513/mayank1513/main/popper.png" style="height: 20px"/> Enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsor](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
