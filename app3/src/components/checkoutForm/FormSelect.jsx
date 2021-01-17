import React from "react";
import { Grid, InputLabel, MenuItem, Select } from "@material-ui/core";

const objectoToArray = (object) => {
	return Object.entries(object).map(([code, country]) => ({
		id: code,
		label: country
	}));
};

const FormSelect = ({ objectItems, inputLabel, value, onChange }) => {
	const arrayOfcountries = objectoToArray(objectItems);
	return (
		<Grid item xs={12} sm={6}>
			<InputLabel>{inputLabel}</InputLabel>
			<Select value={value} fullWidth onChange={onChange}>
				{arrayOfcountries.map((country) => (
					<MenuItem key={country.id} value={country.id}>
						{country.label}
					</MenuItem>
				))}
			</Select>
		</Grid>
	);
};

export default FormSelect;
