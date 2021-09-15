import styled from 'styled-components';
import { toRGBSpec } from '../../themes/colorPalette';

const StyledC = styled.div`
  display: flex;
  flex-flow: column wrap;
  background-color: ${({ theme }) => toRGBSpec(theme.background, 0.90)};
  height: 100%;

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-img-frame {
    height: 240px;
    min-width: calc(33% - 6px);
  }

  .card-body {
    padding: 8px;
    font-size: 1.6rem;
    font-weight: 300;
    width: 100%;
  }

  .card-body-header {
    font-size: 2rem;
    font-family: 'Pacifico', cursive;
  }

  .card-body-text-summary {
    text-transform: capitalize;
  }

  .card-body-credits {
    float: right;
    font-size: 1rem;
  }

  .card-body-header::before {
    content: '';
    clear: both;
    display: table;
  }
`;

export default function Card({
  cardData: { user, urls, description, temp, name, summary, state },
  cardStyle,
}) {
  return (
    <StyledC style={cardStyle}>
      <div className="card-img-frame">
        <img className="card-img" src={urls.regular} alt={description} />
      </div>
      <div className="card-body">
        <div className="card-body-credits">
          <span>photo by </span>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://unsplash.com/@${user.username}`}
          >
            {user.name}
          </a>
        </div>
        <div className="card-body-header">
          {name}, {state}
        </div>
        <div className="card-body-text">
          <span className="card-body-text-summary">{summary}</span>, {temp}&deg;
          C
        </div>
      </div>
    </StyledC>
  );
}
