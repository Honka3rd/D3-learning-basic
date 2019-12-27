import React, { Component } from "react";
import * as D3 from "d3";

class AnimatedScatter extends Component {
	DATA = [
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
		[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
	];
	MAX_LEN = 650;

	componentDidMount() {
		const x_scale = D3.scaleLinear()
			.domain([
				D3.min(this.DATA, (d) => {
					return d[0];
				}),
				D3.max(this.DATA, (d) => {
					return d[0];
				})
			])
			.range([0, this.MAX_LEN]);

		const y_scale = D3.scaleLinear()
			.domain([
				D3.min(this.DATA, (d) => {
					return d[1];
				}),
				D3.max(this.DATA, (d) => {
					return d[1];
				})
			])
			.range([this.MAX_LEN, 0]);

		const svg = D3.select(".template");

		svg
			.append("clipPath")
			.attr("id", "clip-area")
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", this.MAX_LEN)
			.attr("width", this.MAX_LEN);

		svg
			.append("g")
			.attr("id", "plot-area")
			.attr("clip-path", "url(#clip-area)")
			.selectAll("circle")
			.data(this.DATA)
			.enter()
			.append("circle")
			.attr("cx", (d) => {
				return x_scale(d[0]);
			})
			.attr("r", "20px")
			.attr("cy", (d) => {
				return y_scale(d[1]);
			})
			.attr("fill", "RGBA(232,104,31,0.4)");

		const x_axis = D3.axisBottom(x_scale);
		const y_axis = D3.axisRight(y_scale);

		svg
			.append("g")
			.attr("class", "x_axis")
			.attr("transform", `translate(0, ${this.MAX_LEN})`)
			.call(x_axis);

		svg
			.append("g")
			.attr("class", "y_axis")
			.call(y_axis);
	}

	resetSampleData = () => {
		this.DATA = [
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)],
			[Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
		];
	};

	updateGraph = (e) => {
		e.preventDefault();

		const colors = ["RGBA(163,85,89,0.5)", "RGBA(87,237,166,0.5)", "RGBA(182,50,230,0.5)"];

		this.resetSampleData();
		const x_scale = D3.scaleLinear()
			.domain([
				D3.min(this.DATA, (d) => {
					return d[0];
				}),
				D3.max(this.DATA, (d) => {
					return d[0];
				})
			])
			.range([0, this.MAX_LEN]);

		const y_scale = D3.scaleLinear()
			.domain([
				D3.min(this.DATA, (d) => {
					return d[1];
				}),
				D3.max(this.DATA, (d) => {
					return d[1];
				})
			])
			.range([this.MAX_LEN, 0]);

		const x_axis = D3.axisBottom(x_scale);
		const y_axis = D3.axisRight(y_scale);

		const svg = D3.select(".template");
		svg
			.selectAll("circle")
			.data(this.DATA)
			.transition()
			.duration(1000)
			.delay((d, i) => {
				return i * 200;
			})
			.ease(D3.easeElasticInOut)
			.attr("cx", (d) => {
				return x_scale(d[0]);
			})
			.attr("cy", (d) => {
				return y_scale(d[1]);
			})
			.transition()
			.duration(1000)
			.attr("fill", colors[Math.floor(Math.random() * colors.length)]);

		svg
			.select(".x_axis")
			.transition()
			.duration(1000)
			.call(x_axis);

		svg
			.select(".y_axis")
			.transition()
			.duration(1000)
			.call(y_axis);
	};

	render() {
		return (
			<div>
				<svg
					style={{
						overflow: "visible",
						marginLeft: "auto",
						marginRight: "auto",
						display: "block"
					}}
					className='template'
					width={this.MAX_LEN}
					height={this.MAX_LEN}></svg>
                    <hr></hr>
				<button
					style={{ paddingLeft: "auto", paddingRight: "auto" }}
					onClick={this.updateGraph}>
					update
				</button>
			</div>
		);
	}
}

export default AnimatedScatter;
