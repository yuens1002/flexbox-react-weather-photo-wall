import styled from 'styled-components';
import { useState, memo } from 'react';
import { toRGBSpec } from '../../../themes';
import useForcast from '../../../hooks/useForcast';
import { useEffect } from 'react';

const StyledMoreInfo = styled.div`
  background-color: ${({ theme }) => toRGBSpec(theme.background, 0.95)};
  position: absolute;
  right: -100%;
  top: 0;
  height: 100%;
  width: 80%;
  padding: 12px;
  transition: transform 0.6s ease;

  &.--close {
    transform: translateX(0);
  }

  &.--open {
    transform: translateX(-120%);
  }
`;

export default memo(function MoreInfo(props) {
  const { isMoreInfoOpened, coord, city, state } = props;
  const { lon, lat } = coord;
  const [forcast, setForcast] = useState([]);
  const { data, refetch, isError, isLoading } = useForcast({ lat, lon });
  if (!isError && data?.list.length !== forcast.length) {
    if (data) {
      const { list } = data;
      const f = list?.map(({ dt, temp }) => ({ dt, temp }));
      setForcast(f);
    }
  }

  useEffect(() => {
    console.log(
      '🚀 ~ file: MoreInfo.js ~ line 39 ~ useEffect ~ props.isMoreInfoOpened',
      isMoreInfoOpened
    );
    console.log(
      '🚀 ~ file: MoreInfo.js ~ line 43 ~ useEffect ~ forcast.length',
      forcast.length
    );
    console.log(
      '🚀 ~ file: MoreInfo.js ~ line 47 ~ useEffect ~ isError',
      isError
    );
    if (!isError && isMoreInfoOpened && forcast.length === 0) {
      refetch();
    }
  });

  function getLocalDate(time) {
    const utc = new Date(time * 1000);
    const local = utc.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    console.log('local time string: ', local);
    return local;
  }

  return (
    // spread {...props} so class(es) can be attached from the parent
    <StyledMoreInfo {...props}>
      <div>3 day forcast for</div>
      <div>
        {city}, {state}
      </div>
      {isLoading && <div>fetching forcast...</div>}
      {forcast.length > 0 &&
        forcast.map((f, i) => (
          <div key={i}>
            {getLocalDate(f.dt)}, {f.temp.day}
          </div>
        ))}
    </StyledMoreInfo>
  );
});
