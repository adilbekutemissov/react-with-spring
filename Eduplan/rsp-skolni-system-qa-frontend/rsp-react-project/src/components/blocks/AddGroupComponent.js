import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Button, Form} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

export default class AddCourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    createCourse(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        console.log(requestOptions);
        fetch('/group', requestOptions)
            .then(response => {
                toast.info("Group has been added");
                console.log(response);});
    }

    handleSubmit(event) {
        console.log(this.state);
        this.createCourse();
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
                                                    <p className="h4 text-center py-4" style={{background: "#33adff", color: "white"}}>Create Group</p>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput label="Group Name" name = "name" value={this.state.name} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBBtn style={{background: "#33adff", color: "white"}}type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
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
