// Not all fields are used
// Todo: (1) fetch all types from v4 swagger page, (2) update axios calls to v4

export interface Cast {
	adult: boolean
	cast_id: number
	character: string
	credit_id: string
	gender: number
	id: number
	known_for_department: string
	name: string
	order: number
	original_name: string
	popularity: number
	profile_path: string
	profilePic: string
}

export interface Artwork {
	overview: "An actor who does not suffer fools gladly finds himself replaced by one in this comedy. The citizens of a French village decide to celebrate their history by staging a play that will chronicle memorable events from the town's past. The play's author, Alexis, casts his wife Janine (Isabelle Candelier) in the leading female role despite her odd way of delivering dialogue. However, for the male lead, Alexis hires an arrogant professional actor from Paris, Jean-Pascal Faix. The village simpleton, Andre , has volunteered to serve as a stagehand and prompter. When Andre mistakenly leads Jean-Pascal into a trash dumpster that's soon dragged away, he's convinced (falsely) that he's killed the Parisian actor -- and is determined to take his place so that the show will go on."
	poster_path: '/qCIGuix3ojsLTkkYuLFdJ9IjwHe.jpg'
}

export interface CreditInfo {
	overview: string
	poster: string
	cast: Cast[]
}
