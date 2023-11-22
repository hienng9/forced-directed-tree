import htm from "../../packages/htm.module.js";
const html = htm.bind(React.createElement);

const Filter = ({ data, setBoatNode }) => {
  // console.log("Filter", data);
  const handleChange = (event) => {
    const selectedBoatNode = data.find((node) => {
      return node.ShortName === event.target.value;
    });
    setBoatNode(selectedBoatNode);
  };
  return html` <h1>Select Boat Name</h1>
    <select onChange=${handleChange}>
      <option>Please choose boat name</option>
      ${data.map((boatNode) => {
        return html`<option key=${boatNode.index}>
          ${boatNode.ShortName}
        </option>`;
      })}
    </select>`;
};

export default Filter;
