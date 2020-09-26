import React, {Component} from 'react';

import '../../style/css/Login.css';
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput} from 'mdbreact';
import AuthService from "../../services/auth.service";
import Footer from "../blocks/Footer";
import HeaderParent from "../blocks/HeaderParent";
import {Container, Row} from "react-bootstrap";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            message: "",
            loading: false
        };
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handleLogin = e => {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.signin(this.state.login, this.state.password).then(
            () => {
                this.props.history.push("/main");
                window.location.reload();
            },
            error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    loading: false,
                    message: resMessage
                });
            });
    };

    render() {
        const { login, password } = this.state;
        return (
            <div className="loginPage">
                <HeaderParent/>
                <Container>
                    <Row>
                        <div className="limiter">
                            <div className="container-login100" style={{backgroundImage: "url('https://www.freeeducator.com/wp-content/uploads/2019/05/What-does-American-High-School-Mean-in-India1.png')"}}>
                                <div className="wrap-login100">
                                    <MDBContainer className="login100-form validate-form">
                                        <span className="login100-form-logo mb-4">
                                            <img src="https://image.flaticon.com/icons/svg/201/201614.svg" width="100" height="100" alt="brand"/>
                                        </span>
                                        <MDBRow>
                                            <MDBCol md="12">
                                                <form>
                                                    <p className="h3 white-text text-center mb-5 ">Sign in</p>
                                                    <div className="grey-text">
                                                        <MDBInput label="Type your username" labelClass="white-text" className="pl-2" name="login" value={login} onChange={this.onChange} group type="text" validate error="wrong"
                                                                  success="right" />
                                                        <MDBInput label="Type your password" labelClass="white-text" className="pl-2" name="password" value={password} onChange={this.onChange} group type="password" validate />
                                                    </div>
                                                    <div className="text-center">
                                                        <MDBBtn onClick={this.handleLogin}>Login</MDBBtn>
                                                    </div>
                                                    {this.state.message && (
                                                        <div className="alert alert-danger mt-5" role="alert">
                                                            {this.state.message}
                                                        </div>
                                                    )}
                                                </form>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
                <Footer/>
            </div>
        )
    }
}
