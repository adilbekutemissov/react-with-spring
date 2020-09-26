import React, {Component} from 'react';
import "../../style/css/Main.css";
import Footer from "../blocks/Footer";
import HeaderChild from "../blocks/HeaderChild";
import ProfileComponent from "../blocks/ProfileComponent";
import AuthService from '../../services/auth.service'
import EventComponent from "../blocks/EventComponent";

/**
 * Main page
 */
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            rolesMapping : {
                "ROLE_TEACHER" : "teacher",
                "ROLE_STUDENT" : "student",
                "ROLE_ADMIN" : "admin"
            }
        };
    }

    render() {
        const { currentUser } = this.state;
        console.log(currentUser);
        return (
            <div className="mainPage">
                <HeaderChild path={this.state.rolesMapping[currentUser.roles[0]]}/>
                    <ProfileComponent path={this.state.rolesMapping[currentUser.roles[0]]} id={currentUser.id}></ProfileComponent>
                    <EventComponent groupId={this.state.rolesMapping[currentUser.roles[0]] === 'student' ? currentUser.id_group : null} teacherId={this.state.rolesMapping[currentUser.roles[0]] === 'teacher' ? currentUser.id : null}></EventComponent>
                <Footer/>
            </div>
        )
    }
}
