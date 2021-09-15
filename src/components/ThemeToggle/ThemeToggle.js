import { toRGBSpec } from '../../themes';
import styled from 'styled-components';

const StyledThemeT = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
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

export default function ThemeToggle() {
  return (
    <StyledThemeT>
      <span>Choose a Theme: </span>
      <div className="circle circle--dark circle--selected" aria-label="dark theme, hit enter to select" />
      <div className="circle circle--light" aria-label="light theme, hit enter to select" />
    </StyledThemeT>
  );
}
