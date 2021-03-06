import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Products from "./components/Products";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "@material-ui/core";

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({
		line_items: [],
		subtotal: {
			formatted_with_symbol: ""
		}
	});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		console.log("msg from app1");
		setProducts(data);
	};

	const handleCartClick = async (producId, quantity) => {
		const { cart } = await commerce.cart.add(producId, quantity);

		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log("- - - products api commerce app1- - -", products);
	return (
		<>
			<div>
				<NavBar totalItems={cart.total_items} />
				<Products products={products} onCartClick={handleCartClick} />
			</div>
			<h4>Module Federation 1 - app1 &#128151;</h4>
		</>
	);
};

export default App;
