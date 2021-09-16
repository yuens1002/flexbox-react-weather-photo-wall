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
      'light Cyan': [224, 251, 252],
      'light Green': [124, 234, 156],
      'Languid Lanvendor': [220, 207, 236],
      'Bright Yellow Crayola': [252, 171, 16],
    },
  },
  [DARK]: {
    background: [0, 0, 0],
    color: [224, 224, 224],
    placeholder: 0.6,
    link: {
      link: 0.5,
      visited: 0.3,
      hover: 1,
    },
    highlight: {
      [PRIMARY]: [129, 178, 154],
      [SECONDARY]: [64, 188, 216],
      [TERTIARY]: [144, 190, 109],
      Denim: [46, 94, 170],
      'English Violet': [89, 57, 89],
      'Bule Munsell': [43, 158, 179],
      'Red Sala': [248, 51, 60],
    },
  },
};

export default colors;
