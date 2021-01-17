import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Divider,
	Button,
	CircularProgress,
	CssBaseline
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];
//purchasing process
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
	const classes = useStyles();
	let history = useHistory();
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});

	const Form = () =>
		activeStep === 0 ? (
			<AddressForm checkoutToken={checkoutToken} next={next} />
		) : (
			<PaymentForm
				shippingData={shippingData}
				checkoutToken={checkoutToken}
				nextStep={nextStep}
				backStep={backStep}
				onCaptureCheckout={onCaptureCheckout}
			/>
		);

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {
					type: "cart"
				});
				setCheckoutToken(token);
			} catch (error) {
				console.log("Error", error);
				history.push("/");
			}
		};

		generateToken();
	}, [cart, history]);

	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const next = (data) => {
		setShippingData(data);
		nextStep();
	};

	let Confirmation = () =>
		order.customer ? (
			<>
				<div>
					<Typography variant='h5'>
						Thank you for your purchase, {order.customer.firstname}{" "}
						{order.customer.lastname}
					</Typography>
					<Divider className={classes.divider} />
					<Typography variant='subtitle2'>
						Order ref: {order.customer_reference}{" "}
					</Typography>
				</div>
				<br />
				<Button component={Link} to='/' variant='outlined' type='button'>
					Continue Shopping :)
				</Button>
			</>
		) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		);

	if (error) {
		<>
			<Typography variant='h5'>Error :( {error} </Typography>
			<br />
			<Button component={Link} to='/' variant='outlined' type='button'>
				go to Home?
			</Button>
		</>;
	}

	return (
		<>
			<CssBaseline />
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant='h4' align='center'>
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
						checkoutToken && <Form />
					)}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
