import React, {Component} from "react";
import {connect} from "react-redux";
import io from 'socket.io-client';

class Product extends Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            room: "",
            inputMessage: "",
            connectedRoom: "",
            user: "default",
            messages: []
        }
    }

    componentDidMount() {

    }

    sendMessage = () => {
        this.props.sendMessage(this.state.inputMessage);
    }

    connectRoom = async (e) => {
        this.props.onConnect({user: this.state.user, room: this.state.room})
    };

    disconnect = async () => {
        this.socket = await this.socket.close();
        this.setState({connectedRoom: ""})
    }

    onRoomChange = (e) => {
        this.setState({room: e.target.value})
    }

    onInputMessageChange = (e) => {
        this.setState({inputMessage: e.target.value})
    }

    onUserChange = (e) => {
        this.props.setUser(e.target.value)
    }

    render() {
        return (
            <div>


                <div>
                    <p> USER </p>
                    <input onChange={this.onUserChange} value={this.props.user}/>
                </div>

                {this.props.connectedRoom &&
                <div>
                    <p> Connected to {this.props.connectedRoom}</p>
                    <button onClick={this.disconnect}> Disconnect (not done)</button>
                </div>}

                {!this.props.connectedRoom && (
                    <div>
                        <p> Enter a room </p>

                        <input onChange={this.onRoomChange} value={this.state.room}/>
                        <button onClick={this.connectRoom}> Connect</button>
                    </div>
                )}
                <div>
                    <p> INPUT MESSAGE </p>
                    <input onChange={this.onInputMessageChange} value={this.state.inputMessage}/>
                    <button onClick={this.sendMessage}>Send Message</button>
                </div>

                <div>
                    <p> MESSAGES </p>
                    {
                        this.props.messages.map(message => (
                            <div key={message.time}>
                                <p>
                                    {message.time} - {message.user} - {message.content}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let {chatReducer} = state;
    let {messages, user, connectedRoom} = chatReducer;
    return {
        messages, user, connectedRoom
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onConnect: ({user, room}) => dispatch({type: "CONNECT", payload: {user: user, room: room}}),
        sendMessage: (message) => dispatch({type: "SEND_MESSAGE", payload: {message: message}}),
        setUser: (user) => dispatch({type: "SET_USER", payload: {user: user}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);