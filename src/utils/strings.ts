import { artWorkBaseURL_200 } from 'constants/index'

/**
 * Get a full URL for some path to an image on The Movie DB
 * @param path relative path to the image
 * @return the full URL as a String
 */
export function getTheMovieDBImageURL(path: string) {
	return artWorkBaseURL_200 + path
}
