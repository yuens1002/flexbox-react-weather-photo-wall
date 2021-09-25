import React, {
  useReducer,
  useLayoutEffect,
  useEffect,
  useRef,
  memo,
} from 'react';
import Card from '../Card/Card';
import './WeatherCard.css';
import { WeatherCardReducer } from '../../reducers';
import MoreInfo from './Forecast/Forecast';

export default memo(function WeatherCard(props) {
  // console.log('render weather card: ', JSON.stringify(props));
  const gridItem = useRef(0);
  const initialState = {
    cardStyle: {},
    cardSize: '',
    gridItem,
    isMoreInfoOpened: false,
  };
  const [state, dispatch] = useReducer(WeatherCardReducer, initialState);

  // watch for screen resize to update card size
  useLayoutEffect(() => {
    function updateCardSize() {
      dispatch({ type: 'updateCardSize' });
    }
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  // adjusts for the layout of the card when a new card is added
  useEffect(() => {
    dispatch({ type: 'updateCardSize' });
    dispatch({ type: 'updateCardStyle' });
  }, [state.cardSize]);

  function handleCardClick() {
    dispatch({
      type: 'updateIsMoreInfoOpened',
      payload: !state.isMoreInfoOpened,
    });
  }

  function handleClassToggle() {
    // console.log('handleClassToggle called');
    return state.isMoreInfoOpened ? '--open' : '--close';
  }

  return (
    <div className="grid-item" ref={gridItem} onClick={handleCardClick}>
      <MoreInfo
        className={handleClassToggle()}
        isMoreInfoOpened={state.isMoreInfoOpened}
        coord={props.cardData.coord}
        city={props.cardData.name}
        state={props.cardData.state}
      />
      <Card {...props} cardStyle={state.cardStyle} />
    </div>
  );
});
