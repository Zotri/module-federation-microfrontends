import React from "react";
import RouterConfig from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
	return (
		<>
			<Router>
				<React.Suspense fallback='loading ...'>
					<RouterConfig />
				</React.Suspense>
				<h4>Module Federation master - app4 &#128151;</h4>
			</Router>
		</>
	);
};

export default App;
