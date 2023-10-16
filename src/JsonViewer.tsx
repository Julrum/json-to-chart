import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const JsonViewer = ({ data }: { data: Object | any[] }) => (
  <JsonView data={data} shouldExpandNode={allExpanded} style={defaultStyles} />
);

export default JsonViewer;
