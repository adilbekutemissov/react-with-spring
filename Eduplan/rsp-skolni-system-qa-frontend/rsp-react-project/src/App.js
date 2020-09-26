import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from './components/pages/Main';
import Login from './components/pages/Login';
import ListOfUsers from './components/blocks/ListOfUsers';
import StudentMarks from "./components/blocks/StudentMarks";
import EditUsersInfo from './components/blocks/EditUsersInfo';
import EditProfileInfo from './components/blocks/EditProfileInfo';
import ListOfUsersInfo from './components/blocks/ListOfUsersInfo';
import AddRoomComponent from "./components/blocks/AddRoomComponent";
import AddEventComponent from "./components/blocks/AddEventComponent";
import AddGroupComponent from "./components/blocks/AddGroupComponent";
import AddCourseComponent from "./components/blocks/AddCourseComponent";
import AddStudentComponent from "./components/blocks/AddStudentComponent";
import AddTeacherComponent from "./components/blocks/AddTeacherComponent";
import ListOfClassesBySubject from "./components/blocks/ListOfClassesBySubject";
import AddStudentSubjectComponent from "./components/blocks/AddStudentSubjectComponent";
import {ToastContainer} from "react-toastify";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <ToastContainer position="top-center"/>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/main" exact component={Main}/>
                        <Route path="/addRoom" extact component={AddRoomComponent}/>
                        <Route path="/addEvent" extact component={AddEventComponent}/>
                        <Route path="/addGroup" extact component={AddGroupComponent}/>
                        <Route path="/addCourse" extact component={AddCourseComponent}/>
                        <Route path="/studentMarks/:id" extact component={StudentMarks}/>
                        <Route path="/listOfUsers/:user" extact component={ListOfUsers}/>
                        <Route path="/addStudent" extact component={AddStudentComponent}/>
                        <Route path="/addTeacher" extact component={AddTeacherComponent}/>
                        <Route path="/listOfUsersInfo/:user" extact component={ListOfUsersInfo}/>
                        <Route path="/editUsersInfo/:user/:id" extact component={EditUsersInfo}/>
                        <Route path="/editProfileInfo/:user/:id" extact component={EditProfileInfo}/>
                        <Route path="/addStudentSubject" extact component={AddStudentSubjectComponent}/>
                        <Route path="/listOfClassesBySubject/:teacher/:id" extact component={ListOfClassesBySubject}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
