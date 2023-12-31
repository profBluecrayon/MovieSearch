import { http } from 'utils'

/**
 * Get TheMovieDB artwork for a movie
 * @param tconst the IMDB ID for the movie (of the form "tt0000000")
 * @return a Promise of TheMovieDB response from its find API;
 *        see https://developers.themoviedb.org/3/find/find-by-id for details
 */
export async function getArtworkFromTheMovieDB(tconst: string) {
	const { data } = await http().get(`/find/${tconst}`, {
		params: {
			language: 'en-US',
			external_source: 'imdb_id',
		},
	})

	return data.movie_results
}

/**
 * Get credits information for a movie from The Movie DB
 * @param movieDBId The Movie DB ID for a movie
 * @return a Promise of TheMovieDB response from its credits API;
 *        see https://developers.themoviedb.org/3/movies/get-movie-credits
 */
export async function getCreditsFromTheMovieDB(movieDBId: string) {
	const { data } = await http().get(`/movie/${movieDBId}/credits`)

	return data
}
