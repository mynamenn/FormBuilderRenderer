import React from 'react';
import axios from 'axios';
import Renderer from './Renderer';
import '../style/style.css';
import CopyLink from './CopyLink';

const admin = "admin";
class MainPage extends React.Component {
    state = {
        savedForms: [],
        formName: "",
        tasks: {},
        taskIds: [],
        Regex: {},
        bankList: [],
        currIndex: null,
        currForm: {},
        formType: "",
        companyName: "",
        image: "",
        merchantId: "",
        employeeId: "",
        adminMode: false,
        link: "",
    };

    componentDidMount = () => {
        this.handleGetData();
    }
    handleGetData = () => {
        // Get query string with parameter formName
        let link = window.location.href.split('/');
        // Check if link has all the parameters
        if (link.length === 7) {
            // Replace %20 in html with ACTUAL space
            if (link[6].indexOf("%20") > 0) {
                var formName = link[6].split("%20").join(" ");
            } else {
                var formName = link[6];
            }
            let companyName = link[4];
            let servletName = link[3];
            var axiosLink = 'http://localhost:8080/DemoApp/' + servletName;
            // Show saved forms when admin mode
            if (link[6] === admin) {
                this.setState({ adminMode: true });
            }

            axios
                .get(axiosLink, {
                    params: {
                        companyName: companyName,
                        formName: formName,
                    }
                })
                .then(response => {
                    // If user wants a specific form
                    if (formName != null) {
                        var splitted = response.data.split("\n");   // [savedForms, ...]
                        this.setState({ savedForms: JSON.parse(splitted[0]) });
                        this.state.savedForms.map((form, index) => {
                            if (Object.keys(form['newForm'])[0].toLowerCase() === formName.toLowerCase()) {
                                this.setState({ currIndex: index });
                            }
                        })
                    } else {
                        this.setState({ savedForms: response.data });
                    }
                    this.setState({ companyName: companyName });
                    this.setState({ currForm: this.state.savedForms[this.state.currIndex] });
                    this.setState({ formName: Object.keys(this.state.currForm['newForm']) });
                    this.setState({ tasks: this.state.currForm['newForm'][this.state.formName]['tasks'] });
                    this.setState({
                        taskIds:
                            this.state.currForm['newForm'][Object.keys(this.state.currForm['newForm'])]['taskIds']
                    });
                    this.setState({ bankList: this.state.currForm['bankList'] });
                    this.setState({ Regex: this.state.currForm['Regex'] });
                    this.setState({ image: this.state.currForm['newForm'][this.state.formName]['image'] })

                    this.setState({ merchantId: this.state.currForm['newForm'][this.state.formName]['merchantId'] });
                    this.setState({ employeeId: this.state.currForm['newForm'][this.state.formName]['employeeId'] });
                    this.setState({ formType: this.state.currForm['newForm'][this.state.formName]['formType'] });
                    var fileReader = new FileReader();

                    fileReader.onload = function (fileLoadedEvent) {
                        var srcData = fileLoadedEvent.target.result; // <--- data: base64
                        var newImage = document.createElement('img');
                        newImage.src = srcData;
                        // newImage.outerHTML is the image
                        document.getElementById("image").innerHTML = newImage.outerHTML;
                    }

                    if (this.state.formType.toLowerCase() === "instant") {
                        document.getElementById('submitInstant').style.display = "block";
                        document.getElementById('submitMandate').style.display = "none";
                    } else if (this.state.formType.toLowerCase() === "mandate") {
                        document.getElementById('submitMandate').style.display = "block";
                        document.getElementById('submitInstant').style.display = "none";
                    }
                })
                .catch(error => {
                    console.log(error);
                })
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
                var bankCode = document.getElementById('Bank List').value;
                var method = "03";
                var link = url + "description=" + description + "&amount=" + amount
                    + "&merchantId=" + this.state.merchantId + "&employeeId=" + this.state.employeeId
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
            'Purpose Of Payment', 'Business Model', 'Name', 'Email', 'ID Type'];
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
                var idType = document.getElementById('ID Type').value;
                var idValue = 88585858599;
                var bankId = document.getElementById('Bank List').value;
                var method = "03";
                var merchantId = "1";
                var employeeId = "2";
                var effectiveDate = "2020-07-15";
                var referenceNumber = "TTccc0001";

                var link = url + "frequency=" + frequency + "&amount=" + amount
                    + "&maximumFrequency=" + maximumFrequency + "&purposeOfPayment=" + purposeOfPayment
                    + "&businessModel=" + businessModel + "&name=" + name + "&method=" + method
                    + "&emailAddress=" + emailAddress + "&idType=" + idType
                    + "&idValue=" + idValue + "&bankId=" + bankId
                    + "&merchantId=" + merchantId + "&employeeId=" + employeeId + "&effectiveDate=" + effectiveDate + "&referenceNumber=" + referenceNumber;

                window.location.href = link;
            }
        } else {
            document.getElementById('alertMissing').innerHTML = errMsg.slice(0, -2);
        }
    }

    handleUpdateForm = (data) => {
        document.getElementById('alertMissing').innerHTML = "";
        var datas = data.split('|');  //[formName, index]
        var formName = datas[0];
        var index = datas[1];
        var link = window.location.href.split('/');
        link[6] = formName;

        this.setState({
            formName: formName,
            formType: this.state.savedForms[index]['newForm'][formName]['formType'],
            tasks: this.state.savedForms[index]['newForm'][formName]['tasks'],
            taskIds: this.state.savedForms[index]['newForm'][formName]['taskIds'],
            image: this.state.savedForms[index]['newForm'][formName]['image']
        }, function () {
            link[5] = this.state.savedForms[index]['newForm'][formName]['formType'];
            this.setState({ link: link.join('/') });
            // Sets url to appropriate form name
            window.history.pushState(formName, 'title', link.join('/'));

            if (link[5].toLowerCase() === "instant") {
                document.getElementById('submitInstant').style.display = "block";
                document.getElementById('submitMandate').style.display = "none";
            } else if (link[5].toLowerCase() === "mandate") {
                document.getElementById('submitMandate').style.display = "block";
                document.getElementById('submitInstant').style.display = "none";
            }
        }
        );
    }

    render() {

        return (
            <div>
                {// Show saved forms if admin mode
                    (this.state.adminMode) ?
                        <div id="leftAllign">
                            <label htmlFor="savedForms">Saved Forms</label>
                            <br />
                            <select id="savedForms" required
                                onChange={() => this.handleUpdateForm(document.getElementById('savedForms').value)}>
                                {this.state.savedForms.map((form, index) =>
                                    <option key={index} value={Object.keys(form['newForm']) + '|' + index}>{Object.keys(form['newForm'])}</option>
                                )}
                            </select>
                            <br />
                            <CopyLink link={this.state.link}></CopyLink>
                            <br />
                        </div> :
                        null
                }

                {/* <button onClick={() => this.handleGetData("Instant")}>Render Instant Pay Form</button>
                <button onClick={() => this.handleGetData("Mandate")}>Render Mandate Form</button> */}
                <br />
                {
                    // Show image if present
                    (!this.state.img) ? null :
                        <img src={this.state.image} style={{ width: "600px", height: "150px", background: "transparent" }} alt="preview" />
                }
                <br />
                <form name="signUp">
                    <h2 className="form-title">{this.state.formName}</h2>
                    {this.state.taskIds.map(taskId => (
                        <Renderer key={this.state.tasks[taskId]['content']} id={this.state.tasks[taskId]['content']}
                            taskId={taskId} Regex={this.state.Regex} task={this.state.tasks[taskId]}
                            formType={this.state.formType}></Renderer>
                    ))}
                    <br />
                    <span id="alertMissing" className="errorSpan"></span>
                    <button id="submitInstant" className="submit" onClick={this.handleSubmitInstant}>Submit</button>
                    <button id="submitMandate" className="submit" onClick={this.handleSubmitMandate}>Submit</button>
                </form>
            </div >
        );
    }
}


export default MainPage;