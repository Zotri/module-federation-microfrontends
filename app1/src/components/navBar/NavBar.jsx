import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	Typography
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyle from "./styles";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = ({ totalItems }) => {
	const classes = useStyle();
	const location = useLocation();

	return (
		<>
			<AppBar position='fixed' className={classes.appBar} color='inherit'>
				<Toolbar>
					<Typography
						className={classes.titel}
						component={Link}
						to='/'
						variant='h6'
						color='inherit'>
						<img
							className={classes.image}
							src={logo}
							alt='E-Commerce'
							height='25px'
						/>
						E-Commerce
					</Typography>
					<div className={classes.grow} />
					{location.pathname === "/" && (
						<div className={classes.button}>
							<IconButton
								component={Link}
								to='/cart'
								aria-label='show cart items'
								color='inherit'>
								<Badge badgeContent={totalItems} color='secondary'>
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
