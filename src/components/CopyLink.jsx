import React, { useState } from 'react';
import '../style/style.css';



export default function CopyLink({ link }) {

    const [copySuccess, setCopySuccess] = useState("");

    const copyToClipboard = (e) => {
        document.getElementById("linkId").select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(""), 2000);
    };



    return (
        <div>
            {
                <div>
                    <div>
                        <button onClick={copyToClipboard} className="headerBtn">Copy Link</button>
                        {copySuccess}
                        <br />
                        < input type="text" id="linkId" defaultValue={link} readOnly></input>
                    </div>


                </div>
            }

        </div >
    );
}