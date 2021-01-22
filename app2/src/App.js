import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import Cart from "./components/Cart";

const App = () => {
	const [cart, setCart] = useState({
		line_items: [],
		subtotal: {
			formatted_with_symbol: ""
		}
	});

	const fetchItemsFromCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleUpdateCartQuantity = async (productId, quantity) => {
		//quantity in object because quantity one of the items that you want to update
		const { cart } = await commerce.cart.update(productId, { quantity });

		setCart(cart);
		console.log("cart update", cart);
	};

	const hanldeRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);

		setCart(cart);
	};

	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();

		setCart(cart);
	};

	useEffect(() => {
		fetchItemsFromCart();
	}, []);

	console.log("- - - cart app2- - -", cart);

	return (
		<>
			<div>
				<Cart
					cart={cart}
					onUpdateCartQuantity={handleUpdateCartQuantity}
					onRemoveFromCart={hanldeRemoveFromCart}
					onEmptyCart={handleEmptyCart}
				/>
			</div>
			<h4>Module Federation 2 - app2 &#128151;</h4>
		</>
	);
};

export default App;
