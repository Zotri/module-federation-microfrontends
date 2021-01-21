import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	HashRouter
} from "react-router-dom";
import { commerce } from "./lib/commerce.js";
import RouterConfig from "./routes";

const Products = React.lazy(() => import("app1/App"));
const Cart = React.lazy(() => import("app2/App"));
const Checkout = React.lazy(() => import("app3/App"));

const App = () => {
	// using useEffect to fetch products immediately after the application loads
	// const [products, setProducts] = useState([]);
	// const [cart, setCart] = useState({
	// 	line_items: [],
	// 	subtotal: {
	// 		formatted_with_symbol: ""
	// 	}
	// });
	// const [order, setOrder] = useState({});
	// const [errorMessage, setErrorMessage] = useState("");

	// const fetchItemsFromCart = async () => {
	// 	setCart(await commerce.cart.retrieve());
	// };

	// const fetchProducts = async () => {
	// 	const { data } = await commerce.products.list();
	// 	setProducts(data);
	// };

	// const handleCartClick = async (producId, quantity) => {
	// 	const { cart } = await commerce.cart.add(producId, quantity);

	// 	setCart(cart);
	// };

	// const handleUpdateCartQuantity = async (productId, quantity) => {
	// 	//quantity in object because quantity one of the items that you want to update
	// 	const { cart } = await commerce.cart.update(productId, { quantity });

	// 	setCart(cart);
	// 	console.log("cart update", cart);
	// };

	// const hanldeRemoveFromCart = async (productId) => {
	// 	const { cart } = await commerce.cart.remove(productId);

	// 	setCart(cart);
	// };

	// const handleEmptyCart = async () => {
	// 	const { cart } = await commerce.cart.empty();

	// 	setCart(cart);
	// };

	// const refreshCart = async () => {
	// 	const newCart = await commerce.cart.refresh();

	// 	setCart(newCart);
	// };

	// const hanldeCaptureCheckout = async (checkoutTokenId, newOrder) => {
	// 	try {
	// 		const incomingOrder = await commerce.checkout.capture(
	// 			checkoutTokenId,
	// 			newOrder
	// 		);

	// 		setOrder(incomingOrder);
	// 		console.log("refresh");
	// 		refreshCart();
	// 	} catch (error) {
	// 		setErrorMessage(error.data.error.message);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchProducts();
	// 	fetchItemsFromCart();
	// }, []);

	// console.log("- - - cart - - -", cart);
	// console.log("- - - products api commerce - - -", products);

	return (
		<>
			<HashRouter>
				<React.Suspense fallback='loading ...'>
					<RouterConfig />
				</React.Suspense>
			</HashRouter>
			<h4>Module Federation master - app4 &#128151;</h4>
		</>
	);
};

export default App;
