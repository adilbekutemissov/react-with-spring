import React, {Component} from 'react';
import { MDBInput, MDBBtn } from 'mdbreact';
import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Form} from "react-bootstrap";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';

export default class AddCourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            code: '',
            id_teacher: '',
            teacherOptions: '',
            selectedTeacher: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeSelectedTeacher = (selectedTeacher) => {
        this.setState({selectedTeacher});
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        this.getTeachers();
    }

    getTeachers() {
        fetch('/teacher')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let options = [];
                // eslint-disable-next-line array-callback-return
                data.map(teacher => {
                    let temp = {value: teacher.id, label: teacher.first_name + ' ' + teacher.second_name};
                    options.push(temp);
                });
                this.setState({teacherOptions: options})
            })
            .catch(console.log);
    }

    createCourse() {
        let requestBody = {...this.state};
        requestBody.id_teacher = requestBody.selectedTeacher.value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch('/subject', requestOptions)
            .then(response => {
                toast.info("Course has been added");
                console.log(response)
            });
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
                                                    <p className="h4 text-center py-4" style={{background: "#33adff", color: "white"}}>Create Course</p>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput label="Name" name = "name" value={this.state.name} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBBtn className="mt-3" type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
                                                                    </div>
                                                                    <div className="col-10 col-sm-6 mb-3">
                                                                        <MDBInput label="Code" name = "code" value={this.state.code} onChange={this.handleChange} icon="lock" group type="text" validate error="wrong" success="right"/>
                                                                        <label className="font-weight-normal">Teacher</label>
                                                                        <Select  placeholder="Select Teacher" value={this.state.selectedTeacher}
                                                                                 onChange={this.handleChangeSelectedTeacher}
                                                                                 options={this.state.teacherOptions}/>
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