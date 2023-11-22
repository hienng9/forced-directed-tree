import htm from "../packages/htm.module.js";
const html = htm.bind(React.createElement);
import App from "./App.js";

const rootElement = document.getElementById("root");
ReactDOM.render(html`<${App} />`, rootElement); //

// import { nodes, links, MANY_BODY_STRENGTH } from "./data.js";
// const svg = d3.select("#container");

// const width = +svg.attr("width");
// const height = +svg.attr("height");
// const centerX = width / 2;
// const centerY = height / 2;

// const simulation = d3
//   .forceSimulation(nodes)
//   .force("charge", d3.forceManyBody().strength(MANY_BODY_STRENGTH))
//   .force(
//     "link",
//     d3.forceLink(links).distance((link) => link.distance)
//   )
//   .force("center", d3.forceCenter(centerX, centerY));

// const dragInteraction = d3.drag().on("drag", (event, node) => {
//   node.fx = event.x;
//   node.fy = event.y;
//   simulation.alpha(1);
//   simulation.restart();
// });
// const lines = svg
//   .selectAll("line")
//   .data(links)
//   .enter()
//   .append("line")
//   .attr("stroke", "gray");

// const circles = svg
//   .selectAll("circle")
//   .data(nodes)
//   .enter()
//   .append("circle")
//   .attr("fill", (node) => node.color || "steelblue")
//   .attr("r", (node) => node.size)
//   .call(dragInteraction);

// const texts = svg
//   .selectAll("text")
//   .data(nodes)
//   .enter()
//   .append("text")
//   .attr("text-anchor", "middle")
//   .attr("alignment-baseline", "middle")
//   .style("pointer-events", "none")
//   .text((node) => node.ItemName);

// simulation.on("tick", () => {
//   circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
//   texts.attr("x", (node) => node.x).attr("y", (node) => node.y);
//   lines
//     .attr("x1", (link) => link.source.x)
//     .attr("y1", (link) => link.source.y)
//     .attr("x2", (link) => link.target.x) //
//     .attr("y2", (link) => link.target.y); // nodes[link.index].y
// });
