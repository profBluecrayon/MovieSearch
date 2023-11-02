import { Link } from 'react-router-dom'
import { ListItemButton, ListItemText } from '@mui/material'

import { MovieItem } from 'helpers/types'

const SearchResultItem = (item: MovieItem) => {
	const { id, tconst, primaryTitle, startYear, genres } = item

	return (
		<Link to={`/movie/${id}/${tconst}`} state={item} className="list-group-item" key={id}>
			<ListItemButton>
				<ListItemText primary={`${primaryTitle} (${startYear})`} secondary={genres} />
			</ListItemButton>
		</Link>
	)
}

export default SearchResultItem
