import { Avatar, Button, CardActions, CardContent, CardMedia, CssBaseline, Icon, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Image } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Cast, CreditInfo, MovieItem, MovieRating } from 'helpers/types'
import { CustomAppBar, CustomCard } from 'components'
import { getArtworkFromTheMovieDB, getCreditsFromTheMovieDB, getIMDBRatings, getTheMovieDBImageURL } from 'utils'
import useStyles from './MovieDetails.styles'

const MovieDetails = () => {
	const { classes } = useStyles()
	const { state } = useLocation() || {}
	const movieInfo: MovieItem = state

	const [creditInfo, setCreditInfo] = useState<CreditInfo>({
		// FROM THEMOVIEDB DATA
		overview: '',
		poster: 'https://via.placeholder.com/200x300',
		cast: Array<Cast>(),
	})
	const [ratingsInfo, setRatingsInfo] = useState<MovieRating>({
		// FROM IMDB RATINGS INFO
		averageRating: '',
		numVotes: '',
		tconst: '',
	})

	useEffect(() => {
		const getMovieData = async () => {
			getIMDBRatings(movieInfo.tconst, setRatingsInfo)

			const artworks = await getArtworkFromTheMovieDB(movieInfo.tconst)

			if (!artworks?.[0]) return

			const artwork = artworks[0]
			const credits = (await getCreditsFromTheMovieDB(artwork.id)) || {}
			const cast: Cast[] = credits.cast || []

			setCreditInfo({
				...artwork,
				poster: getTheMovieDBImageURL(artwork.poster_path),
				cast,
			})
		}

		getMovieData()
	}, [])

	if (!movieInfo.id) {
		return <div>Sorry, but the Movie was not found</div>
	}

	return (
		<div>
			<CustomAppBar />
			<main className={classes.container}>
				<CssBaseline />
				<CustomCard className={classes.imageContainer}>
					<CardMedia className={classes.cover} component="img" image={creditInfo.poster} title={movieInfo.primaryTitle} />
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Typography component="h4" variant="h4">
								{movieInfo.primaryTitle} ({movieInfo.startYear})
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								Genre(s): {movieInfo.genres}
							</Typography>
							<Typography variant="subtitle2" color="textSecondary">
								Type: {movieInfo.titleType}
							</Typography>
							<Typography color="textSecondary">
								Ratings: {ratingsInfo.averageRating} ({ratingsInfo.numVotes})
							</Typography>
							<Typography color="textSecondary">Runtime : {movieInfo.runtimeMinutes} Minutes</Typography>
							<Typography component="p">{creditInfo.overview}</Typography>
						</CardContent>
						<CardActions>
							<Link to="/">
								<Button size="small">Back</Button>
							</Link>
						</CardActions>
					</div>
				</CustomCard>
			</main>

			<main className={classes.container}>
				<CssBaseline />
				<CustomCard>
					<Typography component="h5" variant="h5">
						Cast Member(s)
					</Typography>
					<List className={classes.list}>
						{creditInfo.cast.map((castMember) => {
							const profilePic = castMember.profile_path ? getTheMovieDBImageURL(castMember.profile_path) : castMember.profilePic
							return (
								<ListItem key={castMember.id}>
									<Avatar alt={castMember.name} src={profilePic} className={classes.bigAvatar}>
										<Icon component={Image} />
									</Avatar>
									<ListItemText primary={castMember.name} secondary={castMember.character} />
								</ListItem>
							)
						})}
					</List>
				</CustomCard>
			</main>
		</div>
	)
}

export default MovieDetails
