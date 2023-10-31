import { Close } from '@mui/icons-material'
import { Icon, IconButton, Snackbar } from '@mui/material'
import React from 'react'

import useStyles from './CustomSnackbar.styles'

const CustomSnackbar = ({ message, variant, onClose, ...other }) => {
	const { classes } = useStyles()

	return (
		<Snackbar
			action={[
				<IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
					<Icon component={Close} className={classes.icon} />
				</IconButton>,
			]}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			aria-describedby="client-snackbar"
			autoHideDuration={3000}
			ContentProps={{ className: classes[variant] }}
			message={
				<span id="client-snackbar" className={classes.message}>
					{message}
				</span>
			}
			onClose={onClose}
			{...other}
		/>
	)
}

export default CustomSnackbar
