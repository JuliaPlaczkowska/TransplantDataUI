import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8084/api/';

class UserService {


    getSurvivalResultsForDataGrid() {
        return axios.get(API_URL + 'survivalResult/dataGrid', {
            headers:
                authHeader()
        });
    }

    getHistogramData(factor, classFactor) {

        return axios.get(API_URL + 'survivalResult/histogram',
            {
                headers: authHeader(),
                params: {
                    factor,
                    classFactor
                }
            });
    }

    getTransplantDataByUsername(username){
        return axios.get(API_URL + 'transplant/user',
            {
                headers: authHeader(),
                params: {
                    username
                }
            });

    }

    getChiSquareData(factor, classFactor, significance) {
        console.log("Hello from user.service getChiSquareData()!")
        console.log("factor: "+factor )
        return axios.get(API_URL + 'survivalResult/chisquaretest',
            {
                headers: authHeader(),
                params: {
                    factor,
                    classFactor,
                    significance
                }
            });
    }


}

export default new UserService();
