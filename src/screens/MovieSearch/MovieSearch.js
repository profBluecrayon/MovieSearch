import { Button, CssBaseline, FormControl, Input, InputLabel, List } from '@mui/material'
import React, { useState } from 'react'

import { CustomAppBar, CustomCard, CustomSnackbar } from 'components'
import { searchForIMDBTitle } from 'utils'
import SearchResultItem from './SearchResultItem'
import useStyles from './MovieSearch.styles'

const MovieSearch = () => {
	const { classes } = useStyles()
	const [search, setSearch] = useState({
		query: '',
		results: [],
		successOpen: false,
		failedOpen: false,
	})

	const handleSuccessClose = (_e, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setSearch({ ...search, successOpen: false })
	}
	const handleFailedClose = (_e, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setSearch({ ...search, failedOpen: false })
	}

	const handleChange = (e) => {
		setSearch({
			...search,
			query: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!search.query) return

		searchForIMDBTitle(search.query, (searches) => {
			const newResults = []

			for (const searchItem in searches) {
				newResults.push({
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

			const isSuccess = newResults.length > 0
			setSearch({
				results: newResults,
				query: '',
				successOpen: isSuccess,
				failedOpen: !isSuccess,
			})
		})
	}

	return (
		<div>
			<CustomAppBar />
			<main className={classes.searchMain}>
				<CssBaseline />
				<CustomCard>
					<form className={classes.form} onSubmit={handleSubmit}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="searchQuery">Search Movies</InputLabel>
							<Input id="searchQuery" name="searchQuery" autoComplete="searchQuery" onChange={handleChange} value={search.query} autoFocus />
						</FormControl>
						<Button className={classes.submitButton} type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}>
							Submit
						</Button>
					</form>
				</CustomCard>
			</main>
			{!!search.results.length && (
				<main className={classes.listMain}>
					<CssBaseline />
					<CustomCard>
						<List className={classes.list}>
							{search.results.map((searchItem) => (
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
					</CustomCard>
				</main>
			)}
			<CustomSnackbar open={search.successOpen} message={`${search.results.length} Search Result(s) found successfully!`} onClose={handleSuccessClose} variant="success" />
			<CustomSnackbar open={search.failedOpen} message="No Results found, try another movie!" onClose={handleFailedClose} variant="error" />
		</div>
	)
}

export default MovieSearch
