import { memo } from 'react';

import { toRGBSpec } from '../../themes';
import styled from 'styled-components';
import { LIGHT, DARK } from '../../themes/constants';

const StyledThemeT = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justifiy-content: space-between;
  width: 124px;
  align-items: center;

  .circle {
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin: 4px;
  }
  .circle--dark {
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  .circle--light {
    background-color: rgba(255, 255, 255, 0.8);
    border: 2px solid rgba(0, 0, 0, 0.2);
  }
  .circle--selected {
    border: 2px solid ${({ theme }) => toRGBSpec(theme.highlight)};
  }
`;

export default memo(function ThemeToggle({
  updateCurrentTheme,
  updateTheme,
  currentTheme,
  refetchBgImage,
}) {
  const handleThemeToggle = async (theme) => {
    console.log('handleThemeToggle clicked');
    if (theme !== currentTheme) {
      updateCurrentTheme(theme);
    }
    updateTheme();
  };

  const toggleThemeSelection = (theme) => {
    console.log('theme', theme);
    console.log('currentTheme', currentTheme);
    return currentTheme === theme ? ' circle--selected' : '';
  };

  return (
    <StyledThemeT>
      <span>Choose a Theme: </span>
      <div
        className={`circle circle--dark${toggleThemeSelection(DARK)}`}
        aria-label="dark theme, hit enter to select"
        onClick={() => handleThemeToggle(DARK)}
      />
      <div
        className={`circle circle--light${toggleThemeSelection(LIGHT)}`}
        aria-label="light theme, hit enter to select"
        onClick={() => handleThemeToggle(LIGHT)}
      />
    </StyledThemeT>
  );
});
