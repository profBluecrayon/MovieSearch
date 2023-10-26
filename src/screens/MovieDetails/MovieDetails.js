import { AppBar, Avatar, Card, CardActionArea, CardContent, CardMedia, CssBaseline, Icon, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { Image } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import { getArtworkFromTheMovieDB, getCreditsFromTheMovieDB, getIMDBRatings, getIMDBTitleInfo, getTheMovieDBImageURL } from 'helpers'

const MovieDetails = () => {
	const { id, tconst } = useParams() || {}
	const navigate = useNavigate()

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
		getMovieData()
	}, [])

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

	const navigateBack = () => {
		navigate(-1)
	}

	if (!id) {
		return <div>Sorry, but the Movie was not found</div>
	}

	return (
		<div>
			<AppBar position="static">
				<Typography variant="h5" color="inherit" noWrap>
					Movies Search
				</Typography>
			</AppBar>
			<main>
				<CssBaseline />
				<Card>
					<CardMedia component="img" image={creditInfo.poster} title={titleInfo.primaryTitle} />
					<div>
						<CardContent>
							<Typography component="h4" variant="h4">
								{titleInfo.primaryTitle} ({titleInfo.startYear})
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								Genre(s): {titleInfo.genres}
							</Typography>
							<Typography variant="subtitle2" color="textSecondary">
								Type: {titleInfo.titleType}
							</Typography>
							<Typography color="textSecondary">
								Ratings: {ratingsInfo.averageRating} ({ratingsInfo.numVotes})
							</Typography>
							<Typography color="textSecondary">Runtime : {titleInfo.runtimeMinutes} Minutes</Typography>
							<Typography component="p">{creditInfo.overview}</Typography>
						</CardContent>
						<CardActionArea onClick={navigateBack} title="Back" />
					</div>
				</Card>
			</main>

			<main>
				<CssBaseline />
				<Paper>
					<Typography component="h5" variant="h5">
						Cast Member(s)
					</Typography>
					<List>
						{creditInfo.cast.map((castMember) => {
							const profilePic = castMember.profile_path ? getTheMovieDBImageURL(castMember.profile_path) : castMember.profilePic
							return (
								<ListItem key={castMember.name}>
									<Avatar alt={castMember.name} src={profilePic}>
										<Icon component={Image} />
									</Avatar>
									<ListItemText primary={castMember.name} secondary={castMember.character} />
								</ListItem>
							)
						})}
					</List>
				</Paper>
			</main>
		</div>
	)
}

export default MovieDetails
