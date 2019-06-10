import React, { Component } from "react";
import SocketContainer from "../containers/ChatContainer"

class App extends Component {
    render() {
        const { message } = this.props;
        return (
            <div className="App">

                <SocketContainer />

            </div>
        );
    }
}

export default App;