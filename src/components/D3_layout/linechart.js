import React, { Component } from "react";
import * as D3 from "d3";

class LineChart extends Component {
	constructor() {
		super();
		this.data = [
			{ date: 1988, num: 51 },
			{ date: 1989, num: 60 },
			{ date: 1990, num: 62 },
			{ date: 1991, num: -64 },
			{ date: 1992, num: 69 },
			{ date: 1993, num: 69 },
			{ date: 1994, num: 75 },
			{ date: 1995, num: 80 },
			{ date: 1996, num: 91 },
			{ date: 1997, num: 93 },
			{ date: 1998, num: 97 },
			{ date: 1999, num: 100 },
			{ date: 2000, num: -103 },
			{ date: 2001, num: 104 },
			{ date: 2002, num: 105 },
			{ date: 2003, num: 110 },
			{ date: 2004, num: 111 },
			{ date: 2005, num: 112 },
			{ date: 2006, num: 112 },
			{ date: 2007, num: 113 },
			{ date: 2008, num: 119 },
			{ date: 2009, num: 128 },
			{ date: 2010, num: 139 },
			{ date: 2011, num: -139 },
			{ date: 2012, num: 139 },
			{ date: 2013, num: 140 },
			{ date: 2014, num: 143 },
			{ date: 2015, num: 146 },
			{ date: 2016, num: 147 },
			{ date: 2017, num: 149 }
		];

		this.time_parse = D3.timeParse("%Y");
		this.time_format = D3.timeFormat("%Y");
		this.chart_width = 1000;
		this.chart_height = 800;
		this.padding = 50;

		// Format Date
		this.data.forEach((e, i) => {
			this.data[i].date = this.time_parse(e.date);
		});
	}

	componentDidMount() {
		const x_scale = D3.scaleTime()
			.domain([
				D3.min(this.data, function(d) {
					return d.date;
				}),
				D3.max(this.data, function(d) {
					return d.date;
				})
			])
			.range([this.padding, this.chart_width - this.padding]);

		const y_scale = D3.scaleLinear()
			.domain([
				0,
				D3.max(this.data, function(d) {
					return d.num;
				})
			])
			.range([this.chart_height - this.padding, this.padding]);

		// Create SVG
		const svg = D3.select("#chart")
			.append("svg")
			.attr("width", this.chart_width)
			.attr("height", this.chart_height);

		// Create Axes
		const x_axis = D3.axisBottom(x_scale)
			.ticks(10)
			.tickFormat(this.time_format);
		const y_axis = D3.axisLeft(y_scale).ticks(12);
		svg
			.append("g")
			.attr(
				"transform",
				"translate(0," + (this.chart_height - this.padding) + ")"
			)
			.call(x_axis);
		svg
			.append("g")
			.attr("transform", "translate(" + this.padding + ",0)")
			.call(y_axis);

		const line = D3.line()
			// determine what kind of data can not be used
			// if return true, use the data to draw a line
			.defined((d) => {
				return d.num >= 0 && d.num < 100;
			})
			// setup x and y coordinate for the returned line function
			.x((d) => {
				return x_scale(d.date);
			})
			.y((d) => {
				return y_scale(d.num);
			});

		const red_area = D3.area()
			.defined((d) => {
				return d.num >= 100;
			})
			.x((d) => {
				return x_scale(d.date);
            })
            .y0(()=>{
                return y_scale.range()[0];
            })
			.y1((d) => {
				return y_scale(d.num);
			});

		svg
			.append("path")
			// only have a single line element, all data need to bind with it at once
			.datum(this.data)
			// attribute d: pass a function rather than a static value
			// i.e. set a dynamic command string as d attribute for the Path element
			.attr("d", line)
			.attr("fill", "none")
			.attr("stroke", "RGB(182,135,230)")
			.attr("stroke-width", "5px");

		svg
			.append("path")
			// only have a single line element, all data need to bind with it at once
			.datum(this.data)
			// attribute d: pass a function rather than a static value
			// i.e. set a dynamic command string as d attribute for the Path element
			.attr("d", red_area)
			.attr("fill", "RGB(241,52,161)")			
	}

	render() {
		const style = {
			chart: {
				width: "1000px",
				height: "800px",
				backgroundColor: "#f7f7f7",
				margin: "25px auto"
			}
		};
		return <div id='chart' style={style.chart}></div>;
	}
}
export default LineChart;
