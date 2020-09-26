import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import AuthService from "../../services/auth.service";

/**
 * Header for other page without login page
 */
export default class HeaderParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    logout() {
        AuthService.logout();
        window.location.href = '/';
    }

    render() {
        return (
            <div className="header">
                <Navbar variant="dark">
                    <Navbar.Brand href="/main">
                        <img src="https://image.flaticon.com/icons/svg/201/201614.svg" width="29" height="29" alt="brand"/> School System
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        {this.state.currentUser.roles[0] === "ROLE_ADMIN" ?
                            <Nav>
                                <NavDropdown title="Teachers" id="nav-dropdown">
                                    <NavDropdown.Item href="/listOfUsers/teacher" eventKey="4.3">Teachers list</NavDropdown.Item>
                                    <NavDropdown.Item href="/addTeacher" eventKey="4.3">Add new teacher</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Students" id="nav-dropdown">
                                    <NavDropdown.Item href="/listOfUsers/student" eventKey="4.3">Student list</NavDropdown.Item>
                                    <NavDropdown.Item href="/addStudent" eventKey="4.3">Add new student</NavDropdown.Item>
                                    <NavDropdown.Item href="/addGroup" eventKey="4.3">Add new group</NavDropdown.Item>
                                    <NavDropdown.Item href="/addStudentSubject" eventKey="4.3">Add subject for student</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Course/Room" id="nav-dropdown">
                                    <NavDropdown.Item href="/addCourse" eventKey="4.3">Add new course</NavDropdown.Item>
                                    <NavDropdown.Item href="/addRoom" eventKey="4.3">Add room</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            : ""}
                    </Nav>
                    <Nav>
                        <button onClick={this.logout} className="mr-3 text-white hvr-icon-wobble-horizontal">
                            <span className="mr-2">Logout</span>
                            <i className="fa fa-sign-out hvr-icon"></i>
                        </button>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}
