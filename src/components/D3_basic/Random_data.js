import React, { Component } from "react";
import * as D3 from "d3";

class RandomData extends Component {
	INTERVAL = 1000;

	constructor() {
        super();
        this.state = {
            data: [...this.randomUniformGen()]
        };
	}

	randomUniformGen = () => {
		return [
			D3.randomUniform(1, 10)(),
			D3.randomUniform(1, 10)(),
			D3.randomUniform(1, 10)(),
			D3.randomUniform(1, 10)(),
			D3.randomUniform(1, 10)()
		];
	};

	componentDidMount() {
        this.setState({ data: [...this.randomUniformGen()] });
		this.loop = window.setInterval(() => {
			this.setState({ data: [...this.randomUniformGen()] });
		}, this.INTERVAL);
    }
    
    componentWillUnmount() {
        window.clearInterval(this.loop);
    }

	componentDidUpdate() {
        D3.select(".template")
        .selectAll("div")
        .remove();
        
		D3.select(".template")
			.selectAll("div")
			.data(this.state.data)
			.enter()
			.append("div")
			.style("display", "inline-block")
			.style("height", (d) => {
				return `${d * 50}px`;
			})
			.style("background-color", (d) => {
				return `RGB(255,${100 + d * 20},80)`;
			})
			.style("width", "50px")
			.style("margin-left", "5px")
            .style("margin-right", "5px");
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
		return <div style={style.template} className='template'></div>;
	}
}

export default RandomData;
