import React, { useState, useLayoutEffect, useRef } from 'react';
import Card from '../Card/Card';
import './WeatherCard.css';

export default function WeatherCard(props) {
  const gridItem = useRef(0);
  const [size, setSize] = useState('');
  const [cardStyle, setCardStyle] = useState({});

  function updateSize() {
    setSize(window.getComputedStyle(gridItem.current).width);
  }
  function useWindowSize() {
    useLayoutEffect(() => {
      window.addEventListener('resize', updateSize);
      updateSize();
      size.slice(0, -2) > 442
        ? setCardStyle({ flexFlow: 'row nowrap' })
        : setCardStyle({});
      return () => window.removeEventListener('resize', updateSize);
    }, []);
  }

  useWindowSize();

  // cardStyle =
  //   //  1080/2
  //   gridItemWidth.slice(0, -2) > 540 ? { flexFlow: 'row nowrap' } : {};

  return (
    <div className='grid-item' ref={gridItem}>
      <Card {...props} cardStyle={cardStyle} />
    </div>
  );
}
