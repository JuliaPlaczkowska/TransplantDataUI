import {Component} from "react";
import AuthService from "../../api/auth.service";
import {isNullOrUndef} from "chart.js/helpers";

export default class ClassificationTree extends Component {

    constructor(props) {
        super(props);
        let tree = "Loading data...";
        if (!isNullOrUndef(this.props.tree))
            tree = this.props.tree
        this.state = {
            currentUser: null,
            userReady: false,
            tree: tree
        }
    }

    componentDidMount() {

        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({redirect: "/home"});

        this.setState({
                currentUser: currentUser,
                userReady: true
            }
        );
    }

    render() {
        const renderedOutput = this.state.tree.map(
            item =>
                <div> {item} </div>
        );

        return (
            <div className="card card-container3">
                <h3>Classification tree</h3>
                <h3></h3>
                {renderedOutput}
            </div>
        );
    }
}