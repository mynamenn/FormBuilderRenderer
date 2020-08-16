import React from 'react';
import axios from 'axios';

const servletNameIndex = 5;
const axiosHead = "https://uat.curlec.com/CurlecFormBuilder/DemoApp/";
export default class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        students: [
            { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
        ],
        companies: [],
        datas: [],
    }

    componentDidMount = async () => {
        //['https:', '', 'uat.curlec.com', 'CurlecFormBuilder', 'formBuilder_build', 'servletName', 'curlecAdmin']
        let link = window.location.href.split('/');
        var servletName = link[servletNameIndex].substr(1);
        var axiosLink = axiosHead + servletName;

        await axios
            .get(axiosLink)
            .then(response => {
                var companies = response.data.split(" ");
                this.setState({ companies: companies })
            })
        // Map companies to link
        this.state.companies.map(company => {
            var adminLink = "https://uat.curlec.com/CurlecFormBuilder/formRenderer/?renderer/" + company.trim() + "/Mandate/admin";
            var newArr = this.state.datas;
            newArr.push({ company: company.trim(), adminLink: adminLink });
            this.setState({ datas: newArr });
        })
    }

    renderTableHeader() {
        let header = ["Company Name", "Admin Link"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.datas.map((data, index) => {
            const { company, adminLink } = data //destructuring
            return (
                <tr key={company}>
                    <td>{company}</td>
                    <td>{adminLink}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 id='curlecAdminTitle'>curlec Admin Mode</h1>
                <table id='students'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}