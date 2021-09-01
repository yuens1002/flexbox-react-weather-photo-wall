import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherGrid.css';

export default function WeatherGrid({ weatherData }) {
  return (
    <div className='grid-row'>
      {weatherData.map((data, i) => (
        <WeatherCard key={data.id + i} cardData={data} />
      ))}
    </div>
  );
}
