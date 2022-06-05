import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8084/api/';

class UserService {


    getSurvivalResultsForDataGrid() {
        return axios.get(API_URL + 'survival-result/all', {
            headers:
                authHeader()
        });
    }

    getHistogramData(factor, classFactor) {

        return axios.get(API_URL + 'survival-result/histogram',
            {
                headers: authHeader(),
                params: {
                    factor,
                    classFactor
                }
            });
    }

    getTransplantDataByUsername(username) {
        return axios.get(API_URL + 'transplant/user',
            {
                headers: authHeader(),
                params: {
                    username
                }
            });

    }

    getChiSquareData(factor, classFactor, significance) {
        return axios({
            method: 'post',
            url: API_URL + 'survival-result/chi-square',
            headers: authHeader(),
            data: {
                factor: factor,
                classFactor: classFactor,
                significance: significance

            }
        });
    }

    getPrediction(transplant) {
        return axios({
            method: 'post',
            url: API_URL + 'prediction/predict',
            headers: authHeader(),
            data: transplant
        });
    }

    getClassificationTree() {
        return axios({
            method: 'get',
            url: API_URL + 'prediction/tree',
            headers: authHeader()
        });
    }
}

export default new UserService();
