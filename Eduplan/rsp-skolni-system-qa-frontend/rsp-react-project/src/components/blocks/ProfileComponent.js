import React, {Component} from "react";
import SubjectTableComponent from "./SubjectTableComponent";
import {Link} from "react-router-dom";

export default class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileActive: 'nav-link active',
            subjectActive: 'nav-link in-active',
            actualView: true,
            canRender: false,
            person: null,
            path: props.path,
            id: props.id,
            profileArray: [],
            leftSide: [],
            rightSide: []
        }
    }

    componentDidMount() {
        fetch('/' + this.state.path + '/' + this.state.id)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (this.state.path === 'student') {
                    let subjects = [];
                    // eslint-disable-next-line array-callback-return
                    data.subjects.map(subject => {
                        subjects.push(subject.subject);
                    });
                    data.subjects = subjects;
                }
                this.setState({person: data});
            })
            .catch(console.log);
    }

    processObject() {
        if (this.state.person) {
            let size = 0;
            for (let [key, value] of Object.entries(this.state.person)) {
                if (!key.includes('id') && !key.includes('password')) {
                    key = key.replace('_', ' ');
                    key = key.charAt(0).toUpperCase() + key.slice(1);
                    if (this.isObject(value)) {
                        for (let [key1, value1] of Object.entries(value)) {
                            if (key1 === 'name') {
                                this.state.profileArray[key] = value1;
                                size += 1;
                                break;
                            }
                        }
                    } else {
                        this.state.profileArray[key] = value;
                        size += 1;
                    }
                }
            }

            let currentIndex = 0;
            for (let [key, value] of Object.entries(this.state.profileArray)) {
                currentIndex < size / 2 ? this.state.leftSide[key] = value : this.state.rightSide[key] = value;
                currentIndex += 1;
            }
        }
        this.state.canRender = true;
    }

    isObject(val) {
        return val instanceof Object;
    }

    generateSide(side) {
        return Object.keys(side).map(function (key) {
            return (
                <div className="tab-content profile-tab" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row">
                            <div className="col-md-5" style={{marginTop: "20px"}}>
                                <label className="text-left">{key}</label>
                            </div>
                            <div className="col-md-7" style={{marginTop: "20px"}}>
                                <p className="text-left">{side[key]}</p>
                            </div>
                        </div>
                    </div>
                </div>)
        });
    }

    showProfileInformation = () => this.setState(() => ({
        actualView: true,
        profileActive: 'nav-link active',
        subjectActive: 'nav-link in-active'
    }));
    showSubjects = () => this.setState(() => ({
        actualView: false,
        profileActive: 'nav-link in-active',
        subjectActive: 'nav-link active'
    }));

    render() {
        if (this.state.person) {
            this.processObject();
            if (this.state.canRender) {
                const columnTemp = ['Name', 'Code', 'Action'];
                const leftSideRendered = this.generateSide(this.state.leftSide);
                const rightSideRendered = this.generateSide(this.state.rightSide);
                return (
                    <div className="container emp-profile" key={this.state.person.id}>
                        <div>
                            <form method="post" style={{background: "rgb(242, 242, 242)"}}>
                                <div className="row" style={{margin: "0"}}>
                                    <div className="col-md-4" style={{marginTop: "90px", maxWidth: "25%"}}>
                                        <div className="profile-img">
                                            <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt=""/>
                                        </div>
                                        <div>
                                            <p className="text-center mt-1">{this.state.path}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6" style={{marginTop: "20px"}}>
                                        <div className="profile-head">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className={this.state.profileActive} onClick={this.showProfileInformation} data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">About</a>
                                                </li>
                                                {this.state.path !== 'admin' &&
                                                    <li className="nav-item">
                                                        <a className={this.state.subjectActive} onClick={this.showSubjects} data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">Subjects</a>
                                                    </li>
                                                }
                                                <div className="col-md-8">
                                                    <Link  to={"/editProfileInfo/" + this.state.path + "/" + this.state.person.id}>
                                                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" style={{width: "27%", float: "right"}}/>
                                                    </Link>
                                                </div>
                                            </ul>
                                            {this.state.actualView && <div className="row">
                                                <div className="col-md-6" style={{marginBottom: "20px"}}>
                                                    {leftSideRendered}
                                                </div>
                                                <div className="col-md-6" style={{marginBottom: "20px"}}>
                                                    {rightSideRendered}
                                                </div>
                                            </div>}
                                            {!this.state.actualView &&
                                            <SubjectTableComponent person={this.state.person} path={this.state.path} id={this.state.id} columns={columnTemp} subjects={this.state.person.subjects}></SubjectTableComponent>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }
        }
        return ("");
    }
}