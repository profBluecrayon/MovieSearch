import { amber, green } from '@mui/material/colors'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}))

export default useStyles
