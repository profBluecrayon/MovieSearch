import { AppBar, Button, CssBaseline, FormControl, Input, InputLabel, List, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'

import { CustomSnackbar, SearchResultItem } from 'components'
import { searchForIMDBTitle } from 'helpers'

const MovieSearch = () => {
	const [state, setState] = useState({
		searchQuery: '',
		results: [],
		successOpen: false,
		failedOpen: false,
	})

	const handleSuccessClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setState({ ...state, successOpen: false })
	}
	const handleFailedClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setState({ ...state, failedOpen: false })
	}
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!state.searchQuery) return

		searchForIMDBTitle(state.searchQuery, (searches) => {
			const newState = []

			for (const searchItem in searches) {
				newState.push({
					id: searchItem,
					originalTitle: searches[searchItem].originalTitle,
					primaryTitle: searches[searchItem].primaryTitle,
					endYear: searches[searchItem].endYear,
					genres: searches[searchItem].genres,
					isAdult: searches[searchItem].isAdult,
					runtimeMinutes: searches[searchItem].runtimeMinutes,
					startYear: searches[searchItem].startYear,
					tconst: searches[searchItem].tconst,
					titleType: searches[searchItem].titleType,
				})
			}

			const isSuccess = newState.length > 0
			setState({
				results: newState,
				searchQuery: '',
				successOpen: isSuccess,
				failedOpen: !isSuccess,
			})
		})
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
				<Paper>
					<form onSubmit={handleSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="searchQuery">Search Movies</InputLabel>
							<Input id="searchQuery" name="searchQuery" autoComplete="searchQuery" onChange={handleChange} value={state.searchQuery} autoFocus />
						</FormControl>
						<Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}>
							Submit
						</Button>
					</form>
				</Paper>
			</main>
			<main>
				<CssBaseline />
				<Paper>
					<List>
						{state.results.map((searchItem) => (
							<SearchResultItem
								key={searchItem.id}
								id={searchItem.id}
								primaryTitle={searchItem.primaryTitle}
								originalTitle={searchItem.originalTitle}
								runtimeMinutes={searchItem.runtimeMinutes}
								tconst={searchItem.tconst}
								genres={searchItem.genres}
								titleType={searchItem.titleType}
								endYear={searchItem.endYear}
								startYear={searchItem.startYear}
							/>
						))}
					</List>
				</Paper>
			</main>
			<CustomSnackbar open={state.successOpen} message={`${state.results.length} Search Result(s) found successfully!`} onClose={handleSuccessClose} variant="success" />
			<CustomSnackbar open={state.failedOpen} onClose={handleFailedClose} message="No Results found, try another movie!" variant="error" />
		</div>
	)
}

export default MovieSearch
