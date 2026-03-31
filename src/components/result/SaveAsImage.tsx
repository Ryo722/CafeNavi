import { useState, useCallback, type RefObject } from "react";
import html2canvas from "html2canvas";
import { useTranslation } from "../../lib/i18n";

type SaveAsImageProps = {
  captureRef: RefObject<HTMLDivElement | null>;
};

export function SaveAsImage({ captureRef }: SaveAsImageProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  const handleSave = useCallback(async () => {
    if (!captureRef.current) return;

    setStatus("saving");

    // Add watermark temporarily
    const watermark = document.createElement("div");
    watermark.textContent = "CafeNavi";
    watermark.style.cssText = `
      position: absolute;
      bottom: 8px;
      right: 12px;
      font-size: 12px;
      color: rgba(120, 80, 40, 0.4);
      font-weight: bold;
      pointer-events: none;
      z-index: 9999;
    `;

    const target = captureRef.current;
    const originalPosition = target.style.position;
    target.style.position = "relative";
    target.appendChild(watermark);

    try {
      const canvas = await html2canvas(target, {
        backgroundColor: "#fffbf5",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Remove watermark
      target.removeChild(watermark);
      target.style.position = originalPosition;

      const link = document.createElement("a");
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      link.download = `cafenavi-result-${dateStr}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      // Remove watermark on error too
      if (target.contains(watermark)) {
        target.removeChild(watermark);
      }
      target.style.position = originalPosition;
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }, [captureRef]);

  const buttonText = () => {
    switch (status) {
      case "saving":
        return t("share.saving");
      case "saved":
        return t("share.saved");
      case "error":
        return t("share.saveFailed");
      default:
        return t("share.saveImage");
    }
  };

  const buttonStyle = () => {
    switch (status) {
      case "saved":
        return "bg-green-100 text-green-700 border-green-300";
      case "error":
        return "bg-red-100 text-red-700 border-red-300";
      case "saving":
        return "bg-stone-100 text-stone-400 border-stone-200 cursor-wait";
      default:
        return "bg-cafe-50 text-cafe-700 border-cafe-200 hover:bg-cafe-100 active:bg-cafe-200 hover:scale-[1.02] active:scale-[0.98]";
    }
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={status === "saving"}
      className={`
        w-full flex items-center justify-center gap-2 min-h-12
        rounded-xl font-bold text-sm border
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-400 focus-visible:ring-offset-2
        ${buttonStyle()}
      `}
      aria-label={t("share.saveImage")}
    >
      {buttonText()}
    </button>
  );
}
