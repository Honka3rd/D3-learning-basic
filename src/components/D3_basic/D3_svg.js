import React, { Component } from "react";
import * as D3 from "d3";

class SVG_D3 extends Component {
	DATA = [1, 2, 3, 4, 5];
	BORDER_LEN = 500;
	BAR_LEN = this.BORDER_LEN / this.DATA.length;
	PADDING = 10;

	componentDidMount() {
		const svg = D3.select(".template");

		svg
			.selectAll("rect")
			.data(this.DATA)
			.enter()
			.append("rect")
			.attr("height", (d) => {
				return `${d * this.BAR_LEN}`;
			})
			.attr("width", `${this.BAR_LEN - this.PADDING}`)
			.attr("x", (d) => {
				return `${d * this.BAR_LEN - this.BAR_LEN}`;
			})
			.attr("y", (d) => {
				return this.BORDER_LEN - d * this.BAR_LEN;
			})
			.attr("fill", (d) => {
				return `RGB(255,${100 + d * 20},80)`;
			});

		svg
			.selectAll("text")
			.data(this.DATA)
			.enter()
			.append("text")
			.text((d) => {
				return d;
            })
            .attr("font-size", "50px")
            .attr("fill", "RGB(184,43,31)")
            .attr("stroke", "RGBA(232,104,31,0.4)")
            .attr("stroke-width", "3px")
			.attr("x", (d, i) => {
				return `${this.BAR_LEN * i + this.BAR_LEN / 2 - this.PADDING}`;
			})
			.attr("y", (d) => {
				return this.BORDER_LEN - d * this.BAR_LEN;
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
				width={this.BORDER_LEN}
				height={this.BORDER_LEN}></svg>
		);
	}
}
export default SVG_D3;
