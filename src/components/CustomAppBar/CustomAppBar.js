import { AppBar, Typography } from '@mui/material'
import React from 'react'

import useStyles from './CustomAppBar.styles'

const CustomAppBar = () => {
	const { classes } = useStyles()

	return (
		<AppBar position="static">
			<Typography className={classes.title} variant="h5" color="inherit" noWrap>
				Movies Search
			</Typography>
		</AppBar>
	)
}

export default CustomAppBar
