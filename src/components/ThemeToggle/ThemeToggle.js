import { memo, useState } from 'react';

import { toRGBSpec } from '../../themes';
import styled from 'styled-components';
import { LIGHT, DARK } from '../../themes/constants';

const StyledThemeT = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 4px;

  .circle {
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 0 0 0 12px;
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  .circle--dark {
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  .circle--light {
    background-color: rgba(255, 255, 255, 0.8);
    border: 2px solid rgba(0, 0, 0, 0.2);
  }
  .circle--selected {
    border: 8px solid ${({ theme }) => toRGBSpec(theme.highlight)};
  }
  .circle--hovered {
    opacity: 0.50;
  }
`;

export default memo(function ThemeToggle({
  updateCurrentTheme,
  updateTheme,
  currentTheme,
}) {
  const [isDarkThemeHovered, updateIsDarkThemeHovered] = useState(false);
  const [isLightThemeHovered, updateIsLightThemeHovered] = useState(false);
  const handleThemeToggle = async (theme) => {
    if (theme !== currentTheme) {
      updateCurrentTheme(theme);
    }
    updateTheme();
  };

  const applySelectedClass = (theme) => {
    return currentTheme === theme ? ' circle--selected' : '';
  };

  function changeOpacity(theme) {
    theme === DARK
      ? updateIsDarkThemeHovered((hovered) => !hovered)
      : updateIsLightThemeHovered((hovered) => !hovered);
  }

  return (
    <StyledThemeT>
      <span>{'Choose a Theme '}</span>
      <div
        className={`circle circle--dark${applySelectedClass(DARK)}${
          isDarkThemeHovered ? ' circle--hovered' : ''
        }`}
        aria-label="dark theme, hit enter to select"
        onClick={() => handleThemeToggle(DARK)}
        onMouseOver={() => changeOpacity(DARK)}
        onMouseOut={() => changeOpacity(DARK)}
      />
      <div
        className={`circle circle--light${applySelectedClass(LIGHT)}${
          isLightThemeHovered ? ' circle--hovered' : ''
        }`}
        aria-label="light theme, hit enter to select"
        onClick={() => handleThemeToggle(LIGHT)}
        onMouseOver={() => changeOpacity(LIGHT)}
        onMouseOut={() => changeOpacity(LIGHT)}
      />
    </StyledThemeT>
  );
});
