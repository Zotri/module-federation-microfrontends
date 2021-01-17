import React from "react";
import { Grid, Button, Typography, Container } from "@material-ui/core";
import useStyles from "./stylesCart";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = ({
	cart,
	onUpdateCartQuantity,
	onRemoveFromCart,
	onEmptyCart
}) => {
	const classes = useStyles();

	const EmptyCart = () => (
		<Typography variant='subtitle1'>
			You have no items in your shopping cart,
			<Link to='/' className={classes.link}>
				start adding some
			</Link>
			!
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((productItem) => (
					<Grid item xs={12} sm={4} key={productItem.id}>
						<CartItem
							item={productItem}
							onUpdateCartQuantity={onUpdateCartQuantity}
							onRemoveFromCart={onRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant='h4'>
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size='large'
						type='button'
						variant='contained'
						color='secondary'
						onClick={onEmptyCart}>
						Empty Cart
					</Button>
					<Button
						className={classes.checkoutButton}
						component={Link}
						to='/checkout'
						size='large'
						type='button'
						variant='contained'
						color='primary'>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);
	// render loading if no data have been fetched yet!! Alternative you can initiate a value "cart.line_items" as an empty array in the state!
	//if (!cart.line_items) return "Loading...";
	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant='h3' gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
