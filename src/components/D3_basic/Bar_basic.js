import React, { Component } from "react";
import * as D3 from "d3";

class BarBasic extends Component {

	componentDidMount() {
		D3.json("./data/source.json").then((val) => {
			D3.select(".template")
				.selectAll("div")
				.data(val)
				.enter()
				.append("div")
				.style("height", (d) => {
					return `${d * 10}px`;
                })
                .style("background-color", (d)=>{
                    return `RGB(255,${100 + d * 20},80)`
                })
                .attr("class", "bar")
                .style("width", "30px")
                .style("margin-left", "5px")
                .style("margin-right", "5px")
                .style("display", "inline-block");
		});
	}

	render() {
		return <div className={`template`}></div>;
	}
}

export default BarBasic;
