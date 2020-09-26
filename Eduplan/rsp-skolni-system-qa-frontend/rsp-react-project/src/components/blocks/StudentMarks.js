import React, {Component} from 'react';
import Footer from "../blocks/Footer";
import HeaderChild from "../blocks/HeaderChild";
import {Table} from "react-bootstrap";

/**
 * Main page
 */
export default class StudentMarks extends Component {

    state = {
        marksData: []
    };

    /**
     * Get data from request
     * @author Jankuv Patrik
     * @date 2020-04-20
     */
    componentDidMount() {
        fetch("/mark/" + this.props.match.params.id)
            .then(response => response.json())
            .then((data) => {
                if(data) {
                    this.setState({
                        marksData: data
                    });
                    console.log(data);
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    }

    calcAverage() {
        let sum = 0;
        let count = 0;
        sum += this.state.marksData.mark;
        count++;
        return (sum / count).toFixed(2);
    }

    getSubjectId(){
        return this.props.match.params.id;
    }

    render() {

        return (
            <div className="studentMarks">
                <HeaderChild/>
                <div className="container emp-profile">
                    <form method="post" style={{background: "rgb(242, 242, 242)"}}>
                        <div className="row" style={{margin: "0"}}>
                            <div className="col-md-4" style={{marginTop: "150px", maxWidth: "20%"}}>

                            </div>
                            <div className="col-md-6" style={{marginTop: "20px"}}>
                                <div className="profile-head">
                                    <div className="row" style={{margin: "0px"}}>
                                        <div className="col-md-8" style={{paddingLeft: "0"}}>
                                            <h5>Study results</h5>
                                            <h6>{this.getSubjectId()}</h6></div>
                                    </div>
                                    <Table style={{marginTop: "20px"}}>
                                        <thead>
                                        <tr>
                                            <th width={5}> </th>
                                            <th>Mark</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> </td>
                                                <td>{this.state.marksData.mark}</td>
                                            </tr>
                                        <tr>
                                            <td><b>Average</b></td>
                                            <td>{this.calcAverage()}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>

                <Footer/>
            </div>
        )
    }
}
