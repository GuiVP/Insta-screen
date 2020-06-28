import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {
	Toolbar,
	Theme,
	makeStyles,
	createStyles,
	Grid,
	Button,
	Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
	Divider,
	IconButton
} from '@material-ui/core'

import {
	FavoriteBorderRounded,
    FavoriteRounded,
	AddCircleOutlineRounded,
} from '@material-ui/icons'

import api, { baseURL } from '../../services/apiConfig';
import { useHistory } from 'react-router-dom';
import PostLoading from '../../components/Loading';
import socket from '../../services/socketConfig';

interface PostType {
    _id?: string
    author?: string
    place?: string
    description?: string
    hashtags?: string
    image?: string;
    likes?: number
}



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			padding: '20px 70px',
			[theme.breakpoints.down('sm')]: {
				padding: 20
			},
		},
		newButton: {
			padding: '20px 30px',
			borderRadius: 50,
			marginBottom: 30,
			textTransform: 'initial'
		},
		newButtonText: {
			margin: '0 auto'
		},
		cardHeader: {
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
        cardImage: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 400
        },
	})
)

const Home: React.FC = () => {
	const classes = useStyles()
	const [statePost, setStatePost] = useState<any>([])
	const [stateLoading, setStateLoading] = useState<boolean>(false)
	const [stateLiker, setStateLiker] = useState<boolean>(false)
	const history = useHistory()

    const handleLiker = async (id: string | undefined) => {
		await api.post(`/posts/${id}/like`)
		setStateLiker(true)
    }

	const registerToSocket = () => {
		socket.on('post', (newPost: any) => {
		  	setStatePost([newPost, ...statePost]);
		})

		socket.on('deslike', (deslikedPost: any) => {
			setStatePost(statePost.map((post: any) => post._id === deslikedPost._id ? deslikedPost : post))
		})
		socket.on('like', (likedPost: any) => {
			setStatePost(statePost.map((post: any) => post._id === likedPost._id ? likedPost : post))
		})
	}
	

	useEffect(() => {
		(async () => {
			setStateLoading(true)
			const response = await api.get('/posts')
			setStatePost(response.data)
			console.log(response);
		})()
	}, [])

	registerToSocket()

    return (
		<Container className={classes.container}>
			<Toolbar />
			<Grid container item lg={10}>
				<Button variant="outlined" fullWidth className={classes.newButton} onClick={() => history.push('/create')}>
					<AddCircleOutlineRounded fontSize="large" />
					<Typography variant="h6" className={classes.newButtonText}>
						Crie um post
					</Typography>
				</Button>
				<Grid container item lg={12}>
					<Grid container item lg={12}>
					{stateLoading ? 
						statePost.map((post: any) => (
								<Card className={classes.card} key={post._id}>
									<Grid container alignItems="center" className={classes.cardHeader}>
										<Grid item lg={12} xs={12}>
											<Typography variant="subtitle1" style={{ fontWeight: 600 }}>
												{post.author}
											</Typography>
										</Grid>
										<Grid item lg={12} xs={12}>
											<Typography variant="subtitle2" color="textSecondary" style={{ fontWeight: 500 }}>
												{post.place}
											</Typography>
										</Grid>
									</Grid>
									<CardMedia
										title="Post"
										style={{
											backgroundImage: `url(${baseURL}/files/${post.image})`
										}}
										className={classes.cardImage}
									/>
									<Divider />
									<CardActions className={classes.cardActions}>
										<IconButton onClick={() => handleLiker(post._id)}>
											<FavoriteBorderRounded/>
										</IconButton>
										<div style={{ marginTop: 10}}>
											<Typography variant="subtitle2" style={{ fontWeight: 800 }}>
												{post.likes} curtidas
											</Typography>
										</div>
									</CardActions>
									<CardContent style={{ paddingTop: 0 }}>
										<Typography variant="subtitle2" component="p">
											{post.description}
										</Typography>
										<Typography style={{ marginTop: 20 }} variant="subtitle2" component="p" color="primary">
											{post.hashtags}
										</Typography>
									</CardContent>
								</Card>
						))
						: (
							<PostLoading />
						)}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Home
