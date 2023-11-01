import { Avatar, Button, CardActions, CardContent, CardMedia, CssBaseline, Icon, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Image } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { CustomAppBar, CustomCard } from 'components'
import { getArtworkFromTheMovieDB, getCreditsFromTheMovieDB, getIMDBRatings, getIMDBTitleInfo, getTheMovieDBImageURL } from 'utils'
import useStyles from './MovieDetails.styles'

const MovieDetails = () => {
	const { classes } = useStyles()
	const { id, tconst } = useParams() || {}

	const [titleInfo, setTitleInfo] = useState({
		// FROM IMDB TITLE INFO
		originalTitle: '',
		primaryTitle: '',
		runtimeMinutes: '',
		genres: '',
		titleType: '',
		endYear: '',
		startYear: '',
	})
	const [creditInfo, setCreditInfo] = useState({
		// FROM THEMOVIEDB DATA
		overview: '',
		poster: 'https://via.placeholder.com/200x300',
		artWorkId: '',
		cast: [],
		crew: [],
	})
	const [ratingsInfo, setRatingsInfo] = useState({
		// FROM IMDB RATINGS INFO
		averageRating: '',
		numVotes: '',
	})

	useEffect(() => {
		const getMovieData = async () => {
			getIMDBTitleInfo(id, setTitleInfo)
			getIMDBRatings(tconst, setRatingsInfo)

			const artworks = await getArtworkFromTheMovieDB(tconst)

			if (!artworks?.[0]) return

			const artwork = artworks[0]
			const { cast = [], crew = [] } = (await getCreditsFromTheMovieDB(artwork.id)) || {}

			setCreditInfo({
				...artwork,
				poster: getTheMovieDBImageURL(artwork.poster_path),
				cast,
				crew,
			})
		}

		getMovieData()
	}, [])

	if (!id) {
		return <div>Sorry, but the Movie was not found</div>
	}

	return (
		<div>
			<CustomAppBar />
			<main className={classes.container}>
				<CssBaseline />
				<CustomCard className={classes.imageContainer}>
					<CardMedia className={classes.cover} component="img" image={creditInfo.poster} title={titleInfo.primaryTitle} />
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Typography component="h4" variant="h4">
								{titleInfo.primaryTitle} ({titleInfo.startYear})
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								Genre(s): {titleInfo.genres}
							</Typography>
							<Typography variant="subtitle2" color="textSecondary">
								Type: {titleInfo.titleType}
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								Ratings: {ratingsInfo.averageRating} ({ratingsInfo.numVotes})
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								Runtime : {titleInfo.runtimeMinutes} Minutes
							</Typography>
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
								<ListItem key={castMember.name}>
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
