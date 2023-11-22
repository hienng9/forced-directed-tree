const linksPath = "../src/data/links.json";

export const useLinksData = (boatIndex) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    d3.json(linksPath).then((links) => {
      const initialSelectedLinks = links.filter(
        (link) => link.source === boatIndex
      );
      const targetedLinks = initialSelectedLinks.map((link) => link.target);
      const relatedLinks = links.filter((link) =>
        targetedLinks.includes(link.target)
      );
      setData(relatedLinks);
    });
  }, [boatIndex]);
  return data;
};
