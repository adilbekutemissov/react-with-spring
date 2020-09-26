import React, {Component} from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Form} from "react-bootstrap";
import { toast } from 'react-toastify';
import Select from "react-select";

export default class AddStudentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            second_name: '',
            birthday: '',
            email: '',
            phone: '',
            login: '',
            password: '',
            year: '',
            id_group: '',
            groupOptions: [],
            selectedGroup: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getGroups();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeSelectedGroup = (selectedGroup) => {
        this.setState({selectedGroup});
    };

    createStudent() {
        let request = {};
        request.first_name = this.state.first_name;
        request.second_name = this.state.second_name;
        request.birthday = this.state.birthday;
        request.email = this.state.email;
        request.phone = this.state.phone;
        request.login = this.state.login;
        request.password = this.state.password;
        request.year = this.state.year;
        request.id_group = this.state.selectedGroup.value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        fetch('api/auth/signup/student', requestOptions)
            .then(response => {
                toast.info("Student has been added");
                console.log(response);
            });
    }

    handleSubmit(event) {
        this.createStudent();
        event.preventDefault();
    }

    getGroups() {
        fetch('/group')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let options = [];
                data.map(group => {
                   let option = {value: group.id, label: group.name};
                   options.push(option);
                });

                this.setState({groupOptions: options})
            })
            .then(() => {
                this.getTimeZones();
            })
            .catch(console.log);
    }


    render() {
        return (
            <div className="editProfilePage">
                <HeaderChild/>
                <div className="emp-profile">
                    <div className="container" >
                        <div className="my-3 p-3 rounded box-shadow" style={{margin: "auto", width: "50%"}}>
                            <div className="col">
                                <div className="row">
                                    <div className="col mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="e-profile">
                                                    <p className="h4 text-center py-4" style={{background: "#33adff", color: "white"}}>Create student profile</p>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput label="First Name" name = "first_name" value={this.state.first_name} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Second Name" name = "second_name" value={this.state.second_name} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Login" name = "login" value={this.state.login} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Email" name = "email" value={this.state.email} onChange={this.handleChange} icon="graduation-cap" group type="email"/>
                                                                        <label>Group</label>
                                                                        <Select value={this.state.selectedGroup}
                                                                                onChange={this.handleChangeSelectedGroup}
                                                                                options={this.state.groupOptions}/>
                                                                        <MDBBtn style={{background: "#33adff, !important", color: "white"}} className="mt-5" type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
                                                                    </div>
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput name = "birthday" value={this.state.birthday} onChange={this.handleChange} icon="calendar" group type="date" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Phone" name = "phone" value={this.state.phone} onChange={this.handleChange} icon="phone" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Year" name = "year" value={this.state.year} onChange={this.handleChange} icon="graduation-cap" group type="number" min="1" max="8" validate/>
                                                                        <MDBInput label="Password" name = "password" className={this.state.errorClass} value={this.state.password} onChange={this.handleChange} icon="lock" group type="password" validate/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
