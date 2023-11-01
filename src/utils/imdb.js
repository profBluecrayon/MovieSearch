import { child, endAt, get, limitToLast, orderByChild, query, ref, startAt } from 'firebase/database'

import { database } from '../firebase'

/**
 * Searches for IMDB entries with a given title.
 *
 * @param searchQuery title prefix.  search is case sensitive
 * @param callback function to invoke with the search results.  The callback
 *                 will be called with an object whose fields are the Firebase ids of the
 *                 search results.  The value for each field is an object with the following fields:
 *                 originalTitle, primaryTitle, runtimeMinutes, tconst, titleType, endYear, startYear
 *
 *                 If there are no results, the callback is invoked with an empty object.
 */
export const searchForIMDBTitle = (searchQuery, callback) => {
	const searchItemsRef = ref(database, 'title_basics')
	const searchItemQuery = query(searchItemsRef, limitToLast(10), orderByChild('originalTitle'), startAt(searchQuery), endAt(searchQuery + '\uf8ff'))

	get(searchItemQuery)
		.then(
			('value',
			(snapshot) => {
				callback(snapshot.val())
			}),
		)
		.catch((err) => console.log(err))
}

/**
 * Gets information on an IMDB title, and passes that info to the given callback.
 *
 * NOTE: this function does not handle the case where the Firebase query returns an error.
 *
 * @param id Firebase ID for the title
 * @param callback function to invoke with the title information once retrieved.  The callback
 *                 will be called with an object with the following fields:
 *                 originalTitle, primaryTitle, runtimeMinutes, tconst, titleType, endYear, startYear
 */
export const getIMDBTitleInfo = (id, callback) => {
	const searchItemsRef = ref(database)
	get(child(searchItemsRef, `title_basics/${id}`))
		.then((snapshot) => {
			callback(snapshot.val())
		})
		.catch((err) => console.log(err))
}

/**
 * Gets ratings information for an IMDB title and passes that information to the callback.
 *
 * NOTE: this function is slow, due to an unoptimized representation in the database.
 *
 * @param tconst The tconst id for the title (of the form "tt0000000")
 * @param callback function to invoke with the rating information once retrieved.  The function
 *                  will be called with an object with two fields: averageRating and numVotes
 */
export const getIMDBRatings = (tconst, callback) => {
	const searchItemsRef = ref(database)
	get(child(searchItemsRef, `title_ratings/${tconst}`))
		.then((snapshot) => {
			callback(snapshot.val())
		})
		.catch((err) => console.log(err))
}
