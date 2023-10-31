import { Paper } from '@mui/material'
import React from 'react'

import useStyles from './CustomCard.styles'

// TODO: REMOVE THIS AND OVERWRITE MUI PADDING FOR PAPER
const CustomCard = ({ children, className }) => {
	const { classes } = useStyles()

	return (
		<Paper elevation={2} className={`${classes.cardContainer} ${className}`}>
			{children}
		</Paper>
	)
}

export default CustomCard
