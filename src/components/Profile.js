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

        // UserService.getAllGames().then(
        //     response => {
        //
        //         const userGames = response.data.filter((g) => {
        //                 return g.userDto.id === currentUser.id
        //             }
        //         )
        //
        //         this.setState(
        //             {
        //                 games: userGames
        //             }
        //         )
        //     },
        //     error => {
        //         console.log(error.toString());
        //     }
        // )
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
                                        <strong>{currentUser.access_token}</strong> Token
                                    </h3>
                                </header>
                        {/*<div className="ui card centered">*/}
                        {/*    <div className="top centered content">*/}
                        {/*        <p>*/}
                        {/*            <strong>Email:</strong>{" "}*/}
                        {/*            {currentUser.email}*/}
                        {/*        </p>*/}
                        {/*        <p>*/}
                        {/*            <strong>Games played:</strong>{" "}*/}
                        {/*            {this.state.gamesPlayed.length}*/}
                        {/*        </p>*/}
                        {/*        <p>*/}
                        {/*            <strong>Authorities:</strong>*/}
                        {/*            <ul>*/}
                        {/*                {currentUser.roles &&*/}
                        {/*                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}*/}
                        {/*            </ul>*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div> : null}
            </div>
        );
    }

}
