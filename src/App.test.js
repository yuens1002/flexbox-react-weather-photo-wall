import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import useGetRandomPic from './hooks/useRandomPic';

jest.setTimeout(15000);

jest.mock('./hooks/useRandomPic', () => jest.fn());

describe('App', () => {
  beforeEach(() => {
    useGetRandomPic.mockImplementation(() => null);
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
      render(<App />);
      await waitFor(
        () => {
          expect(useGetRandomPic).toHaveBeenCalledTimes(1=);
        },
        { timeout: 15000 }
      );
    });
    it.todo('the credits are shown');
  });
  describe('when a valid weather query is made', () => {
    it.todo('shows a weather card in the grid');
  });
});
