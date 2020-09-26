import React, { Component } from 'react';

import Footer from "./Footer";
import HeaderChild from "./HeaderChild";
import {Form, Button} from 'react-bootstrap';

/**
 * Edit Profile page for users
 */
export default class EditProfileInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            second_name: '',
            login: '',
            phone: '',
            email: '',
            password: '',
            birthday: '',
            user: props.match.params.user,
            userId: props.match.params.id,
        }
    }

    componentDidMount() {
        this.findUserById();
    }

    findUserById = () => {
        fetch("/" + this.state.user + "/" + this.state.userId)
            .then(response => response.json())
            .then((data) => {
                if(data) {
                    this.setState({
                        first_name: data.first_name,
                        second_name: data.second_name,
                        phone: data.phone,
                        email: data.email,
                        login: data.login,
                        birthday: data.birthday,
                        year: data.year,
                        id_group: data.id_group
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = event => {
        event.preventDefault();
        const url = "/"+ this.props.match.params.user + "/" + this.props.match.params.id;

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(data => this.setState({data}))
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', this.state))
            .then(ok => alert("Success"));
    };

    render() {
        return (
            <div className="editProfilePage">
                <HeaderChild/>
                <div className="emp-profile">
                    <div className="container" >
                        <div className="my-3 p-3 rounded box-shadow">
                            <div className="col">
                                <div className="row">
                                    <div className="col mb-3">
                                        <div className="card">
                                            <div className="card-body" style={{background: "rgb(242, 242, 242)"}}>
                                                <div className="e-profile">
                                                    <label className="font-weight-normal" style={{fontSize: "40px"}}>Edit Profile</label>
                                                    <div className="tab-content pt-3">
                                                        <Form onSubmit={this.handleSubmit}>
                                                            <div className="tab-pane active">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-6 mb-3">
                                                                        <Form.Group>
                                                                            <Form.Label>First Name</Form.Label>
                                                                            <Form.Control type="text" name="first_name" placeholder={this.state.first_name} value={this.state.first_name} onChange={this.handleChange}/>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label>Second Name</Form.Label>
                                                                            <Form.Control type="text" name="second_name" placeholder={this.state.second_name} value={this.state.second_name} onChange={this.handleChange}/>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label>Email</Form.Label>
                                                                            <Form.Control type="email"  name="email" placeholder={this.state.email} value={this.state.email} onChange={this.handleChange}/>
                                                                        </Form.Group>
                                                                        <Button className="btn btn-primary" type="submit" style={{marginTop: "25px"}}>Save Changes</Button>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6 mb-3">
                                                                        <Form.Group>
                                                                            <Form.Label>Phone</Form.Label>
                                                                            <Form.Control  type="text" name="phone" placeholder={this.state.phone} value={this.state.phone} onChange={this.handleChange}/>
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label>Login</Form.Label>
                                                                            <Form.Control  type="text" name="login" placeholder={this.state.login} value={this.state.login} onChange={this.handleChange}/>
                                                                        </Form.Group>
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
        )
    }
}