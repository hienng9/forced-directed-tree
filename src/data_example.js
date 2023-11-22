export const nodes = [];
export const links = [];
import { colors } from "./colors.js";

export const MANY_BODY_STRENGTH = -10;
const MAIN_NODE_SIZE = 40;
const CHILD_NODE_SIZE = 15;
const GRAND_CHILD_NODE_SIZE = 5;
const DEFAULT_DISTANCE = 30;
const MAIN_NODE_DISTANCE = 200;
const LEAF_NODE_DISTANCE = 50;

const initialChildNodes = [
  { id: "Community Vision" },
  { id: "Silicon Valey Creates" },
];

const socialImpactChildNodes = [
  { id: "Theatre Bay" },
  { id: "East Arts" },
  { id: "Local Color" },
];

const communityArtsChildNodes = [
  { id: "Counter Pulse" },
  { id: "Luggage Store Galery" },
  { id: "Performing Art WorkShop" },
  { id: "447 Minna St", childSize: 5 },
  { id: "Keeping Space Okland" },
];
const ambitiosChildNodes = [
  { id: "Counter Pulse" },
  { id: "SELC" },
  { id: "Common Future", childSize: 0 },
  { id: "Freelancer Union", childSize: 0 },
  { id: "Runway Project", childSize: 0 },
  { id: "US Feb of Workers", childSize: 0 },
];
const initialMainNodes = [
  { id: "Arts Web", childNodes: initialChildNodes },
  { id: "Social Impact Commons", childNodes: socialImpactChildNodes },
  {
    id: "Community Arts Stabilization Trust",
    childNodes: communityArtsChildNodes,
  },
  {
    id: "Ambitious US",
    childNodes: ambitiosChildNodes,
  },
];

const initialGrandChildNode = (size = 20, appendText) =>
  Array.from({ length: size }, (_, value) => value).reduce(
    (acc, num) => acc.concat({ id: num }),
    []
  );

const addMainNode = (node, colorIndex) => {
  node.size = MAIN_NODE_SIZE;
  node.color = colors[colorIndex][1];
  nodes.push(node);
  return node;
};

const addChildNode = (parentNode, childNode, nodesize, distance) => {
  childNode.size = nodesize;
  childNode.color = parentNode.color;
  nodes.push(childNode);
  const link = {
    source: parentNode,
    target: childNode,
    distance: distance,
    color: parentNode.color,
  };
  links.push(link);
  return childNode;
};

const create_graph = (node, colorIndex) => {
  const parentNode = addMainNode(node, colorIndex);
  node.childNodes.map((childNode) => {
    const returnedChildNode = addChildNode(
      parentNode,
      childNode,
      CHILD_NODE_SIZE,
      DEFAULT_DISTANCE
    );
    initialGrandChildNode(childNode.childSize, returnedChildNode.id).map(
      (grandChildNode) =>
        addChildNode(
          returnedChildNode,
          grandChildNode,
          GRAND_CHILD_NODE_SIZE,
          LEAF_NODE_DISTANCE
        )
    );
  });
};

initialMainNodes.map((node, index) => {
  create_graph(node, index);
});

initialMainNodes.flatMap((source) =>
  initialMainNodes.reduce((_, target) => {
    // console.log("source", source, "target", target);
    // console.log("acc", acc);
    if (source !== target) {
      const link = {
        source,
        target,
        distance: MAIN_NODE_DISTANCE,
        color: source.color,
      };
      links.push(link);
      // acc.concat();
    }
    // return acc;
  }, [])
);

// console.log("nodes", nodes);
// console.log("links", links);
