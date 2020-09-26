import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import { Form} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';


export default class AddCourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            capacity: '',
            room_number: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createCourse(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        console.log(requestOptions);
        fetch('/room', requestOptions)
            .then(response => {
                toast.info("Room has been added");
                console.log(response);
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
                                                    <p className="h4 text-center py-4" style={{background: "#33adff", color: "white"}}>Create Room</p>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <MDBInput label="Room number" name = "room_number" value={this.state.room_number} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
                                                                        <MDBBtn style={{background: "#33adff", color: "white"}}type="submit" onClick={this.handleSubmit}>Create</MDBBtn>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <MDBInput label="Capacity" name = "capacity" value={this.state.capacity} onChange={this.handleChange} icon="user" group type="text" validate error="wrong" success="right"/>
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
