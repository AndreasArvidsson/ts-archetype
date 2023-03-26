import { StrictMode } from "react";
import guitar from "./guitar.png";

export const App = () => {
    return (
        <StrictMode>
            <h1>Hello world</h1>
            <img src={guitar} />
        </StrictMode>
    );
};
