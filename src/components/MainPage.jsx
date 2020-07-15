import React from 'react';
import axios from 'axios';
import Renderer from './Renderer';
import '../style/style.css';

var link = "";
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
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var validate = true;
        // Check each field
        this.state.taskIds.map(taskId => {
            if (this.state.tasks[taskId]['inputField'] === 'TextField' || this.state.tasks[taskId]['inputField'] === 'BankList') {
                if (document.getElementById(this.state.tasks[taskId]['content']).value !== "") {
                    if (document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML !== "") {
                        document.getElementById("submit").disabled = false;
                        validate = false;
                    }
                } else {
                    document.getElementById("submit").disabled = false;
                    document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML = 'Invalid ' + this.state.tasks[taskId]['content'] + '.';
                    validate = false;
                }
            }
        })
        // Generate URL
        if (validate === true) {
            var url = "https://demo.curlec.com/new-instant-pay?";
            var description = "Instant%20Pay%20Testing";
            var amount = document.getElementById('Amount').value;
            var merchantId = "1";
            var employeeId = "2";
            var bankCode = document.getElementById('Bank List').value;
            var method = "03";
            link = url + "description=" + description + '&' + "amount=" + amount + '&'
                + "merchantId=" + merchantId + '&' + "employeeId=" + employeeId + '&'
                + "bankCode=" + bankCode + '&' + "method=" + method;

            var email = document.getElementById('Email');
            if (email) {
                link += '&email=' + email.value
            }
            var phoneNo = document.getElementById('Phone Number');
            if (phoneNo) {
                link += '&phoneNo=' + phoneNo.value
            }
            var orderNo = document.getElementById('Order Number');
            if (orderNo) {
                link += '&orderNo=' + orderNo.value
            }
            var mandateNo = document.getElementById('Mandate Number');
            if (mandateNo) {
                link += '&mandateNo=' + mandateNo.value
            }
            var businessModel = document.getElementById('Business Model');
            if (businessModel) {
                link += '&businessModel=' + businessModel.value
            }
            var notes = document.getElementById('Notes');
            if (notes) {
                link += '&notes=' + notes.value
            }
            var merchantUrl = document.getElementById('Merchant URL');
            if (merchantUrl) {
                link += '&merchantUrl=' + merchantUrl.value
            }
            var checksum = document.getElementById('Checksum');
            if (checksum) {
                link += '&checksum=' + checksum.value
            }
            var details = document.getElementById('Details');
            if (details) {
                link += '&details=' + details.value
            }

            window.location.href = link;
        }


    }


    render() {

        return (
            <div>
                <button onClick={this.handleGetData}>Get Data</button>
                <h1>{Object.keys(this.state.newForm)}</h1>
                <form name="signUp" onSubmit={this.handleSubmit}>
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
//https://demo.curlec.com/new-instant-pay?description=Instant%20Pay%20Testing&amount=123&merchantId=1&employeeId=2&bankCode=TEST0021&method=03&email=nguleychun@gmail.com&phoneNo=01116687812