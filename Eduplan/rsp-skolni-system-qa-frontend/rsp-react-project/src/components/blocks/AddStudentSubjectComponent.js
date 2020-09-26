import React, {Component} from 'react';
import { MDBBtn } from 'mdbreact';
import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Form} from "react-bootstrap";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';

export default class AddCourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: '',
            selectedSubject: '',
            studentOptions: [],
            subjectOptions: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeSelectedStudent = (selectedStudent) => {
        this.setState({selectedStudent});
    };

    handleChangeSelectedSubject = (selectedSubject) => {
        this.setState({selectedSubject});
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        this.getGroups();
        this.getSubjects();
    }

    getGroups() {
        fetch('/student')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let options = [];
                // eslint-disable-next-line array-callback-return
                data.map(student => {
                    let temp = {value: student.id, label: student.first_name + ' ' + student.second_name};
                    options.push(temp);
                });
                this.setState({studentOptions: options});
            })
            .catch(console.log)
    }

    getSubjects() {
        fetch('/subject')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let options = [];
                // eslint-disable-next-line array-callback-return
                data.map(subject => {
                    let temp = {value: subject.id, label: subject.name};
                    options.push(temp);
                });
                this.setState({subjectOptions: options});
            })
            .catch(console.log)
    }

    createCourse() {
        let newRelations = {};
        newRelations.id_student = this.state.selectedStudent.value;
        newRelations.id_subject = this.state.selectedSubject.value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRelations)
        };
        this.setState({selectedStudent: '', selectedSubject: ''});
        fetch('/student_subject', requestOptions)
            .then(response => {
                toast.info("Subject has been added to student");
                console.log(response);
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createCourse();
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
                                                    <p className="h4 text-center py-4" style={{background: "#33adff", color: "white"}}>Add Subject To Student</p>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <label className="font-weight-normal">Student: </label>
                                                                        <Select  value={this.state.selectedStudent}
                                                                                 onChange={this.handleChangeSelectedStudent}
                                                                                 options={this.state.studentOptions}/>
                                                                        <MDBBtn className="btn-primary mt-3" type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label className="font-weight-normal">Subject: </label>
                                                                        <Select  value={this.state.selectedSubject}
                                                                                 onChange={this.handleChangeSelectedSubject}
                                                                                 options={this.state.subjectOptions}/>
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
