import React from "react";
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import moment from "moment";


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        }
        this.openNewForm = this.openNewForm.bind(this);
    }

    componentDidMount() {
        let todoList = JSON.parse(localStorage.getItem("listData"))
        if (todoList) {
            console.log(todoList)
            this.setState({
                todoList: todoList
            })
        }
    }


    showDetails(todo) {
        this.props.history.push({
            pathname: '/todoDetails',
            state: {
                data: todo
            }
        });  
    }

    openNewForm() {
        console.log("inside todo")
        this.props.history.push({
            pathname: '/newTodo',
        });  

    }

    render() {
        let now = moment(new Date)
        if (this.state.todoList) {
            return (
                <div className="container-fluid">
                    <header className="navbar">
                        <Button variant="primary" onClick={this.openNewForm}>Add Todo</Button>{' '}
                    </header>
                    <section>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Time Remaining</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.todoList.map((listItem) => {
                                        return (
                                            <tr onClick={() => this.showDetails(listItem)}>
                                                <td>{listItem['name']}</td>
                                                <td>{listItem['description']}</td>
                                                <td>{moment(listItem['startTime']).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                <td>{moment(listItem['endTime']).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                <td>{moment.duration(now.diff(listItem["endTime"])).humanize()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </section>
                </div>
            )
        } else {
            return (<div className = "container"> <p>No ToDo list to display</p></div>)
        }
    }

}

export default withRouter(List);