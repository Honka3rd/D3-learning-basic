import React, { Component } from "react";

class Text extends Component {
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
				<text
					x={100}
					y={100}
                    fill={`RGB(255,101,80)`}
                    fontSize={50}
					stroke={`RGB(65,140,189)`}>
					SVG Text
					<tspan x={150} y={150}>
						你好，世界
					</tspan>
				</text>
			</svg>
		);
	}
}

export default Text;
