export function calcCharacterLimit(display, displayText) {
  const displayWidth =
    parseFloat(getComputedStyle(display).width) -
    parseFloat(getComputedStyle(display).paddingLeft) * 2;

  const displayTextWidth = parseFloat(getComputedStyle(displayText).width);

  const characterWidth = displayTextWidth / displayText.textContent.length;

  return Math.floor(displayWidth / characterWidth);
}
