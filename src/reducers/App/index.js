const defaultStyles = {
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};

function getContainerStyles(weatherDataCount) {
  console.log(
    '🚀 ~ file: index.js ~ line 9 ~ getContainerStyles ~ weatherDataCount',
    weatherDataCount
  );
  return weatherDataCount ? {} : defaultStyles;
}

export default function reducer(state, action) {
  switch (action.type) {
    case 'updateWeatherData':
      // console.log('updateWeatherData called', action.payload);
      return {
        ...state,
        weatherData: [action.payload, ...state.weatherData],
      };
    case 'updateContainerStyle':
      console.log('updating container style', state);
      return {
        ...state,
        containerStyle: state.weatherData.length
          ? state.containerStyles
          : defaultStyles,
      };
    case 'updateBgStyle':
      console.log('updateByStyle called');
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
    default:
      return state;
  }
}
