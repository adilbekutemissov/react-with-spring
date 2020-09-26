import React, {Component} from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import HeaderChild from "./HeaderChild";
import Footer from "./Footer";
import {Form} from "react-bootstrap";
import { toast } from 'react-toastify';

export default class AddTeacherComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            second_name: '',
            birthday: '',
            email: '',
            phone: '',
            login: '',
            year: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createTeacher(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch('api/auth/signup/teacher', requestOptions)
            .then(response => {
                toast.info("Teacher has been added");
                console.log(response);
            });
    }

    handleSubmit(event) {
        this.createTeacher();
        event.preventDefault();
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
                                                                        <MDBInput name = "birthday" value={this.state.birthday} onChange={this.handleChange} icon="calendar" group type="date" validate error="wrong" success="right"/>
                                                                    </div>
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput label="Email" name = "email" value={this.state.email} onChange={this.handleChange} icon="graduation-cap" group type="email"/>
                                                                        <MDBInput label="Phone" name = "phone" value={this.state.phone} onChange={this.handleChange} icon="phone" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Password" name = "password" className={this.state.errorClass} value={this.state.password} onChange={this.handleChange} icon="lock" group type="password" validate/>
                                                                    </div>
                                                                </div>
                                                                <MDBBtn style={{background: "#33adff"}} type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
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
