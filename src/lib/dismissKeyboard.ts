/**
 * Mobile WebKit/Chrome shows a floating "keyboard accessory" toolbar
 * (autofill field navigation, voice input, hide-keyboard) above a focused
 * text input. If that input is removed from the DOM (e.g. a modal closes)
 * before the browser has processed a blur, the toolbar can get stuck
 * floating over the page instead of closing with the keyboard — it then
 * sits on top of whatever is scrolled underneath, including our own fixed
 * bottom nav. See the "stuck keyboard toolbar" rule in CLAUDE.md.
 *
 * Blurring the active element synchronously, BEFORE the node is removed,
 * gives the browser a clean signal to dismiss the toolbar; deferring the
 * actual unmount by one tick gives it time to do so. Every modal/overlay
 * that contains a text input MUST close via this helper instead of calling
 * its state setter directly.
 */
export function blurActiveElementThenRun(fn: () => void): void {
  const active = document.activeElement;
  if (active instanceof HTMLElement) {
    active.blur();
  }
  window.setTimeout(fn, 0);
}
