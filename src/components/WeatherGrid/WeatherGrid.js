import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherGrid.css';

export default function WeatherGrid({ weatherData }) {
  // const [photoData, setPhotoData] = useState([]);
  // useEffect(() => {
  //   getPhotos({
  //     query: 'seattle, rainy',
  //     orientation: 'landscape',
  //     per_page: 7,
  //   }).then((res) => {
  //     setPhotoData(res);
  //   });
  // }, []);
  return (
    <div className='grid-row'>
      {weatherData.map((photo) => (
        <WeatherCard
          key={photo.id}
          photo={photo}
          photoCount={weatherData.length}
        />
      ))}
    </div>
  );
}
