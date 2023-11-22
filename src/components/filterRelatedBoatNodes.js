export const filterRelatedBoatNodes = ({ boatNodes, selectedLinks }) => {
  if (selectedLinks) {
    const selectedSourceNodes = [
      ...new Set(selectedLinks.map((link) => link.source)),
    ];

    const nodes = boatNodes.filter((boatNode) =>
      selectedSourceNodes.includes(boatNode.orderNumber)
    );
    return nodes;
  } else return [];
};
