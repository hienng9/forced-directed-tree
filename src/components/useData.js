export const useData = (path) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    d3.json(path).then((data) => setData(data));
  }, []);

  return data;
};
