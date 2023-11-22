import { randomColors } from "../colors.js";
import { Simulation } from "./Simulation.js";
import htm from "../../packages/htm.module.js";
const html = htm.bind(React.createElement);

const MAIN_NODE_SIZE = 20;
const DEFAULT_DISTANCE = 100;
const linksPath = "../src/data/links.json";
const Graph = ({ boatNodes, allMatNodes, selectedBoatNode }) => {
  const [selectedLinks, setSelectedLinks] = React.useState(null);
  const [nodes, setNodes] = React.useState(null);
  const [links, setLinks] = React.useState(null);

  React.useEffect(() => {
    if (selectedBoatNode) {
      d3.json(linksPath).then((links) => {
        const initialSelectedLinks = links.filter(
          (link) => link.source === selectedBoatNode.orderNumber
        );
        const targetedLinks = initialSelectedLinks.map((link) => link.target);
        const relatedLinks = links.filter((link) =>
          targetedLinks.includes(link.target)
        );
        setSelectedLinks(relatedLinks);
      });
    }
  }, [selectedBoatNode]);

  React.useEffect(() => {
    if (selectedLinks && allMatNodes) {
      // Create nodes
      const selectedSourceNodes = [
        ...new Set(selectedLinks.map((link) => link.source)),
      ];

      const filteredBoatNodes = boatNodes.filter((boatNode) =>
        selectedSourceNodes.includes(boatNode.orderNumber)
      );

      const parentNodes = filteredBoatNodes.map((node, orderNumber) => {
        return {
          ...node,
          size: MAIN_NODE_SIZE,
          color: randomColors[orderNumber],
        };
      });
      // Create Mat Nodes
      const selectedTargets = [
        ...new Set(selectedLinks.map((link) => link.target)),
      ];
      const filterMatNodes = allMatNodes.filter((matNode) =>
        selectedTargets.includes(matNode.orderNumber)
      );
      const allNodes = parentNodes.concat(filterMatNodes);
      setNodes(allNodes);
    }
  }, [selectedLinks, allMatNodes]);

  React.useEffect(() => {
    if (nodes) {
      const fullLinks = selectedLinks.map((link) => {
        const source = nodes.find((node) => node.orderNumber === link.source);
        const target = nodes.find((node) => node.orderNumber === link.target);
        const distance = DEFAULT_DISTANCE;
        return { source, target, distance };
      });
      setLinks(fullLinks);
    }
  }, [nodes]);

  return html` ${nodes == null || links == null
    ? null
    : html`<${Simulation} nodes=${nodes} links=${links} /> >`}`;
};

export default Graph;
