import {Component} from "react";
import AuthService from "../../api/auth.service";
import ClassificationTree from "./ClassificationTree";
import {Col, Container, Row} from "react-bootstrap";

export default class Prediction extends Component {
    s

    constructor(props) {
        super(props);
        const distribution = props.location.state.prediction.distribution.split(',');
        this.state = {
            currentUser: null,
            userReady: false,
            transplant: props.location.state.transplant,
            classifiedAs: props.location.state.prediction.classifiedAs,
            zeroProbability: distribution[0],
            oneProbability: distribution[1],
            tree: props.location.state.prediction.tree
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
            }
        );
    }

    floatFormatter(x) {
        return Number.parseFloat(x).toFixed(3);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <ClassificationTree tree={this.state.tree}/>
                    </Col>
                    <Col>
                        <div className="card card-container3">
                            <h3>Prediction</h3>
                            <h3></h3>
                            <h3>Classified as : {this.state.classifiedAs}</h3>
                            <h3>Probability of 0 : {this.floatFormatter(this.state.zeroProbability)}</h3>
                            <h3>Probability of 1 : {this.floatFormatter(this.state.oneProbability)}</h3>
                        </div>
                    </Col>
                </Row>

            </Container>
        );
    }
}