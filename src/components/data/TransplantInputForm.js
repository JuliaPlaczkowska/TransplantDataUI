import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../../api/user.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class TransplantInputForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            loading: false,
            message: ""
        };
    }

    mapTargetToTransplant(target) {
        return {
            recipient: {
                patient: {
                    number: target[0].value,
                    age: target[1].value,
                    bloodABO: target[2].value,
                    presenceOfCMV: target[3].value
                },
                bloodRh: target[4].value,
                bodyMass: target[5].value,
                disease: target[6].value,
                diseaseGroup: target[7].value,
                riskGroup: target[8].value
            },
            donor: {
                patient: {
                    number: target[9].value,
                    age: target[10].value,
                    bloodABO: target[11].value,
                    presenceOfCMV: target[12].value
                },
                stemCellSource: target[13].value
            },
            matchHLA: target[15].value,
            mismatchHLA: target[16].value,
            antigen: target[17].value,
            allele: target[18].value,
            group1HLA: target[19].value,
            postRelapse: target[20].value,
            cd34perKg: target[21].value,
            cd3perKg: target[22].value
        };
    }

    dummy() {
        return {
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
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        const transplant = this.mapTargetToTransplant(e.target)
        console.log("MAPPED TRANSPLANT: ")
        console.log(transplant)
        console.log(transplant.recipient)
        if (this.checkBtn.context._errors.length === 0) {
            // UserService.getPrediction(this.dummy()).then(
            UserService.getPrediction(transplant).then(
                () => {
                    console.log("successful prediction")
                    this.props.history.push("/prediction");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {

        return (
            <div className="container">
                <Form
                    onSubmit={this.handleSubmit}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    <div className="row">
                        <div className="col-sm">
                            <div className="card card-container">
                                <h3>Recipient</h3>
                                <div className="form-group">
                                    <label htmlFor="recipientNumber">Number</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="recipientNumber"
                                        validations={[required]}
                                    />
                                    <label htmlFor="recipientAge">Age</label>
                                    <Input
                                        className="form-control"
                                        name="recipientAge"
                                    />
                                    <label htmlFor="recipientBloodABO">Blood ABO</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="recipientBloodABO"
                                    />
                                    <label htmlFor="recipientPresenceOfCMV">Presence of CMV</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="recipientPresenceOfCMV"
                                    />
                                    <label htmlFor="bloodRh">Blood RH</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="bloodRh"
                                    />
                                    <label htmlFor="bodyMass">Body mass</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="bodyMass"
                                    />
                                    <label htmlFor="disease">Disease</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="disease"
                                    />
                                    <label htmlFor="diseaseGroup">Disease group</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="diseaseGroup"
                                    />
                                    <label htmlFor="riskGroup">Risk group</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="riskGroup"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card card-container">
                                <h3>Donor</h3>
                                <div className="form-group">
                                    <label htmlFor="donorNumber">Number</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="donorNumber"
                                        validations={[required]}
                                    />
                                    <label htmlFor="donorAge">Age</label>
                                    <Input
                                        className="form-control"
                                        name="donorAge"
                                    />
                                    <label htmlFor="donorBloodABO">Blood ABO</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="donorBloodABO"
                                    />
                                    <label htmlFor="donorPresenceOfCMV">Presence of CMV</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="donorPresenceOfCMV"
                                    />
                                    <label htmlFor="stemCellSource">Stem cell source</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="stemCellSource"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card card-container">
                                <h3>Transplant</h3>
                                <div className="form-group">
                                    <label htmlFor="number">Number</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="number"
                                        validations={[required]}
                                    />
                                    <label htmlFor="matchHLA">Match HLA</label>
                                    <Input
                                        className="form-control"
                                        name="matchHLA"
                                    />
                                    <label htmlFor="mismatchHLA">Mismatch HLA</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="mismatchHLA"
                                    />
                                    <label htmlFor="antigen">Antigen</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="antigen"
                                    />
                                    <label htmlFor="allele">Allele</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="allele"
                                    />
                                    <label htmlFor="group1HLA">Group 1 HLA</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="group1HLA"
                                    />
                                    <label htmlFor="postRelapse">Post Relapse</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="postRelapse"
                                    />
                                    <label htmlFor="cd3perKg">CD3 per Kg</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="cd3perKg"
                                    />
                                    <label htmlFor="cd34perKg">CD34 per Kg</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="cd34perKg"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="form-group">
                            <div className="centered">
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"/>
                                    )}
                                    <span>Submit</span>
                                </button>
                            </div>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </div>
                </Form>
            </div>
        )
    }
}