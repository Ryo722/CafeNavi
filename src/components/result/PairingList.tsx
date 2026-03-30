import { Card } from "../ui/Card";

type PairingListProps = {
  pairings: string[];
};

export function PairingList({ pairings }: PairingListProps) {
  if (pairings.length === 0) return null;

  return (
    <Card>
      <h3 className="text-lg font-bold text-cafe-800 dark:text-cafe-200 mb-3">
        相性の良いお菓子
      </h3>
      <div className="flex flex-wrap gap-2">
        {pairings.map((pairing) => (
          <span
            key={pairing}
            className="inline-flex items-center gap-1 bg-cafe-50 dark:bg-dark-border text-cafe-700 dark:text-cafe-300 text-sm px-3 py-1.5 rounded-full border border-cafe-200 dark:border-dark-border"
          >
            <span aria-hidden="true">🍰</span>
            {pairing}
          </span>
        ))}
      </div>
    </Card>
  );
}
