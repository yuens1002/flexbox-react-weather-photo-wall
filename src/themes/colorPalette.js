import { PRIMARY, SECONDARY, TERTIARY, LIGHT, DARK } from './constants';

/**
 * colors are indicated by an array representating the 3# from rgb
 * decimals are transparancy levels in a rgba value
 */

const colors = {
  [LIGHT]: {
    background: [255, 255, 255],
    color: [7, 7, 7],
    placeholder: 0.6,
    link: {
      link: 0.5,
      visited: 0.3,
      hover: 1,
    },
    highlight: {
      [PRIMARY]: [144, 190, 109],
      [SECONDARY]: [133, 255, 199],
      [TERTIARY]: [247, 231, 51],
    },
  },
  [DARK]: {
    background: [0, 0, 0],
    color: [224, 224, 224],
    placeholder: 0.6,
    link: {
      link: 0.5,
      visited: 0.5,
      hover: 1,
    },
    highlight: {
      [PRIMARY]: [129, 178, 154],
      [SECONDARY]: [64, 188, 216],
      [TERTIARY]: [144, 190, 109],
    },
  },
};

function randomHighlight(theme) {
  const themes = [PRIMARY, SECONDARY, TERTIARY];
  const max = themes.length - 1;
  const min = 0;
  const randomizedNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return colors[theme].highlight[themes[randomizedNumber]];
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
