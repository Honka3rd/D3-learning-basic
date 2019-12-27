import React, { Component } from "react";

class SVG_T_PATH extends Component {
	TEXT = "你好......世界";
	MAX_LENGTH = 200;
	FONT_SIZE = (this.MAX_LENGTH) / this.TEXT.length;

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
					<path
						id={`quadratic_path`}
						d={`M0,0 Q${this.MAX_LENGTH / 2},100 ${this.MAX_LENGTH},0`}></path>
				</defs>
				<text
					x={0}
					y={0}
					fill={`RGB(255,101,80)`}
					fontSize={this.FONT_SIZE}
					stroke={`RGB(65,140,189)`}>
					<textPath xlinkHref={`#quadratic_path`}>{this.TEXT}</textPath>
				</text>
			</svg>
		);
	}
}

export default SVG_T_PATH;
