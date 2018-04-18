import React, { Component } from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import helper from '../utils/helper';

class TimerDisplay extends Component {
  componentDidMount() {
    this.updateTimerInterval = setInterval(() => this.forceUpdate(), 50);
  }
  
  componentWillUnmount() {
    clearInterval(this.updateTimerInterval);
  }
  
  render() {
    const elapsedTimeString = helper.elapsedTimeToString(this.props.elapsedTime, this.props.startedFrom);
    const onClickFunction = this.props.startedFrom ? this.props.onStopClick : this.props.onStartClick;
    let btnColor = '';
    let btnName = '';
    if (this.props.startedFrom) {
      btnName = 'Stop';
      btnColor = 'red';
    } else if (elapsedTimeString !== '0h 0m 0s') {
      btnName = 'Resume';
      btnColor = 'blue';
    } else {
      btnName = 'Start';
      btnColor = 'green';
    }
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
            <Button
              icon
              color='black'
              onClick={this.props.onTrashClick}
            >
              <Icon name='trash' />
            </Button>
            <Button
              icon
              color='red'
              onClick={this.props.onPencilClick}
            >
              <Icon name='pencil' />
            </Button>
            <Button
              icon
              color='green'
              onClick={this.props.onCheckmarkClick}
            >
              <Icon name='checkmark' />
            </Button>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            basic
            fluid
            color={ btnColor }
            onClick={ onClickFunction }
          >
            {btnName}
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default TimerDisplay;