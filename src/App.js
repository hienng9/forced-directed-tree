import Filter from "./components/Filter.js";
import Graph from "./components/Graph.js";
import htm from "../packages/htm.module.js";
import { useData } from "./components/useData.js";
const html = htm.bind(React.createElement);

const boatNodesPath = "./src/data/boat_nodes.json";
const allMatNodesPath = "./src/data/mat_nodes.json";

const App = () => {
  const allMatNodes = useData(allMatNodesPath);
  const boatNodes = useData(boatNodesPath);
  const [selectedBoatNode, setSelectedBoatNode] = React.useState(null);

  return html` ${boatNodes === null || allMatNodes === null
    ? null
    : html`
        <div>
          <${Filter} data=${boatNodes} setBoatNode=${setSelectedBoatNode} />
        </div>
        <div>
          ${selectedBoatNode === null
            ? null
            : html`
                <${Graph}
                  boatNodes=${boatNodes}
                  allMatNodes=${allMatNodes}
                  selectedBoatNode=${selectedBoatNode}
                />
              `}
        </div>
      `}`;
};

export default App;
