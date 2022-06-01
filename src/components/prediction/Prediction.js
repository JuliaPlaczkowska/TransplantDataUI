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
            transplants: null,
            transplant: null,
            prediction: null
        }
    }

    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/home"});

        this.setState({
                currentUser: currentUser,
                userReady: true
            },
            () => {
                console.log("current user username: " + this.state.currentUser.username);
                this.setState({
                        transplant: {
                            recipient: {
                                patient: {
                                    number: 22000000001,
                                    age: 9.6,
                                    bloodABO: "A",
                                    presenceOfCMV: "present"
                                },
                                bloodRh: "plus",
                                bodyMass: 35.0,
                                disease: "ALL",
                                diseaseGroup: "malignant",
                                riskGroup: "high"
                            },
                            donor: {
                                patient: {
                                    number: 22000000000,
                                    age: 22.830137,
                                    bloodABO: "A",
                                    presenceOfCMV: "present"
                                },
                                stemCellSource: "peripheral_blood"
                            },
                            matchHLA: 10,
                            mismatchHLA: false,
                            antigen: 0,
                            allele: 0,
                            group1HLA: "matched",
                            postRelapse: false,
                            cd34perKg: 7.2,
                            cd3perKg: 5.38
                        }
                    },
                    () => {
                        console.log(this.state.transplant)
                        this.getPrediction()
                    });
            }
        );


    }

    getTransplantData() {
        UserService.getTransplantDataByUsername(
            this.state.currentUser.username
        )
            .then(
                response => {
                    if (!isNullOrUndef(response)) {
                        const responseTransplants = response.data;
                        const responseTransplant = response.data[0];
                        this.setState(
                            {
                                transplants: responseTransplants,
                                transplant: responseTransplant
                            },
                            () => {
                                console.log({responseTransplants})
                                console.log({responseTransplant})
                                this.getPrediction()
                            }
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

    getPrediction() {
        UserService.getPrediction(
            this.state.transplant
        )
            .then(
                response => {
                    if (!isNullOrUndef(response)) {
                        this.setState(
                            {
                                prediction: response.data
                            },
                            () => {
                                console.log("prediction: ")
                                console.log([response])
                            }
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