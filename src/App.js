
import React, {Component} from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "./api/auth.service";
import Login from './components/authorization/Login';
import Register from "./components/authorization/Register";
import Profile from "./components/utils/Profile";
import Transplants from "./components/data/Transplants";
import Analysis from "./components/analysis/Analysis";
import Prediction from "./components/prediction/Prediction";
import ClassificationTree from "./components/prediction/ClassificationTree";
class App extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, showAdminBoard} = this.state;

        return (
            <div>

                <BrowserRouter>
                    <nav className="navbar navbar-expand navbar-dark bg-dark " >
                        <Link to={"/"} className="navbar-brand">
                            Transplant Data
                        </Link>
                        <div className="navbar-nav mr-auto">
                            {/*<li className="nav-item">*/}
                            {/*    <Link to={"/home"} className="nav-link">*/}
                            {/*        Home*/}
                            {/*    </Link>*/}
                            {/*</li>*/}


                            {showAdminBoard && (
                                //TODO
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin
                                    </Link>
                                </li>
                            )}
                            {(currentUser ) && (
                                <li className="nav-item">
                                    <Link to={"/analysis"} className="nav-link">
                                        Analysis
                                    </Link>
                                </li>
                            )}
                            {(currentUser ) && (
                                <li className="nav-item">
                                    <Link to={"/prediction"} className="nav-link">
                                        Prediction
                                    </Link>
                                </li>
                            )}

                            {(currentUser) && (
                                <li className="nav-item">
                                    <Link to={"/transplants"} className="nav-link">
                                        Transplants
                                    </Link>
                                </li>

                            )}

                            {(currentUser) && (
                                <li className="nav-item">
                                    <Link to={"/classification-tree"} className="nav-link">
                                        Classification Tree
                                    </Link>
                                </li>

                            )}

                            {(currentUser && !showAdminBoard) && (
                                //TODO
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
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
                            {/*<Route exact path={["/", "/home"]} component={HistogramChart}/>*/}
                            {/*<Route exact path="/sets" component={SetsList}/>*/}
                            {/*<Route exact path="/set/propose" component={ProposeNewSet}/>*/}
                            {/*<Route exact path="/game"*/}
                            {/*       render={(props) => <Flashcards {...props}/>}/>*/}
                            {/*<Route exact path="/ranking"*/}
                            {/*       render={(props) => <Ranking {...props}/>}/>*/}
                            {/*<Route exact path="/progress" component={Progress}/>*/}

                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path={["/", "/home","/profile"]} component={Profile}/>
                            <Route exact path="/transplants" component={Transplants}/>
                            <Route exact path="/analysis" component={Analysis}/>
                            <Route exact path="/prediction" component={Prediction}/>
                            <Route exact path="/classification-tree" component={ClassificationTree}/>
                        </Switch>
                    </div>

                </BrowserRouter>
            </div>
        );
    }
}

export default App;
