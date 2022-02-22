import { createContext } from "react";

const SimpleContext = createContext({
    state: {},
    handleDeleteJens: () => {},
    handleNameChange: () => {},
    handleJensJadid: () => {},
    setJens: () => {}
});

export default SimpleContext;
