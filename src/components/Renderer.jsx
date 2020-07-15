import React from 'react';
import '../style/style.css';



export default function Renderer({ task, Regex, taskId, bankList }) {
    const loadBanks = (Id) => {

        var method = "00";
        var msgToken = "01";
        var xmlhttp = new XMLHttpRequest();
        var url = "https://demo.curlec.com/curlec-services/banks?method=" + method + "&msgToken=" + msgToken;
        var bankList = [];
        var options = [];
        var selectBox = document.getElementById(Id);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                if (myArr.Status == 201) {
                    bankList = myArr.Response[0];
                    options = bankList;
                    if (selectBox && selectBox.options.length < 2) {
                        for (var i = 0, l = options.length; i < l; i++) {
                            var option = options[i];
                            if (selectBox !== null) {
                                selectBox.options.add(new Option(option.display_name, option.code));
                            }
                        }
                    }
                }
            }
        };
        xmlhttp.open("POST", url, true);
        xmlhttp.send();
    }


    const combineId = (Id) => {
        return 'alert' + Id;
    }

    const updateVal = (type, Id, e) => {
        var val = document.getElementById(Id).value;
        var reg = new RegExp(Regex[type]);
        var alertId = combineId(Id);

        if (reg.test(val)) {
            document.getElementById(alertId).innerHTML = '';
        } else {
            document.getElementById(alertId).innerHTML = 'Invalid ' + Id + '.';
        }
    }

    const checkList = (Id, e) => {
        var val = document.getElementById(Id).value;
        var alertId = combineId(Id);
        if (val) {
            document.getElementById(alertId).innerHTML = '';
        } else {
            document.getElementById(alertId).innerHTML = 'Invalid ' + Id + '.';
        }
    }

    if (task.inputField === 'TextField') {
        return (
            <div key={taskId}>
                <label htmlFor={task.content}>{task.content}</label>
                <br />
                <input type="text" id={task.content} name={task.content}
                    pattern={Regex[task.type]} required
                    onChange={updateVal.bind(this, task.type, task.content)}
                    placeholder={`Please enter your ${task.content.toLowerCase()}`} />
                <br />
                <span id={combineId(task.content)} className="errorSpan"></span>
            </div>
        )
    } else if (task.inputField === 'Checkbox') {
        return (
            <div>
                <input type="checkbox" id={task.content} value="checkboxVal" />
                <label htmlFor={task.content} className='item-title' >{task.content}</label>
                <br />
                <br />
            </div>
        )
    } else if (task.inputField === 'DropDownList') {
        return (
            <div>
                <label htmlFor={task.content}>{task.content}</label>
                <br />
                <select id={task.content} name={task.content} required>
                    {task.listValues.map((value) =>
                        <option value={value}>{value}</option>
                    )}
                </select>
                <br />
                <br />
            </div>
        )
    } else if (task.inputField === 'BankList') {
        return (
            <div>
                <label htmlFor={task.content}>{task.content}</label>
                <br />
                <select id={task.content} name={task.content} required
                    onChange={checkList.bind(this, task.content)}>
                    <option value="">--Please Select Bank--</option>
                </select>
                <br />
                <span id={combineId(task.content)} className="errorSpan"></span>
                <br />
                <script type="text/javascript">{document.onload = loadBanks(task.content)}</script>
            </div>

        )
    }


}

