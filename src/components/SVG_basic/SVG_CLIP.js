import React, { Component } from "react";

class SVG_CLIP_PATH extends Component {
	render() {
		const style = {
			svg: {
				display: "block",
				marginRight: "auto",
				marginLeft: "auto",
				marginTop: "10%",
				overflow: "visible"
			}
		};
		return (
			<svg style={style.svg} width={500} height={500}>
				<defs>
					<clipPath id={`svg_clip`}>
						<rect x={200} y={200} width={150} height={150}></rect>
						<ellipse cx={150} cy={150} rx={100} ry={50}></ellipse>
					</clipPath>
				</defs>
				<circle
					cx={200}
					cy={200}
					r={100}
					fill={`RGBA(138,68,229,0.4)`}
					stroke={`RGB(138,68,229)`}
					strokeWidth={5}
					clipPath={`url(#svg_clip)`}></circle>
			</svg>
		);
	}
}

export default SVG_CLIP_PATH;
