import React from "react";
import RouterConfig from "./routes";

const App = () => {
	return (
		<>
			<React.Suspense fallback='loading ...'>
				<RouterConfig />
			</React.Suspense>
			<h4>Module Federation master - app4 &#128151;</h4>
		</>
	);
};

export default App;
