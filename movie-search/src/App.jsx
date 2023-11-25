import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [datas, setDatas] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://www.omdbapi.com/?s=batman&apikey=32840d10');
        setDatas(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const fetchdata = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${title}&apikey=32840d10`);
      setDatas(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className='bg-gradient-to-b from-purple-600 to-blue-600 via-violet-600 flex items-center justify-center p-5 border-none '>
        <form onSubmit={fetchdata}>
          <input
            className='p-2 rounded-md w-100px mr-3 '
            type='text'
            placeholder='Search Movie'
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>
      <div className='bg-slate-800 text-white font-medium flex justify-center items-center'>
        <div>
          <ul>
            {datas.map((item) => (
              <li key={item.imdbID}>
                <img className='rounded-s-sm' src={item.Poster} alt={item.Title} />
                <p>{item.Title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className='text-grey-200 flex'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {datas.map((item) => (
                <li key={item.imdbID}>
                  <img src={item.Poster} alt={item.Title} />
                  <h2 className='mb-10'>{item.Title}</h2>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
