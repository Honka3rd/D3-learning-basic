import React, { Component } from "react";
import * as D3 from "d3";

class TimeScale extends Component {
	DATA = [
		["20/10/2012", 1],
		["08/09/2010", 2],
		["01/12/2023", 3],
		["01/07/2023", 4],
		["01/08/2009", 5]
	];

	HEIGHT = 600;
	WIDTH = 800;
	PADDING = 50;

	componentDidMount() {
		const svg = D3.select(".template");
		const time_parse = D3.timeParse("%d/%m/%Y");

		const x_scale = D3.scaleTime()
			.domain([
				D3.min(this.DATA, (d) => {
					return time_parse(d[0]);
				}),
				D3.max(this.DATA, (d) => {
					return time_parse(d[0]);
				})
			])
			.range([this.PADDING, this.WIDTH - this.PADDING]);

		const x_axis = D3.axisBottom(x_scale);
		svg
			.append("g")
			.attr(
				"transform",
				`translate(${-this.PADDING}, ${this.HEIGHT - this.PADDING * 0.5})`
			)
			.style("font-weight", "bold")
			.style("font-size", "15px")
			.call(x_axis);

		const y_scale = D3.scaleLinear()
			.domain([
				0,
				D3.max(this.DATA, (d) => {
					return d[1];
				})
			])
			.range([this.HEIGHT - this.PADDING, this.PADDING]);

		const y_axis = D3.axisRight(y_scale)
			.ticks(this.DATA.length)
			.tickFormat((text) => {
				return `${text}$`;
			});
		svg
			.append("g")
			.style("font-weight", "bold")
			.style("font-size", "15px")
			.call(y_axis);

		const r_scale = D3.scaleSqrt()
			.domain([
				0,
				D3.max(this.DATA, (d) => {
					return d[1];
				})
			])
			.range([0, (this.HEIGHT - this.PADDING) / 10]);

		svg
			.selectAll("circle")
			.data(this.DATA)
			.enter()
			.append("circle")
			.attr("fill", "RGB(95,129,229)")
			.attr("cx", (d) => {
				return x_scale(time_parse(d[0]));
			})
			.attr("cy", (d) => {
				return y_scale(d[1]);
			})
			.attr("r", (d) => {
				return r_scale(d[1]);
			});
	}

	render() {
		const style = {
			template: {
				display: "block",
				marginRight: "auto",
				marginLeft: "auto",
				marginTop: "10%",
				overflow: "visible",
				border: "solid thin RGBA(95,129,229,0.4)"
			}
		};
		return (
			<svg
				className='template'
				style={style.template}
				width={this.WIDTH}
				height={this.HEIGHT}></svg>
		);
	}
}

export default TimeScale;
