import React, { Component } from "react";
import Jens from "./Jens";
import SimpleContext from "../../context/SimpleContext";

class Ajnas extends Component {
    shouldComponentUpdate(nextProp, nextState) {
        console.log("Ajnas.jsx shouldComponentUpdate");
        return true;
    }

    render() {
        console.log("Ajnas.jsx rendered.");
        return (
            <SimpleContext.Consumer>
                {context => (
                    <div>
                        {context.state.ajnas.map(jens => (
                            <Jens
                                key={jens.id}
                                fullname={jens.fullname}
                                deleted={() =>
                                    context.handleDeleteJens(jens.id)
                                }
                                changed={event =>
                                    context.handleNameChange(event, jens.id)
                                }
                            />
                        ))}
                    </div>
                )}
            </SimpleContext.Consumer>
        );
    }
}

export default Ajnas;
