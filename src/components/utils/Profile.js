import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../api/auth.service";

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
            <div className="ui container">
                {(this.state.userReady) ?
                    <div className="ui divided items">

                        <header className="jumbotron">
                            <h3>
                                Welcome to <strong>Transplant Data App</strong>!
                            </h3>
                        </header>

                    </div> : null}
            </div>
        );
    }

}
