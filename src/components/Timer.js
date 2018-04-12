import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';
import helper from '../utils/helper';

class Timer extends Component {
  componentDidMount() {
    this.updateTimerInterval = setInterval(() => this.forceUpdate(), 50);
  }
  render() {
    const elapsedTimeString = helper.elapsedTimeToString(this.props.elapsedTime, this.props.startedFrom);
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.title}
          </Card.Header>
          <Card.Meta>
            {this.props.project}
          </Card.Meta>
          <Card.Description className="center aligned">
            <h1>{elapsedTimeString}</h1>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            basic
            fluid
            color={this.props.startedFrom ? 'red' : 'green'}
            onClick={
              this.props.startedFrom ? this.props.onStopClick : this.props.onStartClick
            }
          >
            {this.props.startedFrom ? 'Stop' : 'Start'}
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default Timer;