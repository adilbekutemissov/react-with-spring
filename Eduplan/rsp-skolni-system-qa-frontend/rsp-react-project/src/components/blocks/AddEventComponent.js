import React, {Component} from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Button, Form} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

export default class AddCourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_group: '',
            id_room: '',
            id_teacher: '',
            time_: '',
            id_subject: '',
            week_day: ''
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
        fetch('/event', requestOptions)
            .then(response => {
                console.log(response);});
    }

    handleSubmit(event) {
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
                                                    <p className="h4 text-center py-4" style={{background: "linear-gradient(to bottom right, #33adff 55%, white)", color: "white"}}>Create Course</p>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput label="Id group" name = "id_group" value={this.state.id_group} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Id room" name = "id_room" value={this.state.id_room} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Id subject" name = "id_subject" value={this.state.id_subject} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Id teacher" name = "id_teacher" value={this.state.id_teacher} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBInput label="Time" name = "time_" value={this.state.time_} onChange={this.handleChange} icon="user" group type="time" validate error="wrong" success="right"/>
                                                                        <MDBInput label="week_day" name = "week_day" value={this.state.week_day} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBBtn style={{background: "linear-gradient(to bottom right, #33adff 55%, white)", color: "white"}} type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
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
