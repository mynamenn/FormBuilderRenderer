import React from 'react';
import axios from 'axios';
import Renderer from './Renderer';
import '../style/style.css';

var link = "";
var formType = "";
class MainPage extends React.Component {
    state = {
        newForm: {},
        tasks: {},
        taskIds: [],
        Regex: {},
        bankList: [],
    };

    handleGetData = (form) => {
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

        if (form === "Instant") {
            document.getElementById('submitInstant').style.display = "block";
            document.getElementById('submitMandate').style.display = "none";
            formType = form;
        } else {
            document.getElementById('submitMandate').style.display = "block";
            document.getElementById('submitInstant').style.display = "none";
            formType = form;
        }


    }

    handleSubmitInstant = (e) => {
        e.preventDefault();
        var errMsg = "Please add ";
        var mandatoryInstantFields = ['Amount', 'Bank List'];
        var missingFields = false;
        mandatoryInstantFields.map(field => {
            if (!document.getElementById(field)) {
                missingFields = true;
                errMsg += field + ' , ';
            }
        })
        var validateInstant = true;
        // Check each field
        this.state.taskIds.map(taskId => {
            if (this.state.tasks[taskId]['inputField'] === 'TextField' || this.state.tasks[taskId]['inputField'] === 'BankList') {
                if (document.getElementById(this.state.tasks[taskId]['content']).value !== "") {
                    if (document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML !== "") {
                        validateInstant = false;
                    }
                } else {
                    document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML = 'Invalid ' + this.state.tasks[taskId]['content'] + '.';
                    validateInstant = false;
                }
            }
        })
        // Generate URL
        if (missingFields === false) {
            if (validateInstant === true) {

                var url = "https://demo.curlec.com/new-instant-pay?";
                var description = "Instant%20Pay%20Testing";
                var amount = document.getElementById('Amount').value;
                var merchantId = "1";
                var employeeId = "2";
                var bankCode = document.getElementById('Bank List').value;
                var method = "03";
                link = url + "description=" + description + "&amount=" + amount
                    + "&merchantId=" + merchantId + "&employeeId=" + employeeId
                    + "&bankCode=" + bankCode + "&method=" + method;

                // Optional fields
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
        } else {
            document.getElementById('alertMissing').innerHTML = errMsg.slice(0, -2);
        }
    }

    handleSubmitMandate = (e) => {
        e.preventDefault();
        var validateMandate = true;
        var missingFields = false;
        var errMsg = "Please add ";
        var mandatoryInstantFields = ['Amount', 'Bank List', 'Frequency', 'Maximum Frequency',
            'Purpose Of Payment', 'Business Model', 'Name', 'Email', 'Id Type'];
        mandatoryInstantFields.map(field => {
            if (document.getElementById(field) === null) {
                missingFields = true;
                errMsg += field + " , ";
            }
        })
        // Check each field
        this.state.taskIds.map(taskId => {
            if (this.state.tasks[taskId]['inputField'] === 'TextField') {
                if (document.getElementById(this.state.tasks[taskId]['content']).value !== "") {
                    if (document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML !== "") {
                        validateMandate = false;
                    }
                } else {
                    document.getElementById('alert' + this.state.tasks[taskId]['content']).innerHTML = 'Invalid ' + this.state.tasks[taskId]['content'] + '.';
                    validateMandate = false;
                }
            }
        })

        if (missingFields === false) {
            if (validateMandate === true) {
                var url = "https://demo.curlec.com/new-mandate?";
                var frequency = document.getElementById("Frequency").value;
                var maximumFrequency = document.getElementById("Maximum Frequency").value;
                var purposeOfPayment = document.getElementById("Purpose Of Payment").value;
                var amount = document.getElementById('Amount').value;
                var businessModel = document.getElementById('Business Model').value;
                var name = document.getElementById('Name').value;
                var emailAddress = document.getElementById('Email').value;
                var idType = document.getElementById('Id Type').value;
                var idValue = 88585858599;
                var bankId = document.getElementById('Bank List').value;
                var method = "00";
                var merchantId = "1";
                var employeeId = "2";
                var effectiveDate = "2020-07-15";

                link = url + "frequency=" + frequency + "&amount=" + amount
                    + "&maximumFrequency=" + maximumFrequency + "&purposeOfPayment=" + purposeOfPayment
                    + "&businessModel=" + businessModel + "&name=" + name + "&method=" + method
                    + "&emailAddress=" + emailAddress + "&idType=" + idType
                    + "&idValue=" + idValue + "&bankId=" + bankId
                    + "&merchantId=" + merchantId + "&employeeId=" + employeeId + "&effectiveDate=" + effectiveDate;

                window.location.href = link;
            }
        } else {
            document.getElementById('alertMissing').innerHTML = errMsg.slice(0, -2);

        }
    }

    render() {

        return (
            <div>
                <button onClick={() => this.handleGetData("Instant")}>Render Instant Pay Form</button>
                <button onClick={() => this.handleGetData("Mandate")}>Render Mandate Form</button>
                <h1>{Object.keys(this.state.newForm)}</h1>
                <form name="signUp">
                    {this.state.taskIds.map(taskId => (
                        <Renderer key={this.state.tasks[taskId]['content']} id={this.state.tasks[taskId]['content']}
                            taskId={taskId} Regex={this.state.Regex} task={this.state.tasks[taskId]} bankList={this.state.bankList}
                            formType={formType}></Renderer>
                    ))}
                    <br />
                    <span id="alertMissing" className="errorSpan"></span>
                    <button id="submitInstant" onClick={this.handleSubmitInstant}>Submit</button>
                    <button id="submitMandate" onClick={this.handleSubmitMandate}>Submit</button>
                </form>
            </div >
        );
    }
}


export default MainPage;