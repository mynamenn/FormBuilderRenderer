import React from 'react';
import axios from 'axios';
import Renderer from './Renderer';
import '../style/style.css';

class MainPage extends React.Component {
    state = {
        newForm: {},
        tasks: {},
        taskIds: [],
        Regex: {},
        bankList: []
    };

    handleGetData = () => {
        axios
            .get('/DemoApp/add')
            .then(response => {
                this.setState({ newForm: response.data['newForm'] });
                this.setState({ tasks: response.data['tasks'] });
                this.setState({
                    taskIds:
                        this.state.newForm[Object.keys(this.state.newForm)]['taskIds']
                });
                this.setState({ bankList: response.data['bankList'] });
                this.setState({ Regex: response.data['Regex'] })
                console.log('newForm: ', this.state.newForm);
                console.log('tasks: ', this.state.tasks);
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = (e) => {


        this.state.taskIds.map(taskId => {
            if (this.state.tasks[taskId]['inputField'] === 'TextField') {
                if (document.getElementById(this.state.tasks[taskId]['content']).value !== "") {
                    if (document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML !== "") {
                        document.getElementById("submit").disabled = false;
                        return false;
                    }

                } else {
                    document.getElementById("submit").disabled = false;
                    document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML = 'Invalid ' + this.state.tasks[taskId]['content'] + '.';
                    return false;
                }
            }
            return true;
        })
    }


    render() {

        return (
            <div>
                <button onClick={this.handleGetData}>Get Data</button>
                <h1>{Object.keys(this.state.newForm)}</h1>
                <form name="signUp">
                    {this.state.taskIds.map(taskId => (
                        <Renderer key={this.state.tasks[taskId]['content']} id={this.state.tasks[taskId]['content']}
                            taskId={taskId} Regex={this.state.Regex} task={this.state.tasks[taskId]} bankList={this.state.bankList}></Renderer>
                    ))}
                    <br />
                    <button id="submit" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}


export default MainPage;