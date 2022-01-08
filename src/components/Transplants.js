import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import { withStyles } from "@material-ui/core";
import {Component} from "react";
import AuthService from "../api/auth.service";
import UserService from "../api/user.service";
import {Redirect} from "react-router-dom";
import authHeader from "../api/auth-header";

const StyledDataGrid = withStyles({
    root: {
        "& .MuiDataGrid-renderingZone": {
            maxHeight: "none !important"
        },
        "& .MuiDataGrid-cell": {
            lineHeight: "unset !important",
            maxHeight: "none !important",
            whiteSpace: "normal"
        },
        "& .MuiDataGrid-row": {
            maxHeight: "none !important"
        }
    }
})(DataGrid);

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
                                rows: response.data
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

            { field: 'id', headerName: 'ID', width: 90, hide: true},

            { field: 'recipientNumber', headerName: 'Recipient number', width: 150, hide: true },
            { field: 'recipientAge', headerName: 'Recipient age', width: 150 },
            { field: 'recipientBloodABO', headerName: 'Recipient Blood ABO', width: 150 },
            { field: 'recipientPresenceOfCMV', headerName: 'Recipient presence of CMV', width: 150 },
            { field: 'bloodRh', headerName: 'Recipient blood Rh', width: 90 },
            { field: 'bodyMass', headerName: 'Recipient Body Mass', width: 90 },
            { field: 'disease', headerName: 'Disease', width: 90 },
            { field: 'diseaseGroup', headerName: 'Disease group', width: 90 },
            { field: 'riskGroup', headerName: 'Risk group', width: 90 },

            { field: 'donorNumber', headerName: 'Donor number', width: 90, hide: true },
            { field: 'donorAge', headerName: 'Donor age', width: 90 },
            { field: 'donorBloodABO', headerName: 'Donor Blood ABO', width: 90 },
            { field: 'donorPresenceOfCMV', headerName: 'Donor presence of CMV', width: 90 },
            { field: 'stemCellSource', headerName: 'Stem cell Source', width: 90 },

            { field: 'matchHLA', headerName: 'HLA match', width: 90 },
            { field: 'mismatchHLA', headerName: 'HLA mismatch', width: 90 },
            { field: 'antigen', headerName: 'Antigen', width: 90 },
            { field: 'allele', headerName: 'Allele', width: 90 },
            { field: 'group1HLA', headerName: 'Group1HLA', width: 90 },
            { field: 'postRelapse', headerName: 'Post Relapse', width: 90 },
            { field: 'CD34perKg', headerName: 'CD34', width: 90, hide: true },
            { field: 'CD3perKg', headerName: 'CD3', width: 90, hide: true },

            { field: 'ancRecovery', headerName: 'Neutrophils  recovery', width: 90 },
            { field: 'pltRecovery', headerName: 'Platelet recovery', width: 90 },
            { field: 'acuteGvHD_II_III_IV', headerName: 'GvHD II III IV', width: 90 },
            { field: 'acuteGvHD_III_IV', headerName: 'GvHD III IV', width: 90 },
            { field: 'time_to_acuteGvHD_III_IV', headerName: 'Time to GvHD III IV', width: 90 },
            { field: 'extensiveChronicGvHD', headerName: 'Extensive chronic GvHD', width: 90 },
            { field: 'relapse', headerName: 'Relapse', width: 90 },
            { field: 'survivalTime', headerName: 'Survival time', width: 90 },
            { field: 'survivalStatus', headerName: 'Survival status', width: 90 },
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