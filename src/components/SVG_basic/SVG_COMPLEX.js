import React, { Component } from "react";

class SVG_COMPLEX extends Component {
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
				{/* automatically close */}
				<polygon
					points={`${10},${10} ${200},${200} ${10},${200} ${100},${50} ${150},${400}`}
					fill='RGBA(107,86,125,0.66)'
					stroke='RGBA(168,11,125,0.66)'></polygon>

                {/*  manually close */}
				<polyline
					points={`${110},${110} ${300},${300} ${110},${300} ${200},${150} ${250},${500}`}
					fill='RGBA(107,86,125,0.66)'
					stroke='RGBA(168,11,125,0.66)'></polyline>
                
                {/* Z: closepath */}
                {/* d: data */}
                {/* M: moveTo (relative to (0,0))*/}
                {/* L: lineTo (relative to (0,0)) */}
                {/* Q: quadratic (relative to (0,0))*/}
				<path
					strokeWidth={5}
					stroke='RGBA(96,89,125,0.83)'
					d={`
                    M${300},${300} 
                    L${350},${350} 
                    L${325},${400} 
                    L${450},${500}
                    Q${375},${475} ${250} ${250}
                    Z`}>
                </path>

                {/* m: moveTo (relative to previous coordinate)*/}
                {/* l: lineTo (relative to previous coordinate) */}
                {/* q: quadratic (relative to previous coordinate)*/}
                <path
					strokeWidth={5}
					stroke='RGBA(96,89,125,0.83)'
					d={`
                    m${300},${300} 
                    l${350},${350} 
                    l${325},${400} 
                    l${450},${500}
                    l${375},${475} ${250} ${250}
                    Z`}>
                </path>
			</svg>
		);
	}
}

export default SVG_COMPLEX;
