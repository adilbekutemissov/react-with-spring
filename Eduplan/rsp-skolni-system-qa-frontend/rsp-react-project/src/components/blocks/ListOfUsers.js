import React, { Component } from 'react';

import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Button, Modal, ButtonGroup} from "react-bootstrap";
import {toast} from "react-toastify";

/**
 * Page with list of students by classes for admin
 */
export default class ListOfUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userType: props.match.params.user,
            records: [],
            selectedTeacher: null,
            showModal: false,
            showAgreeModal: false,
            personToDelete: ''
        }
    }

    handleModalClose = () => {this.setState({showModal: false, showAgreeModal: false})};

    componentDidMount() {
        this.findAllUser();
    }

    findAllUser = () => {
        fetch("/" + this.state.userType)
            .then(response => response.json())
            .then((data) => {
                if(data) {
                    this.setState({records: data});
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

    showAgreeModal = (event) => {
        this.setState({personToDelete: event.target.name, showAgreeModal: true});
    };

    deletePerson = () => {
        fetch("/" + this.state.userType + "/" + this.state.personToDelete, {
            method: 'DELETE',
        }).then(response => {
                this.findAllUser();
                this.setState({showAgreeModal: false, personToDelete: ''});
                toast.info("Person has been deleted");
                console.log(response)});
    };

    getTeacherInfo = (event) => {
        let teacher;
        // eslint-disable-next-line array-callback-return
        this.state.records.map(teacherMap => {
            if (teacherMap.id == event.target.name) {
                teacher = teacherMap;
            }
        });

        if (teacher) {
            this.setTeacher(teacher).then(() => {
                this.setState({showModal: true});
            });
        }
    };

    async setTeacher(teacher) {
        await this.setState({selectedTeacher: teacher});
    }

    render() {
        return (
            <div className="editProfilePage">
                <HeaderChild/>
                <label className="text-center mt-5 font-weight-normal" style={{fontSize: "40px"}}>{'' + this.state.userType === 'student' ? 'Students' : 'Teachers'}</label>
                <div className="container emp-profile">
                    <div className="container" style={{width :"70%"}}>
                        <div className="my-3 p-3 rounded box-shadow" style={{width: "100%", backgroundColor: "rgba(242,242,242)"}}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div style={{width: this.state.userType === 'student' ? "16.6%" : "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Name</h6>
                                </div>
                                <div style={{width: this.state.userType === 'student' ? "16.6%" : "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Email</h6>
                                </div>
                                <div style={{width: this.state.userType === 'student' ? "16.6%" : "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Login</h6>
                                </div>
                                <div style={{width: this.state.userType === 'student' ? "16.6%" : "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Phone</h6>
                                </div>
                                {this.state.userType === 'student' &&
                                    <div style={{width: "16.6%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                        <h6 className="border-bottom border-gray pb-2 mb-0">Group</h6>
                                    </div>
                                }
                                <div style={{width: this.state.userType === 'student' ? "16.6%" :"23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Edit</h6>
                                </div>
                            </div>
                            {this.state.records.map((person) => (
                                <div className="container" style={{width :"100%"}} key={person.id}>
                                    <div className="media text-muted pt-3">
                                        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                            <div className="row">
                                                <div style={{width: this.state.userType === 'student' ? "16.5%" : "20%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                    <label>{person.first_name + " " + person.second_name}</label>
                                                </div>
                                                <div style={{width: this.state.userType === 'student' ? "16.5%" :"21%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                    <label>{person.email}</label>
                                                </div>
                                                <div style={{width: this.state.userType === 'student' ? "17.5%" :"18%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                    <label>{person.login}</label>
                                                </div>
                                                <div style={{width: this.state.userType === 'student' ? "16%" : "22.5%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                    <label className="text-center">{person.phone}</label>
                                                </div>
                                                {this.state.userType === 'student' &&
                                                    <div style={{width: "17.2%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                        <label className="text-center">{person.group.name}</label>
                                                    </div>
                                                }
                                                <div className="row" style={{width: this.state.userType === 'student' ? "18.5%" : "17.5%"}}>
                                                    <div className="col-md-5"></div>
                                                    <div className="col-md-5">
                                                        <div className="row mt-2">
                                                            {this.state.userType !== 'student' &&
                                                                <a className="mr-3 fa fa-eye" name={person.id} onClick={this.getTeacherInfo}></a>
                                                            }
                                                            <a className="mr-3 fa fa-edit" href={"/editUsersInfo/" + this.state.userType + "/" + person.id}></a>
                                                            <a className="mr-3 fa fa-trash" name={person.id} href="#" onClick={this.showAgreeModal}></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Teacher Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <label className="font-weight-normal"><p className="font-weight-bold">First Name: </p>{this.state.selectedTeacher && this.state.selectedTeacher.first_name}</label>
                                    <label className="font-weight-normal"><p className="font-weight-bold">Second Name: </p>{this.state.selectedTeacher && this.state.selectedTeacher.second_name}</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <label className="font-weight-normal"><p className="font-weight-bold">Subjects: </p></label>
                                    {this.state.selectedTeacher && this.state.selectedTeacher.subjects.map(subject => (
                                        <div>
                                            <p>{subject.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showAgreeModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="ml-2">Do you really want delete this record?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <div className="row" style={{width: "100%"}}>
                            <div className="col-md-2">
                                <Button className="pull-left text-left" variant="success" onClick={this.handleModalClose}>
                                    No
                                </Button>
                            </div>
                            <div className="col-md-8">

                            </div>
                            <div className="col-md-2">
                                <Button className="float-right" variant="danger" onClick={this.deletePerson}>
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}