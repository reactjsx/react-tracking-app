import React, { Component } from 'react';
import TimerDisplay from './TimerDisplay';
import AddOrUpdateTimerForm from './AddOrUpdateTimerForm';

class Timer extends Component {
  state = {
    displayUpdateForm: false
  };
  
  handlePencilClick = () => {
    this.setState({
      displayUpdateForm: true
    });
  }
  
  handleCancelClick = () => {
    this.setState({
      displayUpdateForm: false
    });
  }
  
  handleUpdateClick = (timer) => {
    this.setState({
      displayUpdateForm: false
    });
    this.props.onUpdateClick(timer);
  }
  
  render() {
    if (!this.state.displayUpdateForm) {
      return (
        <TimerDisplay
          elapsedTime={this.props.elapsedTime}
          startedFrom={this.props.startedFrom}
          title={this.props.title}
          project={this.props.project}
          onTrashClick={() => this.props.onTrashClick(this.props.id)}
          onPencilClick={this.handlePencilClick}
          onCheckmarkClick={() => this.props.onCheckmarkClick(this.props.id)}
          onStartClick={() => this.props.onStartClick(this.props.id)}
          onStopClick={() => this.props.onStopClick(this.props.id)}
        />
      );
    } else {
      return (
        <AddOrUpdateTimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onCancelClick={this.handleCancelClick}
          onUpdateClick={this.handleUpdateClick}
        />
      );
    }
  }
}

export default Timer;