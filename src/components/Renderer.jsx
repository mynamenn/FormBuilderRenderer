import React from 'react';
import '../style/style.css';

export default function Renderer({ task, Regex, taskId, bankList }) {

    const combineId = (Id) => {
        return 'alert' + Id;
    }

    const updateVal = (type, Id, e) => {
        var val = document.getElementById(Id).value;
        console.log(val);
        var reg = new RegExp(Regex[type]);
        var alertId = combineId(Id);

        if (reg.test(val)) {
            document.getElementById(alertId).innerHTML = '';
            return true;
        } else {
            document.getElementById(alertId).innerHTML = 'Invalid ' + Id + '.';
            return true;
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
                <span id={combineId(task.content)} class="errorSpan"></span>
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
                <select id={task.content} name={task.content} required>
                    {bankList.map((bankName) =>
                        <option value={bankName}>{bankName}</option>
                    )}
                </select>
                <br />
                <br />
            </div>
        )
    }


}

