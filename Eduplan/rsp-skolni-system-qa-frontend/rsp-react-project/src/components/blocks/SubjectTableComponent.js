import React, {Component} from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import Select from 'react-select'
import {toast} from "react-toastify";

export default class SubjectTableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: props.person,
            path: props.path,
            id: props.id,
            subjects: props.subjects,
            columns: props.columns,
            selectedStudentEventsOptions: [],
            selectedEvent: '',
            selectedSubject: '',
            groups: [],
            groupShow: false,
            showAddMarkModal: false,
            showAddAbsenceModal: false,
            showStudentInformation: false,
            studentShow: false,
            selectedGroup: '',
            selectedStudents: '',
            selectedStudent: '',
            selectedMark: 1,
            weekDaysMapping : {
                1 : "Monday",
                2 : "Tuesday",
                3 : "Wednesday",
                4 : "Thursday",
                5 : "Friday"
            }
        };
        this.getGroupsBySubjectId = this.getGroupsBySubjectId.bind(this);
    }

    generateColumns() {
        let columns = this.state.columns;
        return columns.map(function (column) {
            return (<td className="text-center">{column}</td>);
        });
    }

    handleModalClose = () => this.setState({groupShow: false, studentShow: false, showStudentInformation: false});
    handleAddMarkOrAbsenceModalClose = () => this.setState({showAddMarkModal: false, showAddAbsenceModal: false});
    handleGroupShow = () => this.setState({groupShow: true});
    handleGroupClose = () => this.setState({groupShow: false});
    handleStudentShow = () => this.setState({studentShow: true});

    handleChangeMark = (selectedMark) => {
        this.setState({selectedMark});
    };

    handleChangeEvent = (selectedEvent) => {
        this.setState({selectedEvent});
    };

    handleAddMark = () => {
        let mark = {};
        mark.id_student = this.state.selectedStudent.id;
        mark.id_subject = this.state.selectedSubject.id;
        mark.mark = this.state.selectedMark.value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mark)
        };
        fetch('/mark', requestOptions)
            .then(response => console.log(response));

        let selectedGroup = {...this.state.selectedGroup};
        selectedGroup.students.map(student => {
            if (student.id == this.state.selectedStudent.id) {
                student.marks.push(mark);
            }
        });

        this.setState({selectedGroup: selectedGroup});
        this.generateStudentRecords();
        this.handleAddMarkOrAbsenceModalClose();
        toast.info("Mark has been added to student");
    };

    handleAddAbsence = () => {
        let absence = {};
        absence.id_event = this.state.selectedEvent.value;
        absence.id_student = this.state.selectedStudent.id;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(absence)
        };
        fetch('/absence', requestOptions)
            .then(response => console.log(response));


        absence.event = {};
        absence.event.id_subject = this.state.selectedSubject.id;

        let selectedGroup = {...this.state.selectedGroup};
        // eslint-disable-next-line array-callback-return
        selectedGroup.students.map(student => {
            if (student.id == this.state.selectedStudent.id) {
                student.absences.push(absence);
            }
        });

        this.setState({selectedGroup: selectedGroup});
        this.generateStudentRecords();
        this.handleAddMarkOrAbsenceModalClose();
        toast.info("Absence has been added to student");
    };

    getGroupsBySubjectId = (e) => {
        this.setState({selectedSubject: e.target.name});
        fetch('/' + this.state.path + '/' + this.state.id + '/groups/' + e.target.name)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({groups: data});
                this.handleGroupShow();
            })
            .catch(console.log);
    };

    getStudentByGroup = (e) => {
        const groupName = e.target.name;
        this.state.selectedGroup = this.state.groups.find(group => group.name === groupName);
        this.generateStudentRecords();
            this.handleGroupClose();
            this.handleStudentShow();
    };

    generateMarks(student) {
        let marks = '';
        // eslint-disable-next-line array-callback-return
        student.marks.map(mark => {
            if (this.state.selectedSubject.id) {
                if (mark.id_subject == this.state.selectedSubject.id) {
                    marks += mark.mark  + ', ';
                }
            }
            else if (mark.id_subject == this.state.selectedSubject) {
                marks += mark.mark  + ', ';
            }
        });

        marks = marks.slice(0, -2);
        return marks;
    }

    getCountOfAbsencesByStudent(student) {
        let count = 0;
        // eslint-disable-next-line array-callback-return
        student.absences.map(absence => {
            if (this.state.selectedSubject.id) {
                if (absence.event.id_subject == this.state.selectedSubject.id) {
                    count += 1;
                }
            }
            else if (absence.event.id_subject == this.state.selectedSubject) {
                count += 1;
            }
        });

        return count;
    }

    getEvents() {
        fetch('/event/group/' + this.state.selectedGroup.id + '/subject/' + this.state.selectedSubject)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let options = [];
                // eslint-disable-next-line array-callback-return
                data.map((event) => {
                    let temp = {value: event.id, label: this.state.weekDaysMapping[event.week_day] + ' ' + event.timeZone.zone}
                    options.push(temp);
                });

                this.setState({selectedStudentEventsOptions: options});
            })
            .catch(console.log);
    }

    addMark = (event) => {
        this.setState({showAddMarkModal: true});
        this.setDataToAddMarkAndAbsencesModals(event);
    };

    addAbsence = (event) => {
        this.setState({showAddAbsenceModal: true});
        this.getEvents();
        this.setDataToAddMarkAndAbsencesModals(event);
    };

    setDataToAddMarkAndAbsencesModals(event) {
        this.setState({selectedStudent: event});
        // eslint-disable-next-line array-callback-return
        this.setSubjectObject();
    }

    setSubjectObject() {
        // eslint-disable-next-line array-callback-return
        this.state.subjects.map(subject => {
            if (subject.id == this.state.selectedSubject) {
                this.setState({selectedSubject: subject});
            }
        });
    }

    generateStudentRecords = () => {
        this.setState({selectedStudents: this.state.selectedGroup.students.map(student => {
            return (
                <tr style={{maxHeight: "7%"}}>
                    <td className="text-center">{student.first_name + ' ' + student.second_name}</td>
                    <td className="text-center"><p>{this.generateMarks(student)}</p></td>
                    <td className="text-center"><p>{this.getCountOfAbsencesByStudent(student)}</p></td>
                    <td className="text-center">
                        <div>
                            <div className="col-md-6 hvr-shutter-in-vertical">
                                <a onClick={this.addMark.bind(this, student)}>Add Mark</a>
                            </div>
                            <div className="col-md-6 hvr-shutter-in-vertical">
                                <a onClick={this.addAbsence.bind(this, student)}>Add Absence</a>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })});
    };

    getSubjectInformation = (e) => {
        // eslint-disable-next-line array-callback-return
        this.state.subjects.map(subject => {
            if (subject.id == e.target.name) {
                this.setState({selectedSubject: subject});
            }
        });
        this.setState({showStudentInformation: true});
    };

    generateSubjectRecords() {
        let subjects = this.state.subjects;
        return subjects.map((element) => {
            return (
                <tr style={{maxHeight: "7%"}}>
                    <td className="text-center">{element.name}</td>
                    <td className="text-center">{element.code}</td>
                    {this.state.path === 'teacher' &&
                    <td className="text-center w-100 hvr-shutter-in-vertical"><a name={element.id} onClick={this.getGroupsBySubjectId}>Show Groups</a></td>}
                    {this.state.path === 'student' &&
                    <td className="text-center w-100 hvr-shutter-in-vertical"><a name={element.id} onClick={this.getSubjectInformation}>Details</a></td>
                    }
                </tr>)
        });
    }

    generateGroupRecords() {
        let groups = this.state.groups;
        return groups.map((element) => {
            return (
                <tr style={{maxHeight: "7%"}}>
                    <td className="text-center">{element.name}</td>
                    <td className="text-center">{element.students.length}</td>
                    <td className="text-center w-100 hvr-shutter-in-vertical"><a name={element.name} onClick={this.getStudentByGroup}>Show Students</a></td>
                </tr>)
        });
    }

    getAverageMarks = (personMarks) => {
        let sumMarks = 0;
        let count = 0;
        // eslint-disable-next-line array-callback-return
        personMarks.map(mark => {
            if (this.state.selectedSubject.id) {
                if (mark.id_subject == this.state.selectedSubject.id) {
                    sumMarks += mark.mark;
                    count += 1;
                }
            }
            else if (mark.id_subject == this.state.selectedSubject) {
                sumMarks += mark.mark;
                count += 1;
            }
        });

        return count !== 0 ? (sumMarks / count).toPrecision(3) : '';
    };

    render() {
        if (this.state.subjects && this.state.columns) {
            const subjectRecords = this.generateSubjectRecords();
            const subjectColumns = this.generateColumns();
            const groupRecords = this.generateGroupRecords();
            const options = [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
            ];
            return (
                this.state.subjects ?
                    <div>
                        <Table striped bordered hover size="sm" style={{margin: "2% 0 2% 0", color: "white", background: "#33adff"}}>
                            <thead>
                            <tr align="left">
                                {subjectColumns}
                            </tr>
                            </thead>
                            <tbody align="left" style={{background: "white", color: "black"}}>
                            {subjectRecords}
                            </tbody>
                        </Table>
                        <Modal size="lg" show={this.state.groupShow || this.state.studentShow} onHide={this.handleModalClose}>
                            <Modal.Header closeButton>
                                {this.state.groupShow && <Modal.Title>My groups</Modal.Title>}
                                {this.state.studentShow && <Modal.Title>Student of {this.state.selectedGroup.name}</Modal.Title>}
                            </Modal.Header>
                            <Modal.Body>
                                <Table striped bordered hover size="sm" style={{margin: "2% 0 2% 0", color: "white", background: "#33adff"}}>
                                    <thead>
                                    {this.state.groupShow &&
                                    <tr align="left">
                                        <td className="text-center">Name</td>
                                        <td className="text-center">Count of Students</td>
                                        <td className="text-center">Action</td>
                                    </tr>}
                                    {this.state.studentShow &&
                                    <tr align="left">
                                        <td className="text-center">Name</td>
                                        <td className="text-center">Marks</td>
                                        <td className="text-center">Absences</td>
                                        <td className="text-center">Action</td>
                                    </tr>}
                                    </thead>
                                    <tbody align="left" style={{background: "white", color: "black"}}>
                                    {this.state.groupShow && groupRecords}
                                    {this.state.studentShow && this.state.selectedStudents && this.state.selectedStudents}
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleModalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.showAddMarkModal || this.state.showAddAbsenceModal} onHide={this.handleAddMarkOrAbsenceModalClose}>
                            <Modal.Header closeButton>
                                {this.state.showAddMarkModal &&
                                    <Modal.Title>Add Mark</Modal.Title>
                                }
                                {this.state.showAddAbsenceModal &&
                                    <Modal.Title>Add Absence</Modal.Title>
                                }
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-12">
                                            <label className="font-weight-normal"><p className="font-weight-bold">Student:</p> {this.state.selectedStudent.first_name + ' ' + this.state.selectedStudent.second_name}</label>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="font-weight-normal"><p className="font-weight-bold">Subject:</p> {this.state.selectedSubject.name}</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        {this.state.showAddMarkModal &&
                                            <div>
                                                <label className="font-weight-bold">Select Mark to Add:</label>
                                                <Select  value={this.state.selectedMark}
                                                         onChange={this.handleChangeMark}
                                                         options={options}/>
                                            </div>
                                        }
                                        {this.state.showAddAbsenceModal &&
                                            <div>
                                                <label className="font-weight-bold">Select Event to Add Absence:</label>
                                                <Select  value={this.state.selectedEvent}
                                                         onChange={this.handleChangeEvent}
                                                         options={this.state.selectedStudentEventsOptions}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleAddMarkOrAbsenceModalClose}>
                                    Cancel
                                </Button>
                                {this.state.showAddMarkModal &&
                                    <Button variant="primary" onClick={this.handleAddMark}>Add Mark</Button>
                                }
                                {this.state.showAddAbsenceModal &&
                                    <Button variant="primary" onClick={this.handleAddAbsence}>Add Absence</Button>
                                }
                            </Modal.Footer>
                        </Modal>
                        {this.state.path === 'student' &&
                        <Modal show={this.state.showStudentInformation} onHide={this.handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-md-12">
                                            <label className="font-weight-normal"><p className="font-weight-bold">Subject:</p>{this.state.selectedSubject.name}</label>
                                            <label className="font-weight-normal mt-3"><p className="font-weight-bold">Marks:</p></label>
                                            <p>{this.generateMarks(this.state.person)}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="col-md-12">
                                            <label className="font-weight-normal"><p className="font-weight-bold">Number of Absences: </p></label>
                                            <p>{this.getCountOfAbsencesByStudent(this.state.person)}</p>
                                            <label className="font-weight-normal mt-3"><p className="font-weight-bold">Average Mark: </p></label>
                                            <p>{this.getAverageMarks(this.state.person.marks)}</p>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleModalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        }
                    </div>
                     : ""
            );
        } else {
            return ("");
        }
    }
}