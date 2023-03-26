import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

console.log("index.tsx");

const rootNode = document.getElementById("root") as HTMLElement;
const root = createRoot(rootNode);

root.render(App());
