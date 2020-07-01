import React from "react";
import _ from 'lodash';
import { Card } from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import moment from 'moment';


export default class Details extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.location.state && this.props.location.state.data) {
            let detail = this.props.location.state.data
            return (
                < div className="container-fluid" >
                    <div>DETAILS:</div>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item><b>Name</b>: {detail.name}</ListGroup.Item>
                            <ListGroup.Item><b>Description</b>: {detail.description}</ListGroup.Item>
                            <ListGroup.Item><b>Start Time</b>: {moment(detail.startTime).format("YYYY-MM-DD HH:mm:ss")}</ListGroup.Item>
                            <ListGroup.Item><b>End Time</b>: {moment(detail.endTime).format("YYYY-MM-DD HH:mm:ss")}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            )
        }
        return (
            <div className="container-fluid">
                <h3>Invalid refference for Todo</h3>
                <Link to='/'>Go to Todo List</Link>
            </div>
        )
    }
}