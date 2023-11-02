import { FC, PropsWithChildren } from 'react'
import { Paper } from '@mui/material'

import useStyles from './CustomCard.styles'

interface CustomCardProps extends PropsWithChildren {
	className?: string
}

// TODO: REMOVE THIS AND OVERWRITE MUI PADDING FOR PAPER
const CustomCard: FC<CustomCardProps> = ({ children, className }) => {
	const { classes } = useStyles()

	return (
		<Paper elevation={2} className={`${classes.cardContainer} ${className}`}>
			{children}
		</Paper>
	)
}

export default CustomCard
