import React, { useReducer, useLayoutEffect, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import './WeatherCard.css';
import { WeatherCardReducer } from '../../reducers';

export default function WeatherCard(props) {
  const gridItem = useRef(0);
  const initialState = { cardStyle: {}, cardSize: '', gridItem };
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

  return (
    <div className="grid-item" ref={gridItem}>
      <Card {...props} cardStyle={state.cardStyle} />
    </div>
  );
}
