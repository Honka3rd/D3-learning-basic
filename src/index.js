import React from "react";
import ReactDOM from "react-dom";
import Bundled from "./App";

const App = () => {
	return (
		<div>
			<Bundled />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
