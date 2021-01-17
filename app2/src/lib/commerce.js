import Commerce from "@chec/commerce.js";

// sign in to receive a pb key
export const commerce = new Commerce(
	process.env.REACT_APP_CHEC_PUBLIC_KEY,
	true
);
