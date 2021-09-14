import { PRIMARY, SECONDARY, TERTIARY, LIGHT, DARK } from './constants';

const colors = {
  [LIGHT]: {
    setup: {
      color: 'rgb(7, 7, 7)',
      placeholder: 'rgba(7, 7, 7, 0.40)',
      link: {
        active: 'rgb(0, 0, 0)',
        visited: 'rgb(167, 167, 167)',
      },
      background: 'rgba(255, 255, 255, .50)',
    },
    [PRIMARY]: 'rgba(129, 178, 154, 0.50)',
    [SECONDARY]: 'rgba(230, 43, 43, 0.50)',
    [TERTIARY]: 'rgba(242, 204, 143, 0.50)',
  },
  [DARK]: {
    setup: {
      color: 'rgb(224, 224, 224)',
      placeholder: 'rgba(224, 224, 224, 0.40)',
      link: {
        active: 'rgb(255, 255, 255)',
        visited: 'rgb(167, 167, 167)',
      },
    },
    [PRIMARY]: 'rgba(129, 178, 154, 0.50)',
    [SECONDARY]: 'rgba(64, 188, 216, 0.50)',
    [TERTIARY]: 'rgba(144, 190, 109, 0.50)',
  },
};

export function getTheme(theme) {
  return {
    setup: colors[theme].setup,
    [PRIMARY]: colors[theme][PRIMARY],
    [SECONDARY]: colors[theme][SECONDARY],
    [TERTIARY]: colors[theme][TERTIARY],
  };
}
