import React, {Component} from "react";
import {connect} from "react-redux";
import io from 'socket.io-client';
import moment from 'moment';
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
            user: "",
            messages: [],
            showChatBar:false,
            hideUserBar:false,
        }
    }

    componentDidMount() {

    }

    sendMessage = () => {
        this.props.sendMessage({message:this.state.inputMessage,user:this.state.user});
        this.setState({inputMessage: "",})
    };

    connectRoom = async (e) => {
        this.props.onConnect({user: this.state.user, room: this.state.room});
        this.setState({ showChatBar:true,hideUserBar:true,})
    };

    disconnect = async () => {
        this.socket = await this.socket.close();
        this.setState({connectedRoom: ""});
        this.setState({ showChatBar:false,hideUserBar:false,})
    };

    onRoomChange = (e) => {
        this.setState({room: e.target.value})
    };

    onInputMessageChange = (e) => {
        this.setState({inputMessage: e.target.value})
    };

    onUserChange = (e) => {
        this.props.setUser(e.target.value);
        let user = e.target.value;
        this.setState({user:user})
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
         this.sendMessage();
        }
    };

    render() {
        console.log(this.props.messages);

        return (
            <div style={{marginTop:'5%',marginBottom:'5%'}}>

                <div>
                    {this.state.hideUserBar === false &&<TextField fullWidth style={{width: '65%',}} label="User Name" placeholder="User Name" variant="outlined" onChange={this.onUserChange} value={this.state.user}/>}
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

                {this.state.showChatBar === false && <div>
                    <Typography style={{margin:'5%',color:'red',  fontSize: '4.5rem',
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",}}>Connect to room to chat</Typography>
                </div>}

                {this.state.showChatBar === true && <div>
                    <Typography> MESSAGES </Typography>
                    <div style={{width: '70%',
                        textAlign: 'center',
                        overflowY: 'scroll',
                        flexGrow: 1,
                        verticalAlign: 'middle',
                        height: '350px',
                        borderRadius: '6px',
                        flexBasis: '50%',
                        border: 'solid red 1px',
                        margin: '0 auto',
                        marginTop: '2%',
                        marginBottom: '2%',}}>
                        {
                            this.props.messages.map(message => (
                                <div style={{}} key={message.time} >
                                    {console.log('state:',this.state.user,'message.user:', message.user,this.state.user === message.user)}
                                    {this.state.user === message.user && <div style={{}}>
                                        <div style={{margin:'1%',float:'right',   width: '100%',
                                            flexBasis:'100%',}}>
                                            <div style={{float:'right',backgroundColor: 'rgb(63, 81, 181)',paddingLeft:'5%',paddingRight:'5%',paddingTop:'1%',paddingBottom:'1%',boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',borderRadius:'6px'}}>
                                            <Typography  style={{color: 'rgba(255,253,254,0.87)'}}>{message.content}</Typography>
                                            </div>
                                        </div>
                                        <div style={{float:'right',marginRight:'1%',}}><Typography style={{color: 'rgba(199, 199, 199, 0.87)'}}> {moment(message.time).format('DD-MMMM-YY, hh:mm a')}  - Sent by : {message.user}</Typography></div>
                                    </div>}
                                    {this.state.user !== message.user && <div style={{}}>
                                        <div style={{margin:'1%',float:'right',   width: '100%',
                                            flexBasis:'100%',}}>
                                            <div style={{marginLeft:'2%',float:'left',backgroundColor: 'rgb(241, 240, 240)',paddingLeft:'5%',paddingRight:'5%',paddingTop:'1%',paddingBottom:'1%',boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',borderRadius:'6px'}}>
                                                <Typography  style={{color: 'black'}}>{message.content}</Typography>
                                            </div>
                                        </div>
                                        <div style={{float:'left',marginLeft:'1%',}}><Typography style={{color: 'rgba(199, 199, 199, 0.87)'}}> {moment(message.time).format('DD-MMMM-YY, hh:mm a')} - Sent by : {message.user}</Typography></div>
                                    </div>}
                                </div>
                            ))
                        }
                    </div>

                    <div style={{display:"flex",margin:'0 auto',textAlign:'center',  alignItems: 'center', justifyContent: 'center'}}>
                        <TextField style={{width: '60%',margin:'1%',}}  onKeyDown={this._handleKeyDown} fullWidth label={this.state.user+" Chat Text"} placeholder={this.state.user+" Chat Text"}  variant="outlined" onChange={this.onInputMessageChange} value={this.state.inputMessage}/>
                        <Button style={{margin:'1%'}} variant="contained" color="primary" onClick={this.sendMessage}>Send Message</Button>
                    </div>
                </div>}

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
        sendMessage: ({message,user}) => dispatch({type: "SEND_MESSAGE", payload: {message: message,user: user},},),
        setUser: (user) => dispatch({type: "SET_USER", payload: {user: user}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);