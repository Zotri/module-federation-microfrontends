import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import { commerce } from "./lib/commerce";

const App = () => {
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [cart, setCart] = useState({
		line_items: [],
		subtotal: {
			formatted_with_symbol: ""
		}
	});

	const fetchItemsFromCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();

		setCart(newCart);
	};

	const hanldeCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);

			setOrder(incomingOrder);
			console.log("refresh");
			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
		fetchItemsFromCart();
	}, []);

	console.log("- - - checkout app3 - - -");

	return (
		<>
			<Router>
				<div>
					<Route>
						<Checkout
							cart={cart}
							order={order}
							onCaptureCheckout={hanldeCaptureCheckout}
							error={errorMessage}
						/>
					</Route>
				</div>
			</Router>
			<h4>Module Federation 3 - app3 &#128151;</h4>
		</>
	);
};

export default App;
