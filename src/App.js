import React, { Component } from "react";
import "./App.css";
import Home from "./screens/Home"

class App extends Component {
    render() {
        const { message } = this.props;
        return (
            <div className="App">
                <Home />

            </div>
        );
    }
}

export default App;