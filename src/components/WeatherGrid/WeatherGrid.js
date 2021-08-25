import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherGrid.css';

export default function WeatherGrid({ weatherData }) {
  return (
    <div className='grid-row'>
      {weatherData.map((photo, i) => (
        <WeatherCard
          key={photo.id + i}
          photo={photo}
          photoCount={weatherData.length}
        />
      ))}
    </div>
  );
}
