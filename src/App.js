import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import Ajnas from "./components/Jens/Ajnas";
import Header from "./components/common/Header";
import SimpleContext from "./context/SimpleContext";
import JensJadid from "./components/Jens/JensJadid";
import Jens from "./components/Jens/Jens";

class App extends React.Component {
    //Lifecycle Hooks

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         totall: 0
    //     }:
    // }:

    state = {
        ajnas: [],
        jens: "",
        showAjnas: true,
        // showHeader: true,
        appTitle: "امور مالی اجناس"
    };

    static getDerivedStateFromProps(props, state) {
        console.log("App.js getDerivedStateFromProps");
        return state;
    }

    componentDidMount() {
        console.log("App.js componentDidMount");
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("Ajnas.jsx getSnapshotBeforeUpdate");
        const snapshot = { prevProps, prevState };
        return snapshot;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("App.js componentDidUpdate");
        console.log(snapshot);
    }

    static contextType = SimpleContext;
    //this.context

    handleShowJens = () => {
        this.setState({ showAjnas: !this.state.showAjnas });
    };

    handleShowHeader = () => {
        this.setState({ showHeader: !this.state.showHeader });
    };

    handleDeleteJens = id => {
        const ajnas = [...this.state.ajnas];
        const filteredAjnas = ajnas.filter(p => p.id !== id); //! = =
        this.setState({ ajnas: filteredAjnas });

        const jensIndex = ajnas.findIndex(p => p.id === id);
        const jens = ajnas[jensIndex];

        toast.error(`${jens.fullname} با موفقیت حذف شد`, {
            position: "top-right",
            closeOnClick: true
        });
    };

    handleNameChange = (event, id) => {
        const { ajnas: allAjnas } = this.state;

        const jensIndex = allAjnas.findIndex(p => p.id === id);
        const jens = allAjnas[jensIndex];
        jens.fullname = event.target.value;
        console.log(event);

        const ajnas = [...allAjnas];

        ajnas[jensIndex] = jens;
        this.setState({ ajnas });
    };

    handleJensJadid = () => {
        const ajnas = [...this.state.ajnas];
        const jens = {
            id: Math.floor(Math.random() * 1000),
            fullname: this.state.jens
        };

        if (jens.fullname !== "" && jens.fullname !== " ") {
            ajnas.push(jens);
            this.setState({ ajnas, jens: "" });

            toast.success("جنس با موفقیت اضافه شد.", {
                position: "bottom-right",
                closeButton: true,
                closeOnClick: true
            });
        }
    };

    setJens = event => {
        this.setState({ jens: event.target.value });
    };

    render() {
        console.log("App.js render()");

        const { ajnas, showAjnas, showHeader } = this.state;

        let jens = null;
        let header = null;

        if (showAjnas) {
            jens = (
                <Ajnas
                // Ajnas={ajnas}
                // jensDelete={this.handleDeleteJens}
                // jensChange={this.handleNameChange}
                />
            );
        }

        if (showHeader) {
            header = <Header />;
        }

        return (
            <SimpleContext.Provider
                value={{
                    state: this.state,
                    handleDeleteJens: this.handleDeleteJens,
                    handleNameChange: this.handleNameChange,
                    handleJensJadid: this.handleJensJadid,
                    setJens: this.setJens
                }}
            >
                <div className="rtl text-center">
                    {header}
                    <Button onClick={this.handleShowHeader} variant="primary">
                        نمایش هدر
                    </Button>

                    <JensJadid />

                    <Button
                        onClick={this.handleShowJens}
                        variant={showAjnas ? "info" : "danger"}
                    >
                        نمایش اجناس
                    </Button>

                    {Jens}
                    <ToastContainer />
                </div>
            </SimpleContext.Provider>
        );
    }
}

export default App;
