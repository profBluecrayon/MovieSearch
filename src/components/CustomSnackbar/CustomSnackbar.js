import { Close } from '@mui/icons-material'
import { Icon, IconButton, Snackbar } from '@mui/material'
import React from 'react'

const CustomSnackbar = (props) => {
	const { message, onClose, ...other } = props

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			autoHideDuration={6000}
			aria-describedby="client-snackbar"
			message={<span id="client-snackbar">{message}</span>}
			action={[
				<IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
					<Icon component={Close} />
				</IconButton>,
			]}
			{...other}
		/>
	)
}

export default CustomSnackbar
