import { useState } from "react";

type ShareButtonsProps = {
  coffeeName: string;
  score: number;
};

const SITE_URL = "https://ryo722.github.io/CafeNavi/";

function buildShareText(coffeeName: string, score: number): string {
  return `CafeNaviで診断したら、私にぴったりのコーヒーは【${coffeeName}】でした！マッチ度${score}% ☕ #CafeNavi`;
}

export function ShareButtons({ coffeeName, score }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare] = useState(() => typeof navigator.share === "function");

  const shareText = buildShareText(coffeeName, score);

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SITE_URL)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLine = () => {
    const text = `${shareText}\n${SITE_URL}`;
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = SITE_URL;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWebShare = async () => {
    try {
      await navigator.share({
        title: "CafeNavi - コーヒー診断",
        text: shareText,
        url: SITE_URL,
      });
    } catch {
      // user cancelled or error – ignore
    }
  };

  const buttonBase =
    "flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cafe-400 focus:ring-offset-2 cursor-pointer";

  return (
    <div className="space-y-3">
      <h3 className="text-center text-sm font-medium text-stone-500">
        結果をシェアする
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* X (Twitter) */}
        <button
          type="button"
          onClick={handleTwitter}
          className={`${buttonBase} bg-black text-white hover:bg-gray-800 active:bg-gray-900 min-w-[100px]`}
          aria-label="Xでシェア"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>X</span>
        </button>

        {/* LINE */}
        <button
          type="button"
          onClick={handleLine}
          className={`${buttonBase} bg-[#06C755] text-white hover:bg-[#05b34d] active:bg-[#049a42] min-w-[100px]`}
          aria-label="LINEでシェア"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span>LINE</span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          className={`${buttonBase} border-2 border-cafe-300 text-cafe-700 hover:bg-cafe-50 active:bg-cafe-100 min-w-[100px]`}
          aria-label="リンクをコピー"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>{copied ? "コピーしました！" : "リンクコピー"}</span>
        </button>

        {/* Web Share API */}
        {canShare && (
          <button
            type="button"
            onClick={handleWebShare}
            className={`${buttonBase} bg-cafe-700 text-white hover:bg-cafe-800 active:bg-cafe-900 min-w-[100px]`}
            aria-label="共有"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span>共有</span>
          </button>
        )}
      </div>
    </div>
  );
}
