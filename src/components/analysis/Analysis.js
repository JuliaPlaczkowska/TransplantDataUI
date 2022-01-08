import * as React from 'react';
import {Component,} from "react";
import AuthService from "../../api/auth.service";
import {Redirect} from "react-router-dom";
import {HistogramChart} from "./HistogramChart";
import UserService from "../../api/user.service";
import {isNullOrUndef} from "chart.js/helpers";
import {Dropdown} from "react-bootstrap";
import "../../App.css";
import {ChiSquareTest} from "./ChiSquareTest";

export default class Analysis extends Component {


    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            histogramData: [],
            factors: this.generateFactors(),
            classFactors: this.generateClassFactors(),
            factor: "matchHla",
            significance: 0.01,
            significanceOptions: this.generateSignificanceOptions(),
            classFactor: "survivalStatus",
            chiSquare: {
                pvalue: 0.0,
                rejected: false
            }

        };
    }

    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/home"});

        this.setState({
            currentUser: currentUser,
            userReady: true
            // histogramData: {
            //     title: " HLA group on extensive chronic GvHD",
            //     labels: ["HLA matched", "one antigen", "one allele"], //row
            //     datasets:[
            //         {
            //             label: "yes", //column
            //             data: [1, 2, 3]
            //         },
            //         {
            //             label: "no",
            //             data: [1, 2, 3]
            //         },
            //         {
            //             label: "?",
            //             data: [1, 2, 3]
            //         }
            //     ]
            // }
        });

        this.updateData()

    }

    updateData() {
        this.updateHistogramData();
        this.updateChiSquareData();
    }

    updateHistogramData() {
        UserService.getHistogramData(
            this.state.factor,
            this.state.classFactor)
            .then(
                response => {
                    if (!isNullOrUndef(response)) {
                        this.setState(
                            {
                                histogramData: response.data
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

    updateChiSquareData() {
        UserService.getChiSquareData(
            this.state.factor,
            this.state.classFactor,
            this.state.significance)
            .then(
                response => {
                    if (!isNullOrUndef(response)) {
                        console.log("Chi square test response: "
                            + response.data
                        )
                        console.log("pvalue: " + response.data.pvalue)
                        console.log("rejected: " + response.data.rejected)
                        this.setState(
                            {
                                chiSquare: {
                                    pvalue: response.data.pvalue,
                                    rejected: response.data.rejected
                                }

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


    generateFactors() {
        return [
            "matchHla",
            "mismatchHla",
            "antigen",
            "allele",
            "groupHla",
            "postRelapse",
            "risk_group",
            // "CD34perKg",
            // "CD3perKg"
        ]
    }

    generateClassFactors() {
        return [
            "ancRecovery",
            "pltRecovery",
            "acuteGvHD_II_III_IV",
            "acuteGvHD_III_IV",
            "time_to_acuteGvHD",
            "extensiveChronicGvHD",
            "relapse",
            "survivalTime",
            "survivalStatus"
        ]
    }

    generateSignificanceOptions() {
        return [
            0.01,
            0.05,
            0.10,
            0.25,
            0.50
        ]
    }


    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div>
                {(this.state.userReady && !isNullOrUndef(this.state.histogramData)) ?
                    <div>

                        <h1>

                            <strong>Influence{"  "}</strong>


                            <div id="inline_element">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        id="dropdown-basic"
                                        align={{lg: 'center'}}>

                                        <strong> {this.state.factor} </strong>

                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {this.state.factors.map((f) => {
                                            return (<Dropdown.Item onClick={
                                                (event => {
                                                    this.setState(
                                                        {factor: f},
                                                        () => this.updateData()
                                                    );
                                                })
                                            }>{f}</Dropdown.Item>)
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>


                            <div id="inline-element2">
                                <Dropdown>
                                    <strong>{"  "}on{"  "}</strong>
                                    <Dropdown.Toggle
                                        //id="dropdown-basic"
                                    >
                                        <strong>{this.state.classFactor}</strong>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {this.state.classFactors.map((f) => {
                                            return (<Dropdown.Item onClick={
                                                (event => {
                                                    this.setState(
                                                        {classFactor: f},
                                                        () => this.updateData()
                                                    );
                                                })
                                            }>{f}</Dropdown.Item>)
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </h1>


                        <div className="card card-container2">
                            <header className="jumbotron">
                                <h3>
                                    <strong>Histogram</strong>
                                </h3>
                            </header>

                            <div className="ui container" style={{marginTop: '20 px'}}>
                                <HistogramChart histogramData={this.state.histogramData}/>
                            </div>

                        </div>

                        <div className="card card-container2">
                            <header className="jumbotron">
                                <h3>
                                    <strong>Chi-Square Test </strong>
                                </h3>
                            </header>
                            <div id="inline-element">
                            <strong>Significance:</strong>

                                <Dropdown>
                                    <Dropdown.Toggle>
                                        <strong>{this.state.significance}</strong>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {this.state.significanceOptions.map((s) => {
                                            return (<Dropdown.Item onClick={
                                                (event => {
                                                    this.setState(
                                                        {significance: s},
                                                        () => this.updateChiSquareData()
                                                    );
                                                })
                                            }>{s}</Dropdown.Item>)
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>


                            <div className="ui container" style={{marginTop: '20 px'}}>
                                <ChiSquareTest chiSquare={this.state.chiSquare}/>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        You have no transplant data yet.
                    </div>}
            </div>
        );
    }

}