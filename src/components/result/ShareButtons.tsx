import { useState, useCallback } from "react";
import { useTranslation } from "../../lib/i18n";

type ShareButtonsProps = {
  coffeeName: string;
  score: number;
};

const SHARE_URL = "https://ryo722.github.io/CafeNavi/";

export function ShareButtons({ coffeeName, score }: ShareButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const shareText = `CafeNaviで診断！私にぴったりのコーヒーは【${coffeeName}】でした☕ マッチ度${score}% #CafeNavi`;

  const handleTwitter = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SHARE_URL)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [shareText]);

  const handleLine = useCallback(() => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [shareText]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${SHARE_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = `${shareText}\n${SHARE_URL}`;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareText]);

  const handleWebShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CafeNavi 診断結果",
          text: shareText,
          url: SHARE_URL,
        });
      } catch {
        // User cancelled or error
      }
    }
  }, [shareText]);

  const supportsWebShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <section className="mb-8" aria-label={t("share.title")}>
      <div className="bg-white rounded-2xl shadow-sm border border-cafe-100 p-5">
        <h2 className="text-lg font-bold text-cafe-800 mb-4 text-center">
          {t("share.title")}
        </h2>

        <div
          className={`grid gap-3 ${supportsWebShare ? "grid-cols-2" : "grid-cols-3"}`}
        >
          {/* X (Twitter) */}
          <button
            type="button"
            onClick={handleTwitter}
            className="
              flex items-center justify-center gap-2 min-h-12
              rounded-xl font-bold text-sm
              bg-black text-white
              hover:bg-gray-800 active:bg-gray-900
              transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-400 focus-visible:ring-offset-2
              dark:bg-white dark:text-black dark:hover:bg-gray-200
            "
            aria-label={t("share.xButton")}
          >
            <span className="text-base font-black">X</span>
          </button>

          {/* LINE */}
          <button
            type="button"
            onClick={handleLine}
            className="
              flex items-center justify-center gap-2 min-h-12
              rounded-xl font-bold text-sm
              bg-[#06C755] text-white
              hover:bg-[#05b34c] active:bg-[#049a42]
              transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-400 focus-visible:ring-offset-2
            "
            aria-label={t("share.lineButton")}
          >
            <span className="text-base">LINE</span>
          </button>

          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopy}
            className="
              flex items-center justify-center gap-2 min-h-12
              rounded-xl font-bold text-sm
              bg-stone-100 text-stone-700
              hover:bg-stone-200 active:bg-stone-300
              transition-all duration-200
              hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-400 focus-visible:ring-offset-2
              dark:bg-stone-700 dark:text-stone-200
            "
            aria-label={t("share.copyLink")}
          >
            {copied ? (
              <>
                <span aria-hidden="true">&#10003;</span>
                <span>{t("share.copied")}</span>
              </>
            ) : (
              <>
                <span aria-hidden="true">&#128279;</span>
                <span>{t("share.copyLink")}</span>
              </>
            )}
          </button>

          {/* Web Share API */}
          {supportsWebShare && (
            <button
              type="button"
              onClick={handleWebShare}
              className="
                flex items-center justify-center gap-2 min-h-12
                rounded-xl font-bold text-sm
                bg-cafe-100 text-cafe-700
                hover:bg-cafe-200 active:bg-cafe-300
                transition-all duration-200
                hover:scale-[1.02] active:scale-[0.98]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cafe-400 focus-visible:ring-offset-2
              "
              aria-label={t("share.nativeShare")}
            >
              <span aria-hidden="true">&#128241;</span>
              <span>{t("share.nativeShare")}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
