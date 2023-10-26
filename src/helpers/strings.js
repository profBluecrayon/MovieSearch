import { artWorkBaseURL_200 } from 'constants'

/**
 * Get a full URL for some path to an image on The Movie DB
 * @param path relative path to the image
 * @return the full URL as a String
 */
export function getTheMovieDBImageURL(path) {
	return artWorkBaseURL_200 + path
}
