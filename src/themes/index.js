import { PRIMARY, SECONDARY, TERTIARY, LIGHT, DARK } from './constants';
import colors from './colorPalette';

function randomHighlight(theme) {
  const names = [PRIMARY, SECONDARY, TERTIARY];
  const max = names.length - 1;
  const min = 0;
  const randomizedNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return colors[theme].highlight[names[randomizedNumber]];
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

export function buildTheme(theme) {
  return {
    ...colors[theme],
    highlight: randomHighlight(theme),
  };
}
