import htm from "../../packages/htm.module.js";
const html = htm.bind(React.createElement);
const width = 960; //+svg.attr("width");
const height = 800; //+svg.attr("height");

const centerX = width / 2;
const centerY = height / 2;
const MANY_BODY_STRENGTH = -100;

export const Simulation = ({ nodes, links }) => {
  const d3Container = React.useRef(null);
  React.useEffect(() => {
    const svg = d3.select(d3Container.current);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(MANY_BODY_STRENGTH))
      .force(
        "link",
        d3.forceLink(links).distance((link) => link.distance)
      )
      .force("center", d3.forceCenter(centerX, centerY));

    const dragInteraction = d3.drag().on("drag", (event, node) => {
      console.log("event", event);
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(1);
      simulation.restart();
    });

    const lines = svg
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "gray");

    const circles = svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("fill", (node) => node.color || "steelblue")
      .attr("r", (node) => node.size)
      .call(dragInteraction);

    const texts = svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("pointer-events", "none")
      .text(
        (node) => node.ShortName || (node.size > 5 ? node.MatItemName : null)
      );

    simulation.on("tick", () => {
      circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
      texts.attr("x", (node) => node.x).attr("y", (node) => node.y);
      lines
        .attr("x1", (link) => {
          return link.source.x;
        })
        .attr("y1", (link) => link.source.y)
        .attr("x2", (link) => link.target.x) //
        .attr("y2", (link) => link.target.y); // nodes[link.index].y
    });
  }, [nodes, links, d3Container]);

  return html`<svg
    id="container"
    width=${width}
    height=${height}
    ref=${d3Container}
  ></svg>`;

  // console.log(nodes);
  // console.log(links);
  // return html`Hello`;
};

// export default Simulation;
