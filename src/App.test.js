import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import App from './App';
import useGetRandomPic from './hooks/useRandomPic';
import React from 'react';
import useAppReducer from './reducers/App';

jest.mock('./hooks/useRandomPic', () => jest.fn());

describe('App', () => {
  beforeEach(() => {
    useGetRandomPic.mockImplementation(() => ({
      error: 'error',
      isError: false,
    }));
  });
  describe('on render', () => {
    it('changes the styles of the content container', () => {
      const { getByTestId } = render(<App />);
      const keys = Object.keys(getByTestId('content-container').style._values);
      expect(keys.length).toBeTruthy();
    });
    it('fetches for a background image', () => {
      render(<App />);
      expect(useGetRandomPic).toHaveBeenCalled();
    });
    it('shows the query input', () => {
      const { getByTitle } = render(<App />);
      expect(getByTitle('query')).toBeInTheDocument();
    });
  });
  describe('upon successfully fetching for a background image', () => {
    it('the background is updated with fetched image', async () => {
      const urls = { regular: 'https://' };
      const bgStyle = {
        backgroundImage: `url(${urls.regular})`,
        backgroundSize: 'cover',
      }
      const { result } = renderHook(useAppReducer);
      expect(result.current[0].bgStyle).toEqual({});
      act(() => {
        const dispatch = result.current[1];
        dispatch({ type: 'updateImage', payload: { urls } });
        dispatch({ type: 'updateBgStyle'})
      });

      expect(result.current[0].bgStyle).toEqual(bgStyle)
    });
    it.todo('the credits are shown');
  });
  describe('when a valid weather query is made', () => {
    it.todo('shows a weather card in the grid');
  });
});
