import React, { Component } from "react";
import * as D3 from "d3";

class Scale extends Component {
	DATA = [
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()],
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()],
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()],
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()],
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()],
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()],
		[D3.randomUniform(1, 10)(), D3.randomUniform(1, 10)()]
	];

	HEIGHT = 600;
	WIDTH = 800;
	PADDING = 50;

	componentDidMount() {
		const svg = D3.select(".template");

		const x_scale = D3.scaleLinear()
			.domain([
				0,
				D3.max(this.DATA, (d) => {
					return d[0];
				})
			])
			.range([this.PADDING, this.WIDTH - this.PADDING]);

		const y_scale = D3.scaleLinear()
			.domain([
				0,
				D3.max(this.DATA, (d) => {
					return d[1];
				})
			])
			.range([this.HEIGHT - this.PADDING, this.PADDING]);

		const r_scale = D3.scaleSqrt()
			.domain([
				0,
				D3.max(this.DATA, (d) => {
					return d[1];
				})
			])
			.range([0, (this.HEIGHT - this.PADDING)/10]);

		svg
			.selectAll("circle")
			.data(this.DATA)
			.enter()
			.append("circle")
			.attr("fill", "RGB(95,129,229)")
			.attr("cx", (d) => {
				return x_scale(d[0]);
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

export default Scale;
