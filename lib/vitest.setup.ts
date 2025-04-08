import { vi } from "vitest";

// Mock createImageBitmap
globalThis.createImageBitmap = vi.fn(async () => {
  return {
    width: 100,
    height: 100,
    close: vi.fn(() => {}),
  };
});

// @ts-expect-error Mock getBBox (required for SVG operations)
SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
});

const mockFetch = vi.fn(async (url: string) => {
  if (url.endsWith(".svg")) {
    const svgText = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" fill="yellow" />
      </svg>
    `.trim();

    return {
      ok: true,
      status: 200,
      headers: {
        get: (header: string) => {
          if (header.toLowerCase() === "content-type") return "image/svg+xml";
          return null;
        },
      },
      text: async () => svgText,
      arrayBuffer: async () => new TextEncoder().encode(svgText).buffer,
    };
  }

  // For PNG or other image mocks
  const fakePng = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG file signature
  return {
    ok: true,
    status: 200,
    headers: {
      get: (header: string) => {
        if (header.toLowerCase() === "content-type") return "image/png";
        return null;
      },
    },
    arrayBuffer: async () => fakePng.buffer,
  };
}) as any;

vi.stubGlobal("fetch", mockFetch);

globalThis.fetch = mockFetch;

// setupTests.ts or in your test file

globalThis.Image = class {
  _src = "";
  width?: number;
  height?: number;
  onload: (() => void) | null = null;
  onerror: ((err?: unknown) => void) | null = null;

  constructor(width?: number, height?: number) {
    this.width = width;
    this.height = height;

    // Simulate async image load
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 10);
  }

  set src(value: string) {
    this._src = value;
    // Simulate async loading
    setTimeout(() => {
      if (this.onload) this.onload();
    }, 10);
  }

  get src() {
    return this._src;
  }
} as unknown as typeof Image;
