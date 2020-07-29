import React, { useState, useRef } from 'react';
import '../style/style.css';

export default function CopyLink({ link }) {

    const [copySuccess, setCopySuccess] = useState("");

    function copyToClipboard(e) {
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
                        <button onClick={copyToClipboard}>Copy Link</button>
                        {copySuccess}
                        <br />
                        < input type="text" id="linkId" value={link}></input>
                    </div>
                </div>
            }

        </div >
    );
}