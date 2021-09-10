import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  describe('on render', () => {
    it.todo('changes the styles of the container')
    it.todo('fetches for a background image')
    it.todo('shows the query input component')
  })
  describe('upon successfully fetching for a background image', () => {
    it.todo('the background is updated with fetched image')
    it.todo('the credits are shown')
  })
  describe('when a valid weather query is made', () => {
    it.todo('shows a weather card in the grid')
  })
})
