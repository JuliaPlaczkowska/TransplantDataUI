import React, {Component} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import "./App.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "./api/auth.service";
import Login from './components/authorization/Login';
import Register from "./components/authorization/Register";
import Profile from "./components/utils/Profile";
import Transplants from "./components/data/Transplants";
import Analysis from "./components/analysis/Analysis";
import TransplantInputForm from "./components/data/TransplantInputForm";

class App extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div>

                <BrowserRouter>
                    <nav className="navbar navbar-expand navbar-dark bg-dark ">
                        <Link to={"/"} className="navbar-brand">
                            Transplant Data
                        </Link>
                        <div className="navbar-nav mr-auto">
                            {(currentUser) && (
                                <li className="nav-item">
                                    <Link to={"/transplants"} className="nav-link">
                                        Transplants
                                    </Link>
                                </li>

                            )}
                            {(currentUser) && (
                                <li className="nav-item">
                                    <Link to={"/analysis"} className="nav-link">
                                        Analysis
                                    </Link>
                                </li>
                            )}
                            {(currentUser) && (
                                <li className="nav-item">
                                    <Link to={"/new-transplant"} className="nav-link">
                                        Prediction
                                    </Link>
                                </li>
                            )}
                        </div>

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path={["/", "/home"]} component={Profile}/>
                            <Route exact path="/transplants" component={Transplants}/>
                            <Route exact path="/analysis" component={Analysis}/>
                            <Route exact path="/new-transplant" component={TransplantInputForm}/>
                        </Switch>
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
