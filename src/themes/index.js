import { LIGHT, DARK } from './constants';
import colors from './colorPalette';

function randomizeNumber (numArr) {
  const max = numArr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
} 

function randomHighlight(theme, highlightName) {
  // avoid having the same color as the previous randomized highlight color
  const names = highlightName
    ? Object.keys(colors[theme].highlight).filter(
        (name) => name !== highlightName
      )
    : Object.keys(colors[theme].highlight);
  const hightlightName = names[randomizeNumber(names)];
  return [colors[theme].highlight[hightlightName], hightlightName];
}

export function randomTheme() {
  const themes = [LIGHT, DARK];
  const max = themes.length - 1;
  const min = 0;
  const randomizedNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return themes[randomizedNumber];
}

export function toRGBSpec(colorArr, transparancy) {
  return transparancy
    ? `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${transparancy})`
    : `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
}

export function buildTheme(theme, highlight) {
  const [highlightColor, highlightName] = randomHighlight(theme, highlight) 
  return [{
    ...colors[theme],
    highlight: highlightColor,
  }, highlightName];
}
