import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
	cardContainer: {
		marginTop: theme.spacing(1),
		padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
	},
}))

export default useStyles
