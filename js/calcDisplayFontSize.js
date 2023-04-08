/* 

This function can be used to calculate the font size of the display, so it
can be dynamic, based on the viewport. That being said, I resort to using
viewport units instead, because there are issues with the initial run of
the script below - for some reason the browser doesn't run it until I re-
load the page.

*/

export function calcDisplayFontSize(charLimit, display, displayText) {
  // Numeric value for the responsive width and font size of the display
  const displayWidth =
    parseFloat(getComputedStyle(display).width) -
    parseFloat(getComputedStyle(display).paddingLeft) * 2;
  const displayFontSize = parseFloat(getComputedStyle(display).fontSize);

  // Though the initial calculation is always done on a single character (0)
  // it is better to have the flexibility to change the font size regardless
  // of how many characters are already on the screen.
  const displayTextWidth = parseFloat(getComputedStyle(displayText).width);
  const characterWidth = displayTextWidth / displayText.textContent.length;

  // Calculating the proportions to adjust font size
  const charLimitAtCurrentFontSize = Math.floor(displayWidth / characterWidth);
  const proportionAdjustment = charLimitAtCurrentFontSize / charLimit;
  return `${Math.ceil(displayFontSize * proportionAdjustment)}px`;
}
