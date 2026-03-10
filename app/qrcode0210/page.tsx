"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import QRCode from "qrcode";

const LOGO_SIZE_RATIO = 0.28;
const LOGO_PADDING = 8;

export default function QRCodePage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(320);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);

  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. 组件卸载或 svgUrl 变更时释放之前的 Object URL
  useEffect(() => {
    return () => {
      if (svgUrl && svgUrl.startsWith("blob:")) {
        URL.revokeObjectURL(svgUrl);
      }
    };
  }, [svgUrl]);

  const getQROptions = useCallback(
    (overrides?: { type?: "svg" }) => ({
      width: size,
      margin: 2,
      errorCorrectionLevel: "H" as const,
      color: { dark: fgColor, light: bgColor },
      ...overrides,
    }),
    [size, fgColor, bgColor]
  );

  const drawLogoOnCanvas = useCallback(
    (canvas: HTMLCanvasElement, logoDataUrl: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("无法获取 canvas 2d 上下文"));
          return;
        }
        const img = new Image();
        img.onerror = () => reject(new Error("中心图片加载失败"));
        img.onload = () => {
          const logoSize = size * LOGO_SIZE_RATIO;
          const x = (size - logoSize) / 2;
          const y = (size - logoSize) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.arc(
            size / 2,
            size / 2,
            logoSize / 2 + LOGO_PADDING,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, logoSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, x, y, logoSize, logoSize);
          ctx.restore();
          resolve();
        };
        img.src = logoDataUrl;
      }),
    [size]
  );

  const generateQR = useCallback(async () => {
    if (!text) return;
    setError(null);
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      const qrOptions = getQROptions();

      await QRCode.toCanvas(canvas, text, qrOptions);

      if (logo) {
        await drawLogoOnCanvas(canvas, logo);
      }
      setPngUrl(canvas.toDataURL("image/png"));

      const svgString = await QRCode.toString(text, {
        ...getQROptions(),
        type: "svg",
      });

      // 释放之前的 blob URL 再创建新的
      if (svgUrl && svgUrl.startsWith("blob:")) {
        URL.revokeObjectURL(svgUrl);
      }
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      setSvgUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "生成二维码失败，请重试"
      );
      setPngUrl(null);
      setSvgUrl((prev) => {
        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
        return null;
      });
    } finally {
      setIsGenerating(false);
    }
  }, [text, logo, getQROptions, drawLogoOnCanvas, svgUrl]);

  const download = useCallback((url: string | null, name: string) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    // blob URL 在生成新图或组件卸载时统一释放，此处不 revoke 以便用户可重复下载
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result === "string") setLogo(result);
          fileInputRef.current && (fileInputRef.current.value = "");
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          高级二维码生成器
        </h1>

        {error && (
          <div
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="输入网址或文本"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
              aria-label="输入网址或文本"
            />

            <div>
              <label className="text-sm text-gray-500">尺寸 {size}px</label>
              <input
                type="range"
                min="200"
                max="600"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
                aria-label="二维码尺寸"
              />
            </div>

            <div className="flex gap-4">
              <div>
                <label className="text-sm text-gray-500">前景色</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 bg-transparent"
                  aria-label="前景色"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">背景色</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 bg-transparent"
                  aria-label="背景色"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                上传中心图片（自动圆形裁剪）
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm"
                aria-label="上传中心图片"
              />
            </div>

            <button
              onClick={() => generateQR()}
              disabled={!text || isGenerating}
              className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="生成二维码"
            >
              {isGenerating ? "生成中…" : "生成二维码"}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {pngUrl && (
              <>
                <img
                  src={pngUrl}
                  alt="生成的二维码"
                  className="rounded-xl border border-gray-300"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => download(pngUrl, "qrcode.png")}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    aria-label="下载 PNG"
                  >
                    下载 PNG
                  </button>
                  <button
                    onClick={() => download(svgUrl, "qrcode.svg")}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    aria-label="下载 SVG"
                  >
                    下载 SVG
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
