/**
 * Updates the --spot-x/--spot-y CSS custom properties used by the
 * `.spotlight` class (globals.css) to position a radial glow at the
 * cursor — set directly via the DOM (no React state) so it doesn't
 * trigger a re-render on every mousemove pixel.
 */
export function handleSpotlightMove(event: React.MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
