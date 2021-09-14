import styled from 'styled-components';

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
    background-color: ${(props) => {
      console.log(props);
      return props.theme.setup.background;
    }};
  }
`;

export default function Background(props) {
  console.log(props);
  return <StyledBg {...props}>{props.children}</StyledBg>;
}
