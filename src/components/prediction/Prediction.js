import {Component} from "react";
import AuthService from "../../api/auth.service";
import UserService from "../../api/user.service";
import {isNullOrUndef} from "chart.js/helpers";

export default class Prediction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            userReady: false,
            transplants: null
        }
    }

    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/home"});

        this.setState({
                currentUser: currentUser,
                userReady: true
            },
            () =>{
                console.log("current user username: " + this.state.currentUser.username);
                this.getTransplantData();
            }
        );


    }

    getTransplantData(){
        UserService.getTransplantDataByUsername(
            this.state.currentUser.username
        )
            .then(
                response => {
                    if (!isNullOrUndef(response)) {
                        this.setState(
                            {
                                transplants: response.data
                            },
                            ()=>
                                console.log("transplants: " + response.data)
                        )
                    } else console.log("response.data length is 0")
                },
                error => {
                    console.log("Error acquiring data:" + error)
                    this.setState({
                        sets: [
                            {name: error.toString()}
                        ]
                    });
                }
            )
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}