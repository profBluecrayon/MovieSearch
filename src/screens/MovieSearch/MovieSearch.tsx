import { Button, CssBaseline, FormControl, Input, InputLabel, List } from '@mui/material'
import { ChangeEvent, MouseEvent, useState } from 'react'

import { CustomAppBar, CustomCard, CustomSnackbar } from 'components'
import { searchForIMDBTitle } from 'utils'

import { MovieItem } from 'helpers/types'
import SearchResultItem from './SearchResultItem'
import useStyles from './MovieSearch.styles'

interface SearchProps {
	query: string
	results: MovieItem[]
	successOpen: boolean
	failedOpen: boolean
}

const MovieSearch = () => {
	const { classes } = useStyles()
	const [search, setSearch] = useState<SearchProps>({
		query: '',
		results: Array<MovieItem>(),
		successOpen: false,
		failedOpen: false,
	})

	const handleSuccessClose = () => {
		setSearch({ ...search, successOpen: false })
	}
	const handleFailedClose = () => {
		setSearch({ ...search, failedOpen: false })
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch({
			...search,
			query: e.target.value,
		})
	}

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (!search.query) return

		searchForIMDBTitle(search.query, (searches) => {
			const newResults: MovieItem[] = []

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
					{/* REMOVED ONCLICK FROM FORM */}
					<form className={classes.form}>
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
									isAdult={searchItem.isAdult}
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
