import './Card.css';

export default function Card({
  photo: { user, urls, description, temp, name, summary, imgSrc },
  cardStyle,
}) {
  return (
    <div className='card' style={cardStyle}>
      <div className='card-img-frame'>
        <img className='card-img' src={urls.regular} alt={description} />
      </div>
      <div className='card-body'>
        <div className='card-body-header'>{name}</div>
        <div className='card-body-text'>
          <span className='card-body-text-summary'>{summary}</span>, {temp}&deg;
          C
        </div>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://unsplash.com/@${user.username}`}
        >
          {user.name}
        </a>
      </div>
    </div>
  );
}
