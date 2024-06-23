import { StrictMode } from "react";
import guitar from "./guitar.png";

export default function App() {
    return (
        <StrictMode>
            <h1>Hello world</h1>
            <img src={guitar} />
        </StrictMode>
    );
}
