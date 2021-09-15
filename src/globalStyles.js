import { createGlobalStyle } from 'styled-components';
import { toRGBSpec } from './themes';

const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-size: 10px;
  color: ${(props) => toRGBSpec(props.theme.color)};
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a:link {
  color: ${(props) => toRGBSpec(props.theme.color)};
  text-decoration: none;
  padding: 0 4px;
  transition: background-color 0.5s ease;
  background-color: ${(props) =>
    toRGBSpec(props.theme.highlight, props.theme.link.link)};
}

a:visited {
  color: ${(props) => toRGBSpec(props.theme.color)};
}

a:hover {
  background-color: ${(props) =>
    toRGBSpec(props.theme.highlight, props.theme.link.hover)};
}

a:focus {
  background-color: ${(props) =>
    toRGBSpec(props.theme.highlight, props.theme.link.focus)};
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export default GlobalStyles;
