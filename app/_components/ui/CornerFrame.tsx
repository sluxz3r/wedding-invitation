/**
 * Four small gold corner brackets overlaid on a bordered box — the parent
 * must be `position: relative`. Purely decorative.
 */
export function CornerFrame() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold-light"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-gold-light"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-gold-light"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold-light"
      />
    </>
  );
}
