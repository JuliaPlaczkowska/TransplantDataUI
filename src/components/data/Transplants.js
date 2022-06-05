import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Component} from "react";
import AuthService from "../../api/auth.service";
import UserService from "../../api/user.service";
import {Redirect} from "react-router-dom";
import authHeader from "../../api/auth-header";

export default class Transplants extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},
            transplantData: {
                columns: [],
                rows: []
            }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/home"});
        console.log("Transplant component did mount")
        this.setState({
            currentUser: currentUser,
            userReady: true,
        })
        console.log("auth header: " + authHeader())
        UserService.getSurvivalResultsForDataGrid().then(
            response => {
                console.log('transplant.length : ' + response.data.length)
                if (response.data.length > 0) {
                    response.data.forEach((row, index)=>{
                        row.id = index
                    })
                    console.log("response: "+response.data)
                    this.setState(
                        {
                            transplantData: {
                                columns: this.generateColumns(),
                                rows: response.data.map(item =>
                                {
                                    const transplant = item.transplant
                                    const recipient = transplant.recipient
                                    const donor = transplant.donor
                                    return {
                                        "id" : item.id,
                                        "number" : item.number,
                                        "recipientNumber": recipient.patient.number,
                                        "recipientAge": recipient.patient.age,
                                        "recipientBloodABO": recipient.patient.bloodABO,
                                        "recipientPresenceOfCMV": recipient.patient.presenceOfCMV,
                                        "bloodRh": recipient.bloodRh,
                                        "bodyMass": recipient.bodyMass,
                                        "disease": recipient.disease,
                                        "diseaseGroup": recipient.diseaseGroup,
                                        "riskGroup": recipient.riskGroup,
                                        "donorNumber": donor.patient.number,
                                        "donorAge": donor.patient.age,
                                        "donorBloodABO": donor.patient.bloodABO,
                                        "donorPresenceOfCMV": donor.patient.presenceOfCMV,
                                        "stemCellSource": donor.stemCellSource,
                                        "matchHLA": transplant.matchHLA,
                                        "mismatchHLA": transplant.mismatchHLA,
                                        "antigen": transplant.antigen,
                                        "allele": transplant.allele,
                                        "group1HLA": transplant.group1HLA,
                                        "postRelapse": transplant.postRelapse,
                                        "cd3perKg": item.transplant.cd3perKg,
                                        "cd34perKg": item.transplant.cd34perKg,
                                        "ancRecovery": item.ancRecovery,
                                        "pltRecovery": item.pltRecovery,
                                        "acuteGvHD_II_III_IV": item.acuteGvHD_II_III_IV,
                                        "acuteGvHD_III_IV": item.acuteGvHD_III_IV,
                                        "time_to_acuteGvHD_III_IV": item.time_to_acuteGvHD_III_IV,
                                        "extensiveChronicGvHD": item.extensiveChronicGvHD,
                                        "relapse": item.relapse,
                                        "survivalTime": item.survivalTime,
                                        "survivalStatus": item.survivalStatus
                                    }
                                })
                            }
                        },
                        () => {
                            console.log("this.state.transplantData: ")
                            console.log(this.state.transplantData)
                        }
                    )
                }
            },
            error => {
                this.setState({
                    sets: [
                        {name: error.toString()}
                    ]
                });
            }
        )
    }

    generateColumns(){
        return [

            { field: 'id', headerName: 'ID', width: 150, hide: true},

            { field: 'number', headerName: 'number', width: 100},
            { field: 'recipientNumber', headerName: 'Recipient number', width: 150},
            { field: 'recipientAge', headerName: 'Recipient age', width: 150 },
            { field: 'recipientBloodABO', headerName: 'Recipient Blood ABO', width: 150 },
            { field: 'recipientPresenceOfCMV', headerName: 'Recipient presence of CMV', width: 150 },
            { field: 'bloodRh', headerName: 'Recipient blood Rh', width: 150 },
            { field: 'bodyMass', headerName: 'Recipient Body Mass', width: 150 },
            { field: 'disease', headerName: 'Disease', width: 150 },
            { field: 'diseaseGroup', headerName: 'Disease group', width: 150 },
            { field: 'riskGroup', headerName: 'Risk group', width: 150 },

            { field: 'donorNumber', headerName: 'Donor number', width: 150},
            { field: 'donorAge', headerName: 'Donor age', width: 150 },
            { field: 'donorBloodABO', headerName: 'Donor Blood ABO', width: 150 },
            { field: 'donorPresenceOfCMV', headerName: 'Donor presence of CMV', width: 150 },
            { field: 'stemCellSource', headerName: 'Stem cell Source', width: 150 },

            { field: 'matchHLA', headerName: 'HLA match', width: 150 },
            { field: 'mismatchHLA', headerName: 'HLA mismatch', width: 150 },
            { field: 'antigen', headerName: 'Antigen', width: 150 },
            { field: 'allele', headerName: 'Allele', width: 150 },
            { field: 'group1HLA', headerName: 'Group1HLA', width: 150 },
            { field: 'postRelapse', headerName: 'Post Relapse', width: 150 },
            { field: 'cd34perKg', headerName: 'CD34', width: 150 },
            { field: 'cd3perKg', headerName: 'CD3', width: 150 },

            { field: 'ancRecovery', headerName: 'Neutrophils  recovery', width: 150 },
            { field: 'pltRecovery', headerName: 'Platelet recovery', width: 150 },
            { field: 'acuteGvHD_II_III_IV', headerName: 'GvHD II III IV', width: 150 },
            { field: 'acuteGvHD_III_IV', headerName: 'GvHD III IV', width: 150 },
            { field: 'time_to_acuteGvHD_III_IV', headerName: 'Time to GvHD III IV', width: 150 },
            { field: 'extensiveChronicGvHD', headerName: 'Extensive chronic GvHD', width: 150 },
            { field: 'relapse', headerName: 'Relapse', width: 150 },
            { field: 'survivalTime', headerName: 'Survival time', width: 150 },
            { field: 'survivalStatus', headerName: 'Survival status', width: 150 },
        ];
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        if (this.state.transplantData)
            return (
                <div className="ui container" style={{marginTop: '10 px'}}>
                    {(this.state.userReady) ?
                        <div>
                            {(this.state.transplantData !== []) ?
                                <div>

                                    <div style={{ height: 650, width: '100%' }}>
                                        <DataGrid
                                            rows={this.state.transplantData.rows}
                                            columns={this.state.transplantData.columns}
                                            pageSize={10}
                                            rowsPerPageOptions={[10]}
                                            checkboxSelection
                                            disableSelectionOnClick
                                        />
                                    </div>
                                </div>
                                :
                                <div>
                                    You have no transplant data yet.
                                </div>
                            }
                        </div>

                        :
                        <div>
                            You have no transplant data yet.
                        </div>
                    }
                </div>
            );
    }


}