import React, { Component } from "react";
import * as D3 from "d3";

class ForceLayout extends Component {
	data = {
		nodes: [
			{ name: "Jack" },
			{ name: "Bob" },
			{ name: "Bill" },
			{ name: "Jan" },
			{ name: "Edward" },
			{ name: "Sara" },
			{ name: "Nikki" },
			{ name: "Ronald" },
			{ name: "Jerry" },
			{ name: "Zac" }
		],
		links: [
			{ source: 0, target: 1 },
			{ source: 0, target: 2 },
			{ source: 0, target: 3 },
			{ source: 0, target: 4 },
			{ source: 1, target: 5 },
			{ source: 2, target: 5 },
			{ source: 2, target: 5 },
			{ source: 3, target: 4 },
			{ source: 5, target: 8 },
			{ source: 5, target: 9 },
			{ source: 6, target: 7 },
			{ source: 7, target: 8 },
			{ source: 8, target: 9 }
		]
	};

	chart_width = 600;
	chart_height = 600;
	constructor() {
		super();
		this.colors = D3.scaleOrdinal(D3.schemeCategory10);
	}

	componentDidMount() {
		// SVG
		const svg = D3.select("#chart")
			.append("svg")
			.attr("width", this.chart_width)
			.attr("height", this.chart_height);

		// Lines AKA Links
		const lines = svg
			.selectAll("line")
			.data(this.data.links)
			.enter()
			.append("line")
			.style("stroke", "#24292e")
			.style("stroke-width", 2);

		// Nodes
		const nodes = svg
			.selectAll("circle")
			.data(this.data.nodes)
			.enter()
			.append("circle")
			.attr("r", 20)
			.style("fill", (d, i) => {
				return this.colors(i);
			});

		// Tooltip
		nodes.append("title").text(function(d) {
			return d.name;
		});

		// start a force simulation
		const force = D3.forceSimulation(this.data.nodes)
			// push and pull surrounding elements
			// strength determine the power force the elements pulled together
			.force("charge", D3.forceManyBody().strength(-200))
			// link elements
			.force("link", D3.forceLink(this.data.links))
			// the coordinate to center elements
			.force(
				"center",
				D3.forceCenter()
					.x(this.chart_width / 2)
					.y(this.chart_height / 2)
            );

		// D3 check the distance along with the time
		// listen the events
		force.on("tick", () => {
			lines
				.attr("x1", (d) => {
					console.log("line", d);
					return d.source.x;
				})
				.attr("y1", (d) => {
					return d.source.y;
				})
				.attr("x2", (d) => {
					return d.target.x;
				})
				.attr("y2", (d) => {
					return d.target.y;
				});

			nodes
				.attr("cx", (d) => {
					console.log("nodes", d);
					return d.x;
				})
				.attr("cy", (d) => {
					return d.y;
				});
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

export default ForceLayout;
