import React, {useEffect, useState} from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios'

export default function MovieApp() {
   let [movies, setMovies] = useState([]);
let [searchQuery, setSearchQuery] = useState('');
let [ sortBy, setSortBy] = useState('popularity.desc');
let [genres, setGenres] = useState([]);
let [selectedGenre,setSelectedGenre] = useState('');
let [expandedMovieId, setExpandedMovieId] = useState(null);

useEffect(() =>{
    let fetchGenres = async () =>{
        let response = await axios.get(
            'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
                api_key:'c82ab0405fb981cfd52454edfc40eb87',
            },
          }
        )
        setGenres(response.data.genres);
       
    }
    fetchGenres();
}, []);

// useEffect(() =>{
//     let fetchMovies = async () => {
//         let response = await axios.get(
//             'https://api.themoviedb.org/3/discover/movie',
//             {
//                 params: {
//                     api_key:'c82ab0405fb981cfd52454edfc40eb87',
//                     sort_by: sortBy,
//                     page: 1,
//                     with_genres: selectedGenre,
//                     query:searchQuery,
//                 }
//             }
//         );
//         setMovies(response.data.results);
//     };
//     fetchMovies();
// }, [searchQuery, sortBy, selectedGenre]);

useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=c82ab0405fb981cfd52454edfc40eb87")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results); // Stocke les films récupérés
      })
      .catch((error) => console.error("Erreur lors de la récupération des films :", error));
  }, [searchQuery, sortBy, selectedGenre]);

  console.log('movies',movies);
  

    let handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

let handleSearchSubmit = async () => {
    let response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?',
        {
            params: {
                api_key: 'c82ab0405fb981cfd52454edfc40eb87',
                query: searchQuery,
            }
        }

    );
    setMovies(response.data.results);
}
let handleSortChange = (event) => {
    setSortBy(event.target.value);
}
let handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
}

    return ( 
        <main className='bg-blue-950 flex items-center flex-col gap-3 '>
            <h1 className='text-amber-50 text-7xl font-bold flex p-7 '>MovieHouse</h1>
           <div className='flex gap-2'>
           <input type='text' placeholder=' Search Movies...' value={searchQuery} onChange={handleSearchChange} className=' w-[24rem] h-[2.2rem] bg-amber-50 rounded-4xl ' ></input>
           <button onClick={handleSearchSubmit} className='bg-amber-50 w-[2.2rem] h-[2.2rem] rounded-[50%] flex justify-center items-center'> 
           <AiOutlineSearch />
           </button>

           </div>
           <div className=' w-full flex items-center justify-center gap-3 h-8'>
            <label htmlFor='sort-by' className='text-amber-50 font-bold ' >Sort By:</label>
            <select id='sort-by' value={sortBy} onChange={handleSortChange} className='bg-amber-50 font-medium  rounded-4xl h-7 '>
            <option value="popularity.desc"> Popularity Descending</option>
            <option value="popularity.asc"> Popularity Ascending</option>
            <option value="vote_average.desc"> Rating Descending</option>
            <option value="vote_average.asc"> Rating Ascending</option>
            <option value="release_date.desc"> Release Date Descending</option>
            <option value="release_date.asc"> Release Date Ascending</option>
            </select>
            <label htmlFor='genre'  className='text-amber-50 font-bold '>Genre:</label>
            <select id='genre' value={selectedGenre} onChange={handleGenreChange} className='bg-amber-50 font-medium  rounded-4xl h-7 '>
                <option value="" className=''> All Genre</option>
                {genres.map((genre) => (
    <option key={genre.id} value={genre.id}>{genre.name}</option>
))}
            </select>
           </div>
           <div className='flex justify-center items-center flx-row flex-wrap gap-6  p-1  '>
           {
            movies.map((movie)=> (
                <div key={movie.id} className='bg-amber-50 flex  items-center flex-col gap-2 p-2'>
                    {console.log('mmmm',movie)
                    }
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <h2 className='font-medium  '>{movie.title}</h2>
                <p className='border border-gray-900 font-medium'>Rating: {movie.vote_average}</p>
                {expandedMovieId === movie.id ? (
                    <p className='font-medium'>{movie.overview}</p>

                ): (
                    <p className='w-[12rem] text-xs font-medium'>{movie.overview.substring(0,150)}...</p>
                )}


                    
                   
                    
                </div>

            ))
           }
        

           </div>
        </main>
    )
}