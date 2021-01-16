import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
	Collapse
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./stylesProduct";

// this component renders specifications for each product rendered in the grid
const Product = ({ product, onCartClick }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={product.media.source}
				titel={product.name}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant='h6' align='left' gutterBottom>
						{product.name}
					</Typography>
					<Typography variant='h5'>
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
			</CardContent>
			<Collapse
				className={classes.cardContent}
				collapsedHeight='10px'
				in={expanded}>
				<CardContent>
					<Typography
						display='block'
						align='center'
						dangerouslySetInnerHTML={{ __html: product.description }}
						variant='body2'
						color='textSecondary'
					/>
				</CardContent>
			</Collapse>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label='Read more' onClick={handleExpandClick}>
					<ExpandMoreIcon />
				</IconButton>
				<IconButton
					aria-label='Add to Cart'
					onClick={() => onCartClick(product.id, 1)}>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;
