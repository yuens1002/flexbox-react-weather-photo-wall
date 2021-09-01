const getStyles = (size) => {
  return Number(size.slice(0, -2)) > 534 ? { flexFlow: 'row nowrap' } : {};
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'updateCardSize':
      return {
        ...state,
        cardSize: window.getComputedStyle(state.gridItem.current).width,
      };
    case 'updateCardStyle':
      return { ...state, cardStyle: getStyles(state.cardSize) };
    default:
      return state;
  }
}
