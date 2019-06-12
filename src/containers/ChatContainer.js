import React, {Component} from "react";
import {connect} from "react-redux";
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
        console.log(this.props.messages)
        return (
            <div style={{marginTop:'5%',marginBottom:'5%'}}>

                <div>
                    <TextField fullWidth style={{width: '65%',}} label="User Name" placeholder="User Name" variant="outlined" onChange={this.onUserChange} value={this.props.user}/>
                </div>

                {this.props.connectedRoom &&
                <div style={{display:"flex",margin:'0 auto',textAlign:'center',  alignItems: 'center', justifyContent: 'center'}}>
                    {this.props.connectedRoom && <TextField style={{width: '60%',margin:'1%',}} variant="outlined" disabled fullWidth value={'Connected to '+this.props.connectedRoom} /> }
                    <Button style={{margin:'1%'}}  variant="contained" color="primary" onClick={this.disconnect}> Disconnect (not done)</Button>
                </div>}

                {!this.props.connectedRoom && (
                    <div style={{display:"flex",margin:'0 auto',textAlign:'center',  alignItems: 'center', justifyContent: 'center'}}>
                        <TextField  fullWidth  label="Room Name" placeholder="Room Name" style={{width: '60%',margin:'1%',}} variant="outlined" onChange={this.onRoomChange} value={this.state.room}/>
                        <Button style={{margin:'1%'}} variant="contained" color="primary" onClick={this.connectRoom}> Connect</Button>
                    </div>
                )}

                <div style={{width: '70%',
                    textAlign: 'center',
                    overflowY: 'hidden',
                    flexGrow: 1,
                    verticalAlign: 'middle',
                    height: '350px',
                    borderRadius: '6px',
                    flexBasis: '50%',
                    border: 'solid red 1px',
                    margin: '0 auto',
                    marginTop: '2%',
                    marginBottom: '2%',}}>
                    <Typography> MESSAGES </Typography>
                    {
                        this.props.messages.map(message => (
                            <div key={message.time} >
                                <Typography>
                                    {message.time} - {message.user} - {message.content}
                                </Typography>
                            </div>
                        ))
                    }
                </div>

                <div style={{display:"flex",margin:'0 auto',textAlign:'center',  alignItems: 'center', justifyContent: 'center'}}>
                    <TextField style={{width: '60%',margin:'1%',}}  fullWidth label="Chat Text" placeholder="Chat Text"  variant="outlined" onChange={this.onInputMessageChange} value={this.state.inputMessage}/>
                    <Button style={{margin:'1%'}} variant="contained" color="primary" onClick={this.sendMessage}>Send Message</Button>
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