import axios from 'axios'

const themoviedbAPIKey = process.env.REACT_APP_themoviedb_apiKey

/**
 * Get TheMovieDB artwork for a movie
 * @param tconst the IMDB ID for the movie (of the form "tt0000000")
 * @return a Promise of TheMovieDB response from its find API;
 *        see https://developers.themoviedb.org/3/find/find-by-id for details
 */
export async function getArtworkFromTheMovieDB(tconst) {
	const { data } = await axios
		.get(`https://api.themoviedb.org/3/find/${tconst}`, {
			params: {
				api_key: themoviedbAPIKey,
				language: 'en-US',
				external_source: 'imdb_id',
			},
		})
		.catch((error) => console.warn(error))

	return data.movie_results
}

/**
 * Get credits information for a movie from The Movie DB
 * @param movieDBId The Movie DB ID for a movie
 * @return a Promise of TheMovieDB response from its credits API;
 *        see https://developers.themoviedb.org/3/movies/get-movie-credits
 */
export async function getCreditsFromTheMovieDB(movieDBId) {
	const { data } = await axios
		.get(`https://api.themoviedb.org/3/movie/${movieDBId}/credits`, {
			params: {
				api_key: themoviedbAPIKey,
			},
		})
		.catch((error) => console.warn('error credits:', error))

	return data
}
