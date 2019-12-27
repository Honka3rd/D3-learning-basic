import React, { Component } from "react";
import * as D3 from "d3";
import _ from "lodash";
import $ from "jquery";

class ScaleBand extends Component {
	BORDER_LEN = 500;
	PADDING = 10;
	FONT_SIZE = 20;

	constructor() {
		super();
		this.DATA = [
			D3.randomUniform(1, 5)(),
			D3.randomUniform(1, 5)(),
			D3.randomUniform(1, 5)(),
			D3.randomUniform(1, 5)(),
			D3.randomUniform(1, 5)(),
			D3.randomUniform(1, 5)()
		];
		this.BAR_LEN = this.BORDER_LEN / this.DATA.length;
		this.ascending = true;
	}

	componentDidMount() {
		const svg = D3.select(".template");
		const x_scale = D3.scaleBand()
			.domain(D3.range(this.DATA.length))
			.rangeRound([0, this.BORDER_LEN])
			.paddingInner(0.05)
			.paddingOuter(0.1);

		const y_scale = D3.scaleLinear()
			.domain([_.min(this.DATA), _.max(this.DATA)])
			.rangeRound([0, this.BAR_LEN * this.DATA.length]);

        const self = this;
		svg
			.selectAll("rect")
			.data(this.DATA)
			.enter()
			.append("rect")
			.attr("height", (d) => {
				return y_scale(d);
			})
			.attr("width", x_scale.bandwidth())
			.attr("x", (d, i) => {
				return x_scale(i);
			})
			.attr("y", (d) => {
				return this.BORDER_LEN - y_scale(d);
			})
			.attr("fill", (d) => {
				return `RGB(255,${100 + d * 20},80)`;
			})
			.on("mouseover", function(d) {
				D3.select(this)
					.transition("hover")
                    .attr("fill", `RGBA(182,${50 + d * 40},230,0.54)`);
                self.showTooltip(this, d, x_scale);
			})
			.on("mouseleave", function(d) {
				const color = `RGB(255,${100 + d * 20},80)`;
				D3.select(this)
					.transition("hover")
					.attr("fill", color);

				D3.select("#tooltip").style("display", `none`);
			});

		svg
			.selectAll("text")
			.data(this.DATA)
			.enter()
			.append("text")
			.text((d) => {
				return d.toFixed(1);
			})
			.attr("font-size", `${this.FONT_SIZE}px`)
			.attr("fill", "RGB(184,43,31)")
			.attr("stroke", "RGBA(232,104,31,0.4)")
			.attr("stroke-width", "3px")
			.attr("text-anchor", "middle")
			.style("pointer-event", "none")
			.attr("x", (d, i) => {
				return x_scale(i) + this.BAR_LEN / 2;
			})
			.attr("y", (d) => {
				return this.BORDER_LEN - y_scale(d);
			});
	}

	showTooltip = (rect, d, x_scale) => {
		let rawLeft = $(".template").css("margin-left");
		const marginleft = rawLeft.split("");
		marginleft.pop();
		marginleft.pop();
		const left = +marginleft.join("");

		const x =
			window.parseFloat(D3.select(rect).attr("x")) +
			left +
			x_scale.bandwidth() / 2;

		const y = window.parseFloat(D3.select(rect).attr("y")) + this.BORDER_LEN / 2;

		$("#tooltip")
			.css({
				left: `${x}px`,
				top: `${y}px`,
				display: "block"
			})
			.text(d.toFixed(2));
	};

	updateGraph = () => {
		// domain needs to be changed once data changed
		const y_scale = D3.scaleLinear()
			.domain([_.min(this.DATA), _.max(this.DATA)])
			.range([0, this.BORDER_LEN]);

		const svg = D3.select(".template");

		svg
			.selectAll("rect")
			// reconnect data with DOMS
			// no need waiting room, since DOM has been loaded up
			.data(this.DATA)
			// add default animation
			.transition()
			// control animation delay
			.delay((d, i) => {
				return i * 100;
			})
			// control animation duration
			.duration(1000)
			// .ease(D3.easeElastic)
			.attr("height", (d) => {
				return y_scale(d) < 0 ? 0 : y_scale(d);
			})
			.attr("y", (d) => {
				return this.BORDER_LEN - y_scale(d);
			})
			.attr("fill", (d) => {
				return `RGB(255,${100 + d * 20},80)`;
			});

		svg
			.selectAll("text")
			.data(this.DATA)
			.transition()
			.delay((d, i) => {
				return i * 100;
			})
			.duration(2000)
			.ease(D3.easePolyInOut)
			.text((d) => {
				return d.toFixed(1);
			})
			.attr("y", (d) => {
				return this.BORDER_LEN - y_scale(d);
			});
	};

	updateHandler = (e) => {
		e.preventDefault();
		if (!this.DATA.length) return;
		const len = this.DATA.length;
		this.DATA = [];
		for (let i = 0; i < len; i++) {
			this.DATA.push(D3.randomUniform(1, 5)());
		}
		this.updateGraph();
	};

	onAddingHandler = (e) => {
		e.preventDefault();
		this.DATA.push(D3.randomUniform(1, 5)());
		const y_scale = D3.scaleLinear()
			.domain([_.min(this.DATA), _.max(this.DATA)])
			.range([0, this.BORDER_LEN]);

		const x_scale = D3.scaleBand()
			.domain(D3.range(this.DATA.length))
			.range([0, this.BORDER_LEN])
			.paddingInner(0.05)
			.paddingOuter(0.1);

		const svg = D3.select(".template");

		const bars = svg.selectAll("rect").data(this.DATA);

		bars
			.enter()
			.append("rect")
			.attr("fill", (d) => {
				return `RGB(255,${100 + d * 20},80)`;
			})
			// every preset here will be translated
			.attr("width", x_scale.bandwidth())
			// set initial attributes for the newly appended rect
			.attr("height", 0)
			.attr("x", (d, i) => {
				return x_scale(i);
			})
			.attr("y", (d) => {
				return this.BORDER_LEN;
			})
			.on("mouseover", function(d) {
				D3.select(this).attr("fill", `RGBA(182,${50 + d * 40},230,0.54)`);
			})
			.on("mouseleave", function(d) {
				const color = `RGB(255,${100 + d * 20},80)`;
				D3.select(this).attr("fill", color);
			})
			.merge(bars)
			.transition()
			.duration(500)
			// translate all rects together
			// only newly appended rect seems changed
			// because old rects bound data not be changed
			.attr("x", (d, i) => {
				return x_scale(i);
			})
			.attr("height", (d) => {
				return y_scale(d);
			})
			.attr("width", x_scale.bandwidth())
			.attr("y", (d) => {
				return this.BORDER_LEN - y_scale(d);
			});

		this.FONT_SIZE = this.BORDER_LEN / this.DATA.length / 4;

		const texts = svg.selectAll("text").data(this.DATA);
		/* the part of data not bound to DOM will enter waiting room */

		texts
			// enter the waiting room, then bind this data with appended DOM
			.enter()
			.append("text")
			.text((d) => {
				return d.toFixed(1);
			})
			.attr("fill", "RGB(184,43,31)")
			.attr("stroke", "RGBA(232,104,31,0.4)")
			.attr("text-anchor", "middle")
			.style("pointer-event", "none")
			// not wish x_axis move, so init with final result previously
			.attr("x", (d, i) => {
				return x_scale(i) + this.BORDER_LEN / this.DATA.length / 2;
			})
			.attr("y", this.BORDER_LEN)
			.merge(texts)
			.transition()
			.duration(500)
			.attr("x", (d, i) => {
				return x_scale(i) + this.BORDER_LEN / this.DATA.length / 2;
			})
			.attr("stroke-width", `${this.FONT_SIZE * 0.2}px`)
			.attr("font-size", `${this.FONT_SIZE}px`)
			.attr("y", (d) => {
				return this.BORDER_LEN - y_scale(d);
			});
	};

	onRemoveHandler = (e) => {
		e.preventDefault();

		if (!this.DATA.length) return;

		this.DATA.shift();

		const x_scale = D3.scaleBand()
			.domain(D3.range(this.DATA.length))
			.range([0, this.BORDER_LEN])
			.paddingOuter(0.1)
			.paddingInner(0.05);

		const svg = D3.select(".template");

		svg
			.selectAll("rect")
			// only select the DOMs bound with data
			.data(this.DATA)
			.attr("width", x_scale.bandwidth())
			.attr("x", (d, i) => {
				return x_scale(i);
			});

		// remove
		// exit: allow loop though the DOMs which are not bound to data
		svg
			.selectAll("rect")
			.data(this.DATA)
			.exit()
			.transition()
			.attr("x", this.BORDER_LEN)
			.attr("width", 0)
			.remove();

		svg
			.selectAll("text")
			.data(this.DATA)
			.attr("x", (d, i) => {
				return x_scale(i) + x_scale.bandwidth() / 2;
			})
			.attr("font-size", this.BORDER_LEN / this.DATA.length / 4)
			.attr(
				"stroke-width",
				`${(this.BORDER_LEN / this.DATA.length / 4) * 0.2}px`
			);

		svg
			.selectAll("text")
			.data(this.DATA)
			.exit()
			.transition()
			// define animation targets
			.attr("x", this.BORDER_LEN)
			.attr("font-size", 0)
			.attr("stroke-width", 0)
			.remove();
	};

	onSortHandler = (e) => {
		e.preventDefault();
		this.ascending = !this.ascending;
		const x_scale = D3.scaleBand()
			.domain(D3.range(this.DATA.length))
			.range([0, this.BORDER_LEN])
			.paddingInner(0.05)
			.paddingOuter(0.1);

		/*  const y_scale = D3.scaleLinear()
            .domain([_.min(this.DATA),_.max(this.DATA)])
            .range([0, this.BORDER_LEN]) */

		const svg = D3.select(".template").data(this.DATA);
		svg
			.selectAll("rect")
			.sort((a, b) => {
				return this.ascending ? D3.ascending(a, b) : D3.descending(a, b);
			})
			.transition("sort")
			.duration(1000)
			.attr("x", (d, i) => {
				return x_scale(i);
			});
		svg
			.selectAll("text")
			.sort((a, b) => {
				return this.ascending ? D3.ascending(a, b) : D3.descending(a, b);
			})
			.transition("sort")
			.duration(1000)
			.attr("x", (d, i) => {
				return x_scale(i) + x_scale.bandwidth() / 2;
			});
	};

	render() {
		const style = {
			template: {
				display: "block",
				marginRight: "auto",
				marginLeft: "auto",
				marginTop: "10%",
				overflow: "visible",
				border: "solid thin RGBA(95,129,229,0.4)"
			},
			tooltips: {
				position: "absolute",
				backgroundColor: "white",
				borderRadius: "10%",
				border: "1px solid #000",
				display: "none",
				fontWeight: "bold",
				pointerEvent: "none"
			}
		};
		return (
			<div>
				<svg
					className='template'
					style={style.template}
					width={this.BORDER_LEN}
					height={this.BORDER_LEN}></svg>
				<div id='tooltip' style={style.tooltips}></div>
				<hr></hr>
				<button
					onClick={this.updateHandler}
					style={{ marginRight: "auto", marginLeft: "auto", display: "block" }}>
					update
				</button>
				<hr></hr>
				<button
					onClick={this.onAddingHandler}
					style={{ marginRight: "auto", marginLeft: "auto", display: "block" }}>
					add
				</button>
				<hr></hr>
				<button
					onClick={this.onRemoveHandler}
					style={{ marginRight: "auto", marginLeft: "auto", display: "block" }}>
					remove
				</button>
				<hr></hr>
				<button
					onClick={this.onSortHandler}
					style={{ marginRight: "auto", marginLeft: "auto", display: "block" }}>
					sort
				</button>
				<hr></hr>
			</div>
		);
	}
}
export default ScaleBand;
