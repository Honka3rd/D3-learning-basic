import React, { Component } from "react";
import * as D3 from "d3";
import $ from "jquery";

class Piechart extends Component {
	constructor() {
		super();
		this.data = [30, 15, 25, 45, 20];
		this.chart_width = 600;
		this.chart_height = 600;

		// category spectrum
		this.color = D3.scaleOrdinal(D3.schemeCategory10);
	}

	componentDidMount() {
		// this function can take data and convert it
		// canb be used in drawing pie slice
		const pie = D3.pie();

		// outer radius
		const outer_r = this.chart_height / 2;
		// inner radius
		const inner_r = this.chart_height / 4;

		const arc = D3.arc()
			.innerRadius(inner_r)
			.outerRadius(outer_r);

		const svg = D3.select("#chart")
			.append("svg")
			.attr("width", this.chart_width)
			.attr("height", this.chart_height);

		const arcs = svg
			.selectAll("g.arc")
			// convert data to be suited for creating pies
			.data(pie(this.data))
			.enter()
			.append("g")
			.attr("class", "arc")
			// translate each g with same coordinates
			// each g owns different starting point
			.attr("transform", `translate(${outer_r},${this.chart_height / 2})`);

		// continue looping adding path based on data length
		arcs
			.append("path")
			.attr("fill", (d, i) => {
				return this.color(i);
			})
			// draw arc one by one based on angle inside pie(data)
			// call behind: arc(pie(data[i])) in a loop
			// to gegerate command as d
			.attr("d", arc);

		arcs
			.append("text")
			.attr("transform", (d, i) => {
				//
				return `translate(${arc.centroid(d)})`;
			})
			.attr("text-anchor", "text-middle")
			.attr("class", "arc-text")
			.text((d) => {
				// display the original value rather than converted one
				return d.value;
			});

		$(".arc-text").css({
			"font-family": "sans-serif",
			"font-size": "18px",
			fill: " white"
		});
	}

	render() {
		const style = {
			chart: {
				width: "600px",
				height: "600px",
				backgroundColor: "#f7f7f7",
				margin: "25px auto"
			}
		};
		return <div id='chart' style={style.chart}></div>;
	}
}

export default Piechart;
