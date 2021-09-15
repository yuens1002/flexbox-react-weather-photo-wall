import styled from 'styled-components';
import { toRGBSpec } from '../../themes/colorPalette';

const StyledBg = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => toRGBSpec(props.theme.background, 0.40)};
  }
`;

export default function Background(props) {
  return <StyledBg {...props}>{props.children}</StyledBg>;
}
