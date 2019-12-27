import React, { Component } from "react";

class REUSE extends Component {
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
			<svg width={500} height={500} style={style.svg}>
				{/* everything defined inside defs will not be displayed */}
				<defs>
					<rect height={100} width={100} x={0} y={0} id={`rect_comp`}></rect>
					<g id={`group_comp`}>
						<circle
							cx={0}
							cy={0}
							r={50}
							fill={`RGB(65,140,189)`}
							strokeWidth={5}
							stroke={`RGB(255,68,132)`}></circle>
						<circle
							cx={50}
							cy={0}
							r={50}
							fill={`RGB(65,140,189)`}
							strokeWidth={5}
							stroke={`RGB(187,68,132)`}></circle>
						<circle
							cx={0}
							cy={50}
							r={50}
							fill={`RGB(65,140,189)`}
							strokeWidth={5}
							stroke={`RGB(138,68,132)`}></circle>
					</g>
				</defs>
				{/* to display them in browser, use <use/> tag */}
				<use xlinkHref={`#rect_comp`} x={0} y={0}></use>
				<use
					xlinkHref={`#rect_comp`}
					x={100}
					y={100}
					fill={`RGB(167,26,80)`}></use>
				<use
					xlinkHref={`#rect_comp`}
					x={200}
					y={200}
					fill={`RGB(167,26,189)`}></use>
				<use xlinkHref={`#group_comp`} x={400} y={200}></use>
				<use xlinkHref={`#group_comp`} x={400} y={250}></use>
				<use xlinkHref={`#group_comp`} x={400} y={300}></use>
			</svg>
		);
	}
}

export default REUSE;
