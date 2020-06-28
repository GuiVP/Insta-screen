import React, { useState, useEffect } from 'react'

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
    CardActions,
    CardContent,
    Divider,
    TextField,
    Hidden
} from '@material-ui/core'
import {
    FavoriteBorderRounded,
    Publish
} from '@material-ui/icons'

import api from '../../services/apiConfig';
import { useHistory } from 'react-router-dom';
import {useDropzone} from 'react-dropzone'

interface StateCreate {
    image: string | File
    imageUrl: string
    author: string
    place: string
    description: string
    hashtags: string
    imageError: boolean
    authorError: boolean
}


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			padding: '20px 70px',
			[theme.breakpoints.down('sm')]: {
				padding: 10
			},
		},
		newButton: {
			padding: '20px 30px',
			borderRadius: 50,
			marginBottom: 30
		},
		newButtonText: {
			margin: '0 auto'
        },
        card: {
            width: '100%',
            marginTop: 20,
            paddingBottom: 20
        },
        cardHeader: {
            margin: '20px 0'
        },
        cardInput: {
            [theme.breakpoints.down('sm')]: {
                margin: '15px 0',
                width: '100%'
            }
        },
        cardActions: {
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        },
        cardImage: {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#000',
            height: 600,
            [theme.breakpoints.down('sm')]: {
                height: 350
            },
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        icon: {
            fontSize: '6em',
            color: '#333',
            transition: '0.2s ease-in-out',
            '&:hover': {
                color: '#000'
            }
        },
        inputHashtag: {
            marginTop: 30,
            width: 200,
            color: '#b2b2b2',
            [theme.breakpoints.down('md')]: {
                margin: '20px 0',
                width: '100%'
            }
        },
        divButton: {
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0'
        }
	})
)

const Home: React.FC = () => {
    const classes = useStyles()
    const history = useHistory()
    let imageUrl = ""
    
    const [stateCreate, setStateCreate] = useState<StateCreate>({
        image: "",
        imageUrl: "",
        author: "",
        place: "",
        description: "",
        hashtags: "",
        imageError: false,
        authorError: false
    })

    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        accept: 'image/*',
        maxSize: 5242880,
        onDrop: acceptedFiles => {
            imageUrl = URL.createObjectURL(acceptedFiles[0])
            setStateCreate({
                ...stateCreate,
                imageUrl,
                image: acceptedFiles[0]
            })
        }
    })


    const handleChange = (key: keyof StateCreate) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateCreate({
            ...stateCreate,
            [key]: e.target.value
        });
    }

    const handleSubmit = async () => {
        if (stateCreate.image === "") return setStateCreate({...stateCreate, imageError: true})
        if (stateCreate.author === "") return setStateCreate({...stateCreate, authorError: true})

        const data = new FormData()

        data.append('image', stateCreate.image)
        data.append('author', stateCreate.author)
        data.append('place', stateCreate.place)
        data.append('description', stateCreate.description)
        data.append('hashtags', stateCreate.hashtags)

        const create = await api.post('/posts', data)

        if (create) return history.push('/') 
        else return console.log("erro");
    }

    return (
		<Container className={classes.container}>
			<Toolbar />
			<Grid item lg={10} xs={12} >
				<Grid container item lg={12}>
                    <Card className={classes.card}>
                        <Grid container justify="space-between" className={classes.cardHeader}>
                            <Grid container item sm={3} xs={12} justify="center" className={classes.cardInput}>
                                <TextField required id="author" placeholder="Insira o nome do autor..." style={{ fontWeight: 600 }} value={stateCreate.author} onChange={handleChange("author")} error={stateCreate.authorError}/>
                            </Grid>
                            <Grid container item sm={3} xs={12} justify="center" className={classes.cardInput}>
                                <TextField required id="places" placeholder="Insira o lugar..." style={{ fontWeight: 600 }} value={stateCreate.place} onChange={handleChange("place")} />
                            </Grid>
                        </Grid>
                        <img src={imageUrl} alt=""/>
                        <CardMedia
                            title="Post"
                            style={
                                stateCreate.image !== "" ? {backgroundImage: `url(${stateCreate.imageUrl})`} : { backgroundColor: '#f9f9f9'}
                            }
                            className={classes.cardImage}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} required/>
                            {stateCreate.imageUrl === "" ? acceptedFiles ? (
                                <>
                                    <Publish className={classes.icon} />
                                    <Typography variant="subtitle2" align="center" style={{ fontWeight: 800 }} color="textSecondary">
                                        Solte o arquivo para subir sua imagem
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Publish className={classes.icon}/>
                                    <Typography variant="subtitle2" align="center" style={{ fontWeight: 800 }} color="textSecondary">
                                        Arraste um arquivo ou clique para subir sua imagem
                                    </Typography>
                                </>
                            ) : ""}
                        </CardMedia>
                        <Divider />
                        <CardActions className={classes.cardActions}>
                            <FavoriteBorderRounded />
                            <div style={{ marginTop: 10}}>
                                <Typography variant="subtitle2" style={{ fontWeight: 800 }}>
                                    0 curtidas
                                </Typography>
                            </div>
                        </CardActions>
                        <CardContent style={{ paddingTop: 0 }}>
                            <TextField required id="description" style={{ marginTop: 20 }} fullWidth  placeholder="Insira a descrição..." value={stateCreate.description} onChange={handleChange("description")} />
                            <TextField required id="hashtags" className={classes.inputHashtag} color="primary" placeholder="Insira as hashtags..." value={stateCreate.hashtags} onChange={handleChange("hashtags")} />
                        </CardContent>
                        <div className={classes.divButton}>
                            <Button variant="outlined" onClick={handleSubmit}>Criar Post</Button>
                        </div>
                    </Card>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Home
