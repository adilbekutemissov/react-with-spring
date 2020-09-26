import {Table} from "react-bootstrap";
import React, {Component} from "react";
import { CircleToBlockLoading } from 'react-loadingg';
import { ToastContainer, toast } from 'react-toastify';

export default class EventComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateView: props.teacherId || props.groupId,
            teacherId: props.teacherId,
            groupId: props.groupId,
            adminId: props.adminId,
            hasRendered: false,
            selectedWeekDay: 1,
            times: [],
            rooms : [],
            events: [],
            teachers: [],
            groups: [],
            teachersMapToCells: [],
            groupsMapToCells: [],
            subjectsMapToCells: [],
            teachersMapToCellsView: [],
            groupsMapToCellsView: [],
            subjectsMapToCellsView: [],
            selectedTeacher: '',
            selectedGroup: '',
            selectedSubject: '',
            teacherOptions: [],
            groupOptions: [],
            subjectOptions: [],
            groupsByCellOptions: [],
            subjectByCellOptions: [],
            enabledGroups: {},
            enabledSubjects: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.enabledGroupSelect = this.enabledGroupSelect.bind(this);
    }

    enabledGroupSelect = () => {
        this.setState({enabledGroup: false});
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.createTeacher();
        event.preventDefault();
    }

    componentDidMount() {
        this.getEvents();
    }

    initTableValues() {
        let teachersMapToCells = [];
        let subjectsMapToCells = [];
        let groupsMapToCells = [];
        let teachersMapToCellsView = [];
        let subjectsMapToCellsView = [];
        let groupsMapToCellsView = [];
        let subjectByCellOptions = [];

        if (this.state.events) {
            // eslint-disable-next-line array-callback-return
            this.state.events.map(event => {
                this.state.teachers.forEach(teacher => {
                    if (teacher.id === event.id_teacher) {
                        subjectByCellOptions[event.id_room + '||' + event.id_time_zone] = this.getSubjectOptions(teacher.subjects);
                    }
                });

                teachersMapToCells[event.id_room + '||' + event.id_time_zone] = event.id_teacher;
                subjectsMapToCells[event.id_room + '||' + event.id_time_zone] = event.id_subject;
                groupsMapToCells[event.id_room + '||' + event.id_time_zone] = event.id_group;
                teachersMapToCellsView[event.id_room + '||' + event.id_time_zone] = event.teacher.first_name + ' ' + event.teacher.second_name;
                subjectsMapToCellsView[event.id_room + '||' + event.id_time_zone] = event.subject.name;
                groupsMapToCellsView[event.id_room + '||' + event.id_time_zone] = event.group.name;
            });
        }

        let enabledSubjects = {};
        for (let room of this.state.rooms) {
            for (let time of this.state.times) {
                if (!teachersMapToCells[room.id + '||' + time.id]) {
                    enabledSubjects[room.id + '||' + time.id] = true;
                }
            }
        }


        this.setState({
            subjectByCellOptions: subjectByCellOptions,
            teachersMapToCells: teachersMapToCells,
            subjectsMapToCells: subjectsMapToCells,
            groupsMapToCells: groupsMapToCells,
            teachersMapToCellsView: teachersMapToCellsView,
            subjectsMapToCellsView: subjectsMapToCellsView,
            groupsMapToCellsView: groupsMapToCellsView,
            enabledSubjects: enabledSubjects,
            hasRendered: true
        });

        console.log(this.state);

    }

    getRooms() {
        fetch('/room')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // eslint-disable-next-line array-callback-return
                this.setState({rooms: data});
            })
            .then(() => {
            this.getGroups();
            })
            .catch(console.log);
    }

    getGroups() {
        fetch('/group')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({groups: data})
            })
            .then(() => {
                this.getTimeZones();
            })
            .catch(console.log);
    }

    getTimeZones() {
        fetch('/time_zone')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({times: data});
                this.initTableValues();
            })
            .catch(console.log);
    }

    getEvents() {
        fetch('/event/day/' +  this.state.selectedWeekDay)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let events = [];
                if (this.state.teacherId) {
                    // eslint-disable-next-line array-callback-return
                    data.map(event => {
                        if (event.id_teacher === this.state.teacherId) {
                            events.push(event);
                        }
                    });
                } else if (this.state.groupId) {
                    // eslint-disable-next-line array-callback-return
                    data.map(event => {
                        if (event.id_group === this.state.groupId) {
                            events.push(event);
                        }
                    });
                } else {
                    events = data;
                }
                this.setState({events: events});
            })
            .then(() => {
                this.getTeachers();
            })
            .catch(console.log);
    }

    getTeachers() {
        fetch('/teacher')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({teachers: data});
            }).then(() => {
                this.getRooms();
            })
            .catch(console.log)
    }

    createEvents(events){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(events)
        };
        fetch('/event/events/' + this.state.selectedWeekDay, requestOptions)
            .then(response => console.log(response));
    }

    generateRows() {
        return this.state.rooms.map((room) => {
            return (
                <tr style={{maxHeight: "7%"}}>
                    <td style={{color: "white", background: "#33adff"}} className="align-middle text-center">{room.room_number}</td>
                    {this.state.times.map((time) => {
                        return (this.generateCell(room, time));
                    })}
                </tr>
            );
        });
    }

    getTeacherOptions() {
        return this.state.teachers.map((teacher) => {
            return (<option value={teacher.id}>{teacher.first_name + ' ' + teacher.second_name}</option>);
        });
    }

    getGroupOptions() {
        return this.state.groups.map((group) => {
            return (<option value={group.id}>{group.name}</option> )
        })
    }

    selectTeacher = (select) => {
        let teachersMapToCells = {...this.state.teachersMapToCells};
        let enabledSubjects = {...this.state.enabledSubjects};
        let subjectByCellOptions = {...this.state.subjectByCellOptions};
        enabledSubjects[select.target.name] = false;
        this.state.teachers.forEach(teacher => {
            if (teacher.id == select.target.value) {
                teachersMapToCells[select.target.name] = teacher.id;
                subjectByCellOptions[select.target.name] = this.getSubjectOptions(teacher.subjects);
            }
        });

        this.setState({subjectByCellOptions: subjectByCellOptions, teachersMapToCells: teachersMapToCells, enabledSubjects: enabledSubjects});
    };

    selectGroup = (select) => {
        let groupsMapToCells = {...this.state.groupsMapToCells};
        this.state.groups.forEach(group => {
            if (group.id == select.target.value) {
                groupsMapToCells[select.target.name] = group.id;
            }
        });
        this.setState({groupsMapToCells: groupsMapToCells});
    };

    selectSubject = (select) => {
        let subjectsMapToCells = {...this.state.subjectsMapToCells};
        subjectsMapToCells[select.target.name] = select.target.value;
        this.setState({subjectsMapToCells: subjectsMapToCells});
    };

    getSubjectOptions(subjects) {
        // eslint-disable-next-line array-callback-return
        return subjects.map((subject) => {
            return (<option name={subject.name} value={subject.id}>{subject.name}</option>)
        });
    };

    handleSave = () => {
        let eventsToCreate = this.createEventsToCreate();
        toast.info("Changes saved");
        this.createEvents(eventsToCreate);
    };

    createEventsToCreate() {
        let eventsToCreate = [];
        Object.keys(this.state.teachersMapToCells).forEach(key => {
            let event = {};
            if (this.state.groupsMapToCells[key] && this.state.subjectsMapToCells[key] && this.state.subjectsMapToCells[key]) {
                let keys = key.split('||');
                event.id_group = this.state.groupsMapToCells[key];
                event.id_subject = this.state.subjectsMapToCells[key];
                event.id_teacher = this.state.teachersMapToCells[key];
                event.id_room = keys[0];
                event.id_time_zone = keys[1];
                event.week_day = this.state.selectedWeekDay;
                eventsToCreate.push(event);
            }
        });

        return eventsToCreate;
    }

    generateCell(room, time) {
        const teacher = this.state.teachersMapToCells[room.id + '||' + time.id] ? this.state.teachersMapToCells[room.id + '||' + time.id] : 0;
        const group = this.state.groupsMapToCells[room.id + '||' + time.id] ? this.state.groupsMapToCells[room.id + '||' + time.id] : 0;
        const subject = this.state.subjectsMapToCells[room.id + '||' + time.id] ? this.state.subjectsMapToCells[room.id + '||' + time.id] : 0;
        if (this.state.teachers) {
            const teacherOptions = this.getTeacherOptions();
            const groupOptions = this.getGroupOptions();
            return (
                <td style={{ background: this.state.teachersMapToCells[room.id + '||' + time.id] ? '#ABD1F6': ''}}>
                    {this.state.stateView &&
                        <div className="row">
                            <div className="col-md-12 text-center">
                                {this.state.groupId &&
                                    <label><span className="font-weight-bolder">Teacher: </span><span className="font-weight-bold">{this.state.teachersMapToCellsView[room.id + '||' + time.id]}</span></label>
                                }
                                {this.state.teacherId &&
                                    <label><span className="font-weight-bolder">Group: </span><span className="font-weight-bold">{this.state.groupsMapToCellsView[room.id + '||' + time.id]}</span></label>
                                }
                                <label><span className="font-weight-bolder">Subject: </span><span className="font-weight-bold">{this.state.subjectsMapToCellsView[room.id + '||' + time.id]}</span></label>
                            </div>
                        </div>}
                    {!this.state.stateView &&
                        <div className="row">
                            <div className="col-md-12">
                                <label>Teacher</label>
                                <select className={"form-control"} name={room.id + "||" + time.id} value={teacher} id="lang" onChange={this.selectTeacher}>
                                    <option disabled selected value={0}> -- Select a teacher -- </option>
                                    {teacherOptions}
                                </select>
                            </div>
                            <div className="col-sm-12">
                                <label>Group</label>
                                <select className={"form-control"} name={room.id + '||' + time.id} value={group} id="lang" onChange={this.selectGroup}>
                                    <option disabled selected value={0}> -- Select a group --</option>
                                    {groupOptions}
                                </select>
                            </div>
                            <div className="col-sm-12">
                                <label>Subject</label>
                                <select className={"form-control"} disabled={this.state.enabledSubjects[room.id + '||' + time.id] || teacher === 0} value={subject} name={room.id + '||' + time.id} id="lang" onChange={this.selectSubject}>
                                    <option disabled selected value={0}> -- Select a Subject --</option>
                                    {this.state.subjectByCellOptions && this.state.subjectByCellOptions[room.id + "||" + time.id]}
                                </select>
                            </div>
                        </div>
                    }
                </td>
            )
        }
    }

    generateColumns() {
        return this.state.times.map(time => {
            return (<td className="text-center">{time.zone}</td>)
        })
    };

    async updateSelectedWeekDay(day) {
        await this.setState({hasRendered: false, selectedWeekDay: day})
    }

    changeSelectedDay = (event) => {
        this.updateSelectedWeekDay(event.target.name).then(() => {
            this.getEvents();
        });

    };

    render() {
        const columns = this.generateColumns();
        const rows = this.generateRows();
        return (
            <div>
                {!this.state.hasRendered &&
                <div className="text-center loading-custom-style">
                    <CircleToBlockLoading style={{marginTop: "9%", marginLeft: "47.5%" }}/>
                </div>
                }
                    {this.state.hasRendered &&
                    <div>
                        <div className="row">
                            <div className="col-md-5" style={{zIndex: 2}}>
                                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav row" tabIndex="1">
                                            <li className="nav-item col-md-2 mr-3">
                                                <a className={"nav-link nav-item-custom-style hvr-float-shadow span-event" + (parseInt(this.state.selectedWeekDay) === 1 ? " nav-active font-weight-bold" : "")} name="1" onClick={this.changeSelectedDay}>
                                                    Monday
                                                </a>
                                            </li>
                                            <li className="nav-item col-md-2 mr-3">
                                                <a className={"nav-link nav-item-custom-style hvr-float-shadow span-event" + (parseInt(this.state.selectedWeekDay) === 2 ? " nav-active font-weight-bold" : "")} name="2" onClick={this.changeSelectedDay}>
                                                    Tuesday
                                                </a>
                                            </li>
                                            <li className="nav-item col-md-2 mr-3">
                                                <a className={"nav-link nav-item-custom-style hvr-float-shadow span-event" + (parseInt(this.state.selectedWeekDay) === 3 ? " nav-active font-weight-bold" : "")} name="3" onClick={this.changeSelectedDay}>
                                                    Wednesday
                                                </a>
                                            </li>
                                            <li className="nav-item col-md-2  mr-3">
                                                <a className={"nav-link nav-item-custom-style hvr-float-shadow span-event" + (parseInt(this.state.selectedWeekDay) === 4 ? " nav-active font-weight-bold" : "")} name="4" onClick={this.changeSelectedDay}>
                                                    Thursday
                                                </a>
                                            </li>
                                            <li className={"nav-item col-md-2  mr-3" + (parseInt(this.state.selectedWeekDay) === 5 ? " nav-active" : "")}>
                                                <a className={"nav-link nav-item-custom-style hvr-float-shadow span-event" + (parseInt(this.state.selectedWeekDay) === 5 ? " nav-active font-weight-bold" : "")} name="5" onClick={this.changeSelectedDay}>
                                                    Friday
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-md-5"  style={{zIndex: 1}}>
                                <img className="horse-style" tabIndex="2"
                                     src="https://media.tenor.com/images/60aebe63babde473b27c2c71e75af197/tenor.gif" alt="Running Horse"></img>
                            </div>
                            <div className="col-md-2 mb-0"  style={{zIndex: 2}}>
                                {!this.state.stateView &&
                                <div className="button-table-custom float-lg-right">
                                    <a className={"nav-item-custom-style nav-link mt-3 mr-4 hvr-float-shadow span-event"} onClick={this.handleSave}>
                                        Save
                                    </a>
                                </div>
                                }
                            </div>
                        </div>
                        <Table className="table-custom" striped bordered hover size="sm"
                               style={{color: "white", background: "#33adff"}}>
                            <thead>
                            <tr>
                                <td className="text-center">
                                    Room/time
                                </td>
                                {columns}
                            </tr>
                            </thead>
                            <tbody align="left" style={{background: "white", color: "black"}}>
                            {rows}
                            </tbody>
                        </Table>
                    </div>
                    }
            </div>
        );
    }
}