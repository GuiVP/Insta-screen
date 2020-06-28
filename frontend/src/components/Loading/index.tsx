import React from 'react'

import Skeleton from '@material-ui/lab/Skeleton';
import {
	Theme,
	makeStyles,
	createStyles,
	Grid,
	Card,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
			cardHeader: {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				margin: 20,
			},
			card: {
					width: '100%',
					marginTop: 20,
					paddingBottom: 20
			},
			cardActions: {
					padding: 10,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
			},
			cardActionsText: {
				marginTop: '-20px',
				padding: '0 10px',
				display: 'flex',
				justifyContent: 'center',
		},
    })
)


const PostLoading= () => {
	const classes = useStyles()

	return (
		<Grid container item lg={12}>
			<Card className={classes.card}>
					<div className={classes.cardHeader}>
						<Skeleton animation="wave" variant="text" height={20} width="20%"/>
						<Skeleton animation="wave" height={15} width="20%"/>
					</div>
					<Skeleton animation="wave" variant="rect" width="100%" style={{ marginTop: 30 }} height={400}/>
					<div className={classes.cardActions}>
						<Skeleton animation="wave" variant="circle" height={40} width={40} />
						<Skeleton animation="wave" variant="text" height={40} width="20%"/>
					</div>
					<div className={classes.cardActionsText}>
						<Skeleton animation="wave" variant="text" height={150} width="100%" />
					</div>
					<div className={classes.cardActions}>
						<Skeleton animation="wave" height={10} width="20%"/>
					</div>
			</Card>
		</Grid>
	)
}

export default PostLoading