import React, { Component } from "react";
import * as D3 from "d3";

class Barchart extends Component {
	constructor() {
		super();
		this.keys = ["pigeons", "doves", "eagles"];
		this.data = [
			{ pigeons: 6, doves: 8, eagles: 15 },
			{ pigeons: 9, doves: 15, eagles: 5 },
			{ pigeons: 11, doves: 13, eagles: 14 },
			{ pigeons: 15, doves: 4, eagles: 20 },
			{ pigeons: 22, doves: 25, eagles: 23 }
		];

		this.chart_width = 800;
		this.chart_height = 400;
		this.color = D3.scaleOrdinal(D3.schemeCategory10);
	}

	componentDidMount() {
		const svg = D3.select("#chart")
			.append("svg")
			.attr("width", this.chart_width)
			.attr("height", this.chart_height);

		// group data by catagory
		const stack = D3.stack().keys([this.keys[0], this.keys[1], this.keys[2]]);
        const stack_data = stack(this.data);
        console.log(stack_data);

		const x_scale = D3.scaleBand()
			.domain(D3.range(this.data.length))
			.range([0, this.chart_width])
			.paddingInner(0.05);

		const y_scale = D3.scaleLinear()
			.domain([
				0,
				D3.max(this.data, (d) => {
					return d.pigeons + d.doves + d.eagles;
				})
			])
			.range([this.chart_height, 0]);

		const groups = svg
			.selectAll("g")
			.data(stack_data)
			.enter()
			.append("g")
			.style("fill", (d, i) => {
                console.log(d)
				return this.color(i);
			});

		groups
			.selectAll("rect")
			.data((d) => {
				return d;
			})
			.enter()
			.append("rect")
			.attr("x", (d, i) => {
                console.log(d)
				return x_scale(i);
			})
			.attr("y", (d) => {
				return y_scale(d[1]);
			})
			.attr("height", (d) => {
				return y_scale(d[0]) - y_scale(d[1]);
			})
			.attr("width", x_scale.bandwidth());
	}

	render() {
		const style = {
			chart: {
				width: "800px",
				height: "400px",
				backgroundColor: "#f7f7f7",
				margin: "25px auto"
			}
		};
		return <div id='chart' style={style.chart}></div>;
	}
}

export default Barchart;
