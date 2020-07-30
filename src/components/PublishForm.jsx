import React, { useState, useRef } from 'react';
import '../style/style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


// Accept savedForms, companyName, current formName
// Accept a setState for savedForms and published 
export default function CopyLink({ savedForms, companyName, formName, afterPublish, currIndex }) {

    const [copySuccess, setCopySuccess] = useState("");

    const [open, setOpen] = React.useState(false);

    const [merchantId, setMerchantId] = useState("");

    const [employeeId, setEmployeeId] = useState("");

    var savedForms = savedForms;

    const handlePublish = () => {
        // Find form in savedForms and set published to true
        savedForms[currIndex]['newForm'][formName]['published'] = true;
        savedForms[currIndex]['newForm'][formName]['merchantId'] = merchantId;
        savedForms[currIndex]['newForm'][formName]['employeeId'] = employeeId;
        // setState in mainPage
        afterPublish(savedForms);

        var submit = [];
        savedForms.map(form => {
            submit.push(JSON.stringify(form) + '\n');
        })
        const newFormFile = new File(submit, "form.txt",
            { type: 'text/plain' });

        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('newForm', newFormFile);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/DemoApp/write', true);
        xhr.send(formData);

        setCopySuccess("Published!");
        setEmployeeId("");
        setMerchantId("");
        handleClose();
        setTimeout(() => setCopySuccess(""), 2000);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleEmployeeId = (e) => {
        setEmployeeId(e.target.value);
    }

    const handleMerchantId = (e) => {
        setMerchantId(e.target.value);
    }

    return (
        <div>
            <button onClick={handleOpen}>Publish Form</button>
            {copySuccess}

            <Modal show={open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Form</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label>merchantId &ensp;</label>
                    <input type="text" name="merchantId"
                        value={merchantId} onChange={handleMerchantId} />
                    <br />
                    <label>employeeId &ensp;</label>
                    <input type="text" name="employeeId"
                        value={employeeId} onChange={handleEmployeeId} />
                    <br />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePublish}>
                        Publish</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}