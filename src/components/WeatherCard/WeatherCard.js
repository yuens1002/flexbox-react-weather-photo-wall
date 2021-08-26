import React, { useReducer, useLayoutEffect, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import './WeatherCard.css';

export default function WeatherCard(props) {
  const gridItem = useRef(0);

  const initialState = { cardStyle: {}, size: '' };

  function getStyles(size) {
    return size.slice(0, -2) >= 537 ? { flexFlow: 'row nowrap' } : {};
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'updateCardSize':
        return {
          ...state,
          cardSize: window.getComputedStyle(gridItem.current).width,
        };
      case 'updateCardStyle':
        return { ...state, cardStyle: getStyles(state.cardSize) };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // watch for changes from screen resize to update card size that will trigger a cardStyle state change
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
    <div className='grid-item' ref={gridItem}>
      <Card {...props} cardStyle={state.cardStyle} />
    </div>
  );
}
