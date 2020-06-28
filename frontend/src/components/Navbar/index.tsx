import React from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Theme,
	makeStyles,
	createStyles,
	Hidden
} from '@material-ui/core'

import { Link, useHistory } from 'react-router-dom'

import './style.scss'

const logado = true

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerContainer: {
			overflow: 'auto',
		},
	})
)

const Navbar = () => {
	const classes = useStyles()
	const history = useHistory()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	
	const handleClose = () => {
		setAnchorEl(null)
	}
	
	return (
		<>
			<AppBar id="main-header" position="fixed" className={classes.appBar} elevation={0}>
				<Toolbar className="header-content">
					<Link to="/">
						<Typography variant="h5" color="inherit" style={{ color: "#fff" }}>
							InstaScreen
						</Typography>
					</Link>
					<div>
						<Hidden xsDown>
							<Button onClick={() => history.push('/create')} color="inherit">
								Criar Post
							</Button>
						</Hidden>
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}
		
export default Navbar