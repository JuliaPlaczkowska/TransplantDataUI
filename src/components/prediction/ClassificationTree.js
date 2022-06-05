import {Component} from "react";
import AuthService from "../../api/auth.service";
import UserService from "../../api/user.service";
import {isNullOrUndef} from "chart.js/helpers";

export default class ClassificationTree extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            userReady: false,
            tree: ["loading tree..."]
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
                console.log(this.state.tree)
                this.getTree()
            }
        );


    }

    getTree() {
        UserService.getClassificationTree()
            .then(
                response => {
                    if (!isNullOrUndef(response)) {
                        this.setState(
                            {
                                tree: response.data
                            },
                            () => {
                                console.log("tree: ")
                                console.log(response.data)
                            }
                        )
                    } else console.log("response.data length is 0")
                },
                error => {
                    console.log("Error acquiring data:" + error)
                    this.setState({
                        tree: [
                            {name: error.toString()}
                        ]
                    });
                }
            )
    }

    displayArray() {
        let divs = [];
        for(let i = 0; i < 10; i++) {
            divs.push (<div key={i} >{i}</div>)
        }
        return divs;
    }

    render() {
        const renderedOutput = this.state.tree.map(item => <div> {item} </div>);

        return (
            <div>
                {renderedOutput}
            </div>
        );
    }
}