import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";

/**
 * Header for Login page
 */
export default class HeaderParent extends Component {
    render() {
        return (
            <div className="header" style={{background: "#33adff 55%"}}>
                <Navbar variant="dark">
                    <Navbar.Brand href="/">School System</Navbar.Brand>
                </Navbar>
            </div>
        )
    }
}
