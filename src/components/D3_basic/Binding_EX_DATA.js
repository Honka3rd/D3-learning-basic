import React, { Component } from "react";
import * as D3 from "d3";

class Binding_EX_DATA extends Component {
	componentDidMount() {
        D3.json("./data/external_data.json").then((val)=>{
            D3.select(".template")
            .selectAll("p")
            .data(val)
            .enter()
            .append("p")
            .text((d)=>{
                return `${Object.keys(d)} : ${d[Object.keys(d)]}`;
            })
        })
        
	}

	render() {
		return <div className={`template`}></div>;
	}
}

export default Binding_EX_DATA;
