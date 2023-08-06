const fs = require('fs')
const { $fetch } = require('ofetch')
const dotenv = require('dotenv')
dotenv.config()

const baseUrl = 'https://api.themoviedb.org/3'

const getGenres = async () => {
  const { genres } = await $fetch(`${baseUrl}/genre/movie/list?api_key=${process.env.MOVIE_DB_API_KEY}&language=fr-FR`)

  return genres
}

const getMoviesOrActors = async () => {
  const { results } = await $fetch(`${baseUrl}/movie/now_playing?api_key=${process.env.MOVIE_DB_API_KEY}&language=fr-FR`)
  let actors = []

  const movies = await Promise.all(results.map(async (movie) => {
    const result = await $fetch(`${baseUrl}/movie/${movie.id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=fr-FR&append_to_response=videos,credits`)
    const { genres, videos } = result
    const actorsMovie = result.credits.cast.slice(0, 5) // [{}, {}]

    actorsMovie.forEach((actor) => {
      let existing = actors.find(a => a.id === actor.id)

      if (existing) {
        existing.moviesId.push(movie.id)
      } else {
        actors.push({
          ...actor,
          avatar: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
          moviesId: [movie.id]
        })
      }
    })

    return {
      ...(delete result.genres && delete result.credits && delete result.videos && delete result.spoken_languages
        && delete result.belongs_to_collection && delete result.production_companies && delete result.production_countries && result),
      backdrop_path: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
      poster_path: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      youtube: videos.results[0]?.key,
      genreId: genres[0].id,
      actorId: actorsMovie.map(actor => actor.id),
    }
  }))

  return { actors, movies }
}

(async () => {
  const { movies, actors } = await getMoviesOrActors()

  const data = {
    genres: await getGenres(),
    movies,
    actors,
    users: [],
  }

  fs.writeFileSync('db.json', JSON.stringify(data))
})()
