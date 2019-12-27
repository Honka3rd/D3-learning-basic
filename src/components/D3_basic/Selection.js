import React, { Component } from "react";
import * as D3 from "d3";

class Selection extends Component {
	DATASET = [0, 1, 2, 3, 4, 5];

	componentDidMount() {
		D3.select(".template")
			.selectAll("p") // select nothing, just prepare "chairs" for incomming data inside waiting room
			.data(this.DATASET) // load data into waiting room
			.enter() // enter waiting room
			.append("p") // append paragraph tag based on data length / "chairs" length
			.text((d) => {
				return d;
			}) // text each paragraph
			.style("color", (d) => {
				if (d * 25 < 255) {
                    console.log("called")
                    return `RGB(${d * 25},${d * 25},230)`
                }
				else return `RGB(255,130,230)`;
			}).style("font-size", "40px");
	}

	render() {
		return <div className={`template`}></div>;
	}
}

export default Selection;
