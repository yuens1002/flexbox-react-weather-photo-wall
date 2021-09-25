import { buildTheme } from '../../themes';

const defaultStyles = {
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'updateWeatherData':
      // console.log('updateWeatherData called', action.payload);
      return {
        ...state,
        weatherData: [action.payload, ...state.weatherData],
      };
    case 'updateContainerStyle':
      // console.log('dispatch: updating container style', state);
      return {
        ...state,
        containerStyle: state.weatherData.length ? {} : defaultStyles,
      };
    case 'updateBgStyle':
      // console.log('dispatch: updateBgStyle called');
      return {
        ...state,
        bgStyle: {
          backgroundImage: `url(${state.image.urls.regular})`,
          backgroundSize: 'cover',
        },
      };
    case 'updateImage':
      console.log('updateImage action called');
      return { ...state, image: action.payload };
    case 'updateCurrentTheme':
      return { ...state, currentTheme: action.payload };
    case 'updateTheme':
      const [theme, highlightName] = buildTheme(state.currentTheme, state.highlightName)
      return { ...state, theme, highlightName };
    default:
      return state;
  }
}
