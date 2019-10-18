import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieCard from './Components/MovieCard'
// import NavBar from './Components/NavBar'

function App () {
  let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process
    .env.REACT_APP_APIKEY}`
  const [apiUrl, setApiUrl] = useState(url)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])

  const getData = async () => {
    // console.log(page)
    console.log(`${apiUrl}&page=${page}`)
    const response = await fetch(`${apiUrl}&page=${page}`)
    const data = await response.json()
    console.log(data.results)
    return data.results
  }

  const fetchMovies = async () => {
    setMovies(movies.concat(await getData()))
    setPage(page + 1)
  }
  // const loadMore = async () => {
  //   setMovies(movies.concat(await getData()))
  //   setPage(page + 1)
  // }

  const handleSearch = async e => {
    e.preventDefault()
    let query = document.getElementById('keyword').value
    url =
      query === ''
        ? url
        : `https://api.themoviedb.org/3/search/movie?api_key=${process.env
            .REACT_APP_APIKEY}&query=${query}`

            console.log('wqjeue', url)
    setApiUrl(url)
    setPage(1)
    setMovies(await getData())
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className='App'>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='#'>
            Navbar
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <a className='nav-link' href='#'>
                  Home <span className='sr-only'>(current)</span>
                </a>
              </li>
            </ul>
            <form
              onSubmit={e => handleSearch(e)}
              className='form-inline my-2 my-lg-0'
            >
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                id='keyword'
              />
              <button
                className='btn btn-outline-success my-2 my-sm-0'
                type='submit'
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
      <div className='container my-5'>
        <div className='row'>
          {movies.length > 0 &&
            movies.map((movie, i) => <MovieCard key={i} movie={movie} />)}
        </div>
        <div className='row'>
          <button
            onClick={() => fetchMovies()}
            className='btn btn-primary btn-block'
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
