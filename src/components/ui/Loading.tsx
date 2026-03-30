export function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      role="status"
      aria-label="Loading"
    >
      <div className="text-5xl mb-4 animate-bounce" aria-hidden="true">
        ☕
      </div>
      <p className="text-cafe-600 font-medium text-sm">Loading...</p>
    </div>
  );
}
