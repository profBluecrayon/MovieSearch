export interface MovieInfo {
	endYear: string
	genres: string
	isAdult: number
	originalTitle: string
	primaryTitle: string
	runtimeMinutes: string
	startYear: string
	tconst: string
	titleType: string
}

export interface MovieItem extends MovieInfo {
	id: string
}

export interface MovieRating {
	averageRating: string
	numVotes: string
	tconst: string
}
