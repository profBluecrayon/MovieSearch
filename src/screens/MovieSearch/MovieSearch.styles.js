import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	input: {
		marginLeft: 8,
		flex: 1,
	},
	list: {
		marginTop: theme.spacing(2),
		flexDirection: 'column',
		width: '100%',
		alignItems: 'left',
	},
	listMain: {
		width: 'auto',
		display: 'block',
		marginTop: theme.spacing(2),
		maxWidth: 580,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	searchMain: {
		display: 'block',
		width: 'auto',
		maxWidth: 600,
		marginTop: theme.spacing(2),
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	submitButton: {
		marginTop: theme.spacing(3),
	},
}))

export default useStyles
