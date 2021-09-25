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
  transition: right, transform 0.5s ease;

  .forcast-row {
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    padding: 4px 0;
    border-bottom: 1px solid ${({ theme }) => toRGBSpec(theme.color, 0.1)};
    & div {
      width: 33.3%;
    }
  }

  .--bold {
    font-weight: bold;
  }

  &.--close {
    right: -80%;
  }

  &.--open {
    /* off by one pixel */
    right: calc(-80% - 1px);
    transform: translateX(-100%);
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
      const f = list?.map(({ dt, temp, weather }) => ({
        dt,
        temp,
        weather: weather[0],
      }));
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
      weekday: 'short',
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
      <div className="--bold">
        <h2>
          {city}, {state}
        </h2>
      </div>
      {isLoading && <div>fetching forcast...</div>}
      {forcast.length > 0 && (
        <>
          <div className="forcast-row --bold">
            <div>Day / Date</div>
            <div>Min - Max Temp</div>
            <div>Weather</div>
          </div>
          {forcast.map((f, i) => (
            <div key={i}>
              <div className="forcast-row">
                <div>{getLocalDate(f.dt)}</div>
                <div>
                  {f.temp.min}&deg;C - {f.temp.max}&deg;C
                </div>
                <div>{f.weather.description}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </StyledMoreInfo>
  );
});
