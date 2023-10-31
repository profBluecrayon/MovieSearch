import { Link } from 'react-router-dom'
import { ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

const SearchResultItem = ({ id, tconst, primaryTitle, startYear, genres }) => {
	return (
		<Link to={`/movie/${id}/${tconst}`} className="list-group-item" key={id}>
			<ListItemButton>
				<ListItemText primary={`${primaryTitle} (${startYear})`} secondary={genres} />
			</ListItemButton>
		</Link>
	)
}

export default SearchResultItem
