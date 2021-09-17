import styled from 'styled-components';
import { toRGBSpec } from '../../themes';

const StyledBg = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => toRGBSpec(props.theme.background, 0.5)};
    transition: background-color 1.5s ease;
  }
`;

export default function Background(props) {
  return <StyledBg {...props}>{props.children}</StyledBg>;
}
