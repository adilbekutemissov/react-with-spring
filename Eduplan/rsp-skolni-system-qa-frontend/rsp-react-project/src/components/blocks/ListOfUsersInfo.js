import React, { Component } from 'react';

import Footer from "./Footer";
import HeaderChild from "./HeaderChild";

import {Link} from "react-router-dom";

/**
 * Page with list of teachers information for admin
 */
export default class ListOfUsersInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {typeUser: '', personData: []}
    }

    componentDidMount() {
        this.findUserById(this.props.match.params.user);
    }

    findUserById = (user) => {
        fetch("/" + user)
            .then(response => response.json())
            .then((data) => {
                if(data) {
                    console.log(data);
                    this.setState({
                        personData: data,
                        typeUser: user
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

    deletePerson = (userId) => {
        fetch("/" + this.props.match.params.user + "/" + userId, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(ok => alert("Success"));
    };

    render() {
        return (
            <div className="editProfilePage">
                <HeaderChild/>
                <div className="container emp-profile">
                    <div className="container" style={{width :"70%"}}>
                        <div style={{marginTop: "2%", textAlign: "center", fontWeight: "900"}}>
                            <h4>{this.state.typeUser}</h4>
                        </div>
                        <div className="my-3 p-3 rounded box-shadow" style={{width: "100%", backgroundColor: "rgba(242,242,242)"}}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Name</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Email</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Login</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Phone</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">{this.state.typeUser==="teacher" ? "Subject" : "Class"}</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Edit</h6>
                                </div>
                            </div>
                            {this.state.personData.map((person) => (
                                <div className="media text-muted pt-3" key={person.id}>
                                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                        <div className="row">
                                            <div style={{width: "20%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                <label>{person.first_name + " " + person.second_name}</label>
                                            </div>
                                            <div style={{width: "11%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                <label>{person.email}</label>
                                            </div>
                                            <div style={{width: "22%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                <label>{person.login}</label>
                                            </div>
                                            <div style={{width: "10%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                <label>{person.phone}</label>
                                            </div>
                                            <div style={{width: "22%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                                <label>{this.state.typeUser==="teacher" ? person.subjects[0].name : person.group.name}</label>
                                            </div>
                                            <div className="row" style={{textAlign: "center"}}>
                                                <Link to={"/editUsersInfo/" + this.state.typeUser + "/"+ person.id}><i className="fa fa-edit"/></Link>
                                                <Link to={"/listOfUsersInfo/" + this.state.typeUser} onClick={this.deletePerson.bind(this,person.id)}><i className="fa fa-trash"/></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}