import React, { useState, useEffect } from "react";
import {
	InputLabel,
	Button,
	Grid,
	Typography,
	Select,
	MenuItem
} from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken, next }) => {
	const methods = useForm();

	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");

	const options = shippingOptions.map((shippingOption) => ({
		id: shippingOption.id,
		label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`
	}));

	//fetch countries from the API
	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);

		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubdivisions = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);

		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		region = null
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, region }
		);

		setShippingOptions(options);
		setShippingOption(options[0].id);
	};
	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, [checkoutToken.id]);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision)
			fetchShippingOptions(
				checkoutToken.id,
				shippingCountry,
				shippingSubdivision
			);
	}, [shippingSubdivision, checkoutToken.id, shippingCountry]);

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Shipping Address
			</Typography>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit((data) =>
						next({
							...data,
							shippingCountry,
							shippingSubdivision,
							shippingOption
						})
					)}>
					<Grid container spacing={3}>
						<FormInput name='firstName' label='First name' required />
						<FormInput name='lastName' label='Last name' required />
						<FormInput name='email' label='Email' required />
						<FormInput name='address1' label='Address 1' required />
						<FormInput name='address2' label='Address 2' required />
						<FormInput name='city' label='City' required />
						<FormInput name='zip' label='ZIP / Postal code' required />
						<FormSelect
							objectItems={shippingCountries}
							inputLabel='Shipping Country'
							value={shippingCountry ? shippingCountry : ""}
							onChange={(e) => setShippingCountry(e.target.value)}
						/>
						<FormSelect
							objectItems={shippingSubdivisions}
							inputLabel='Shipping Subdivision'
							value={shippingSubdivision ? shippingSubdivision : ""}
							onChange={(e) => setShippingSubdivision(e.target.value)}
						/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption ? shippingOption : ""}
								fullWidth
								onChange={(e) => setShippingOption(e.target.value)}>
								{options.map((shippingOption) => (
									<MenuItem key={shippingOption.id} value={shippingOption.id}>
										{shippingOption.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<br />
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Button component={Link} to='/cart' variant='outlined'>
							Back to Cart
						</Button>
						<Button variant='contained' type='submit' color='primary'>
							Next
						</Button>
					</div>
				</form>
			</FormProvider>
		</>
	);
};

export default AddressForm;
