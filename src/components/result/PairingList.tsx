import { Card } from "../ui/Card";
import { useTranslation } from "../../lib/i18n";

type PairingListProps = {
  pairings: string[];
};

export function PairingList({ pairings }: PairingListProps) {
  const { t } = useTranslation();

  if (pairings.length === 0) return null;

  return (
    <Card>
      <h3 className="text-lg font-bold text-cafe-800 mb-3">
        {t("pairing.title")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {pairings.map((pairing) => (
          <span
            key={pairing}
            className="inline-flex items-center gap-1 bg-cafe-50 text-cafe-700 text-sm px-3 py-1.5 rounded-full border border-cafe-200"
          >
            <span aria-hidden="true">🍰</span>
            {t(`pairing.${pairing}`)}
          </span>
        ))}
      </div>
    </Card>
  );
}
