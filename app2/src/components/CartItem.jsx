import React from "react";
import {
	Card,
	CardActions,
	Typography,
	Button,
	CardContent,
	CardMedia
} from "@material-ui/core";
import useStyle from "./stylesCartItem";

const CartItem = ({ item, onUpdateCartQuantity, onRemoveFromCart }) => {
	const classes = useStyle();

	return (
		<Card>
			<CardMedia
				image={item.media.source}
				alt={item.name}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				<Typography variant='h4'>{item.name}</Typography>
				<Typography variant='h5'>
					{item.line_total_formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<Button
						type='button'
						size='small'
						onClick={() => onUpdateCartQuantity(item.id, item.quantity - 1)}>
						-
					</Button>
					<Typography>{item.quantity}</Typography>
					<Button
						type='button'
						size='small'
						onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}>
						+
					</Button>
				</div>
				<Button
					variant='contained'
					type='button'
					color='secondary'
					onClick={() => onRemoveFromCart(item.id)}>
					Remove from the Cart
				</Button>
			</CardActions>
		</Card>
	);
};

export default CartItem;
