import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../api/auth.service";
import UserService from "../api/user.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""}
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        console.log(currentUser);

        if (!currentUser) this.setState({redirect: "/home"});
        this.setState({currentUser: currentUser, userReady: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {currentUser} = this.state;

        return (
            <div className="ui container" >
                {(this.state.userReady) ?
                    <div className="ui divided items">

                                <header className="jumbotron">
                                    <h3>
                                        <strong>{currentUser.username}</strong> Profile
                                        <div/>
                                    </h3>
                                </header>

                    </div> : null}
            </div>
        );
    }

}
