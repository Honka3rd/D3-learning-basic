import React, { Component } from "react";

class SVG extends Component {
	render() {
		// overflow visible: when a inside element contains part outside its parent, the outside part is still visiable
		const style = {
			svg: {
				display: "block",
				marginRight: "auto",
				marginLeft: "auto",
				marginTop: "10%",
				overflow: "visible"
			}
		};

		// background-color css property will be ignored
		return (
			<svg width={500} height={500} style={style.svg}>
				<rect
					width={100}
					height={100}
					fill='RGBA(255,105,166,0.74)'
					stroke='RGBA(255,101,80,0.4)'
					strokeWidth={200}
					x={50}
					y={50}></rect>
				<ellipse
					rx={100}
					ry={50}
					cx={150}
					cy={150}
					fill='RGBA(107,142,125,0.79)'></ellipse>
				<circle
					r={100}
					cx={300}
					cy={300}
					fill='RGBA(151,154,228,0.79)'
					stroke='RGBA(198,74,228,0.79)'
					strokeWidth={10}></circle>
				<line
					x1={350}
					y1={350}
					x2={400}
					y2={450}
					stroke='RGBA(107,184,125,0.79)'
					strokeWidth={10}></line>
			</svg>
		);
	}
}

export default SVG;
