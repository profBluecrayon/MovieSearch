import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
	bigAvatar: {
		margin: 10,
		width: 50,
		height: 50,
	},
	container: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up('xs')]: {
			width: '95%',
			maxWidth: 800,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		objectFit: 'fill',
		width: 200,
		padding: theme.spacing(1),
		borderRadius: 16,
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	imageContainer: {
		display: 'flex',
	},
	list: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up('xs')]: {
			width: 800,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
}))

export default useStyles
