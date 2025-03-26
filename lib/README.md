# @m2d/emoji

[![test](https://github.com/md2docx/md2docx-plugin-template/actions/workflows/test.yml/badge.svg)](https://github.com/md2docx/md2docx-plugin-template/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/md2docx/md2docx-plugin-template/maintainability) [![codecov](https://codecov.io/gh/md2docx/md2docx-plugin-template/graph/badge.svg)](https://codecov.io/gh/md2docx/md2docx-plugin-template) [![Version](https://img.shields.io/npm/v/@m2d/emoji.svg?colorB=green)](https://www.npmjs.com/package/@m2d/emoji) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@m2d/emoji.svg)](https://www.npmjs.com/package/@m2d/emoji) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@m2d/emoji)

> Emoji shortcode support for `mdast2docx`

This plugin adds support for emoji shortcodes (e.g., `:smile:`, `:rocket:`) in your Markdown-to-DOCX conversion pipeline. It replaces recognized emoji shortcodes with their corresponding Unicode characters during the MDAST transformation.

---

## ✨ Features

- Converts emoji shortcodes to Unicode emojis (e.g., `:tada:` → 🎉)
- Compatible with [`@m2d/core`](https://www.npmjs.com/package/@m2d/core)
- Works seamlessly within the `mdast2docx` plugin ecosystem
- Easy to integrate and lightweight

---

## 📦 Installation

```bash
pnpm install @m2d/emoji
```

**_or_**

```bash
yarn add @m2d/emoji
```

**_or_**

```bash
npm add @m2d/emoji
```

---

## 🧠 How It Works

This plugin scans all text nodes for emoji shortcodes (e.g., `:fire:`, `:sparkles:`) and replaces them with matching Unicode emojis using a predefined emoji JSON mapping.

---

## 🔍 Emoji Support

It uses the [GitHub-style emoji shortcodes](https://github.com/ikatyang/emoji-cheat-sheet) and more — if a shortcode is not recognized, it will remain unchanged.

---

## 🛠️ Development

```bash
# Clone and install dependencies
git clone https://github.com/md2docx/emoji-plugin
cd emoji-plugin
npm install

# Build / Test / Dev
npm run build
```

---

## 📄 License

Licensed under the **MPL-2.0** License.

---

## ⭐ Support Us

If you find this useful:

- ⭐ Star [mdast2docx](https://github.com/md2docx/mdast2docx) on GitHub
- ❤️ Consider [sponsoring](https://github.com/sponsors/mayank1513)

---

<p align="center">Made with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
