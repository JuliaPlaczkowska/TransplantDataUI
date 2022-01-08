import {Component} from "react";
import 'semantic-ui-css/semantic.min.css'

class InputBar extends Component{

    state = {
        question: '',
        answer:''
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.question, this.state.answer);
    };

    render() {
        return(
            <div className="ui segment">
                <form onSubmit={event => this.onFormSubmit(event)} className="ui form">
                    <div className="field">
                        <label>Enter question:</label>
                        <input name="question" type="text" required={true} value={this.state.question} onChange={
                            (event => this.setState({question: event.target.value, answer: this.state.answer}))}/>
                    </div>
                    <div className="field">
                        <label>Enter answer: </label>
                        <input name="answer" type="text" required={true} value={this.state.answer} onChange={
                            (event => this.setState({question: this.state.question, answer: event.target.value}))}/>
                    </div>
                    <input type="submit" value="Submit">

                    </input>

                </form>

            </div>
        )
    }

}

export default InputBar;