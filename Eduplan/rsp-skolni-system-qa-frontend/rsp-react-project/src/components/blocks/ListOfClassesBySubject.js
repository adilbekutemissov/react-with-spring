import React, { Component } from 'react';

import Footer from "./Footer";
import HeaderChild from "./HeaderChild";

/**
 * Page with list of timetable classes information for teacher
 */
export default class ListOfClassesBySubject extends Component {

    constructor(props) {
        super(props);
        this.state = {subject: '', personData: []}
    }

    componentDidMount() {
        this.findUserById(this.props.match.params.id);
    }

    findUserById = (userId) => {
        fetch("/teacher/" + userId)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if(data) {
                    this.setState({
                        personData: data,
                        subject: data.subjects[0].name
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    };

    render() {
        return (
            <div className="editProfilePage">
                <HeaderChild/>
                <div className="container emp-profile">
                    <div className="container" style={{width :"40%"}}>
                        <div style={{marginTop: "2%", textAlign: "center", fontWeight: "900"}}>
                            <h4>{this.state.subject}</h4>
                        </div>
                        <div className="my-3 p-3 rounded box-shadow" style={{width: "100%", backgroundColor: "rgba(242,242,242)"}}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Day/Time</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Class</h6>
                                </div>
                                <div style={{width: "23%", fontSize: "15px", color: "black", textAlign: "center"}}>
                                    <h6 className="border-bottom border-gray pb-2 mb-0">Class room</h6>
                                </div>
                            </div>
                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="row">
                                        <div style={{width: "25%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                            <label>{this.state.personData.events ? this.state.personData.events[0].time : ""}</label>
                                        </div>
                                        <div style={{width: "50%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                            <label>{this.state.personData.events ? this.state.personData.events[0].group.name : ""}</label>
                                        </div>

                                        <div style={{width: "24%", fontSize: "15px", color: "black", paddingTop: "7px", textAlign: "center"}}>
                                            <label>{this.state.personData.events ? this.state.personData.events[0].room.room_number : ""}</label>
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