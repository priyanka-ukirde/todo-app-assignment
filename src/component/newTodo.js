import React from "react";
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';


export default class TodoForm extends React.Component {

    constructor() {
        super()
        this.state = {
            startTime: new Date(),
            endTime: new Date(),
            name: '',
            description: '',
            todoAdded: false,
            successMessage: ''
        }

        this.onChangestartTime = this.onChangestartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.nameChange = this.nameChange.bind(this)
        this.descriptionChange = this.descriptionChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
    }

    onChangestartTime(startTime) {
        this.setState({
            startTime
        })

    }
    onChangeEndTime(endTime) {
        this.setState({
            endTime
        })
    }


    nameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    descriptionChange(e) {
        this.setState({
            description: e.target.value
        })
    }

    addTodo(e) {
        e.preventDefault();
        console.log(this.state)
        let todoList = JSON.parse(localStorage.getItem("listData"))
        if (todoList) {
            todoList.push(this.state)
            localStorage.setItem("listData", JSON.stringify(todoList))
        } else {
            localStorage.setItem("listData", JSON.stringify([this.state]))
        }
        this.setState({ todoAdded: true, successMessage: "ToDo Added Successfully"})
        
    }


    render() {
        console.log(this.state)
        return (
            <div className="container-fluid">
                {(!this.state.todoAdded)
                    ? <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter Name"
                                onChange={this.nameChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.descriptionChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Start Time</Form.Label>
                            <DateTimePicker
                                onChange={this.onChangestartTime}
                                value={this.state.startTime}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>End Time</Form.Label>
                            <DateTimePicker
                                onChange={this.onChangeEndTime}
                                value={this.state.endTime}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.addTodo}>
                            Submit
                    </Button>
                    </Form>
                    : <div>
                        <h3>{this.state.successMessage}</h3>
                        <Link to='/newTodo'>Add another TODO</Link>
                    </div>
                }
                <Link to='/'>Go to Todo List</Link>
            </div>
        )
    }

}