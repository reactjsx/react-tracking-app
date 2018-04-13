import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import TimerGroup from './components/TimerGroup';
import AddTimerPanel from './components/AddTimerPanel';
import uuid from 'uuid';
import helper from './utils/helper';

class App extends Component {
  state = {
    displayAddForm: false,
    timers: []
  };
  
  componentDidMount() {
    this.loadTimers();
    setInterval(() => this.loadTimers(), 5000);
  }
  
  createTimer = (timer) => {
    const fullTimer = { 
      ...timer,
      elapsedTime: 0,
      startedFrom: null,
      id: uuid.v4()
    };
    this.setState({
      timers: this.state.timers.concat(fullTimer)
    });
    helper.createTimer('https://timer-server.herokuapp.com/api/timers', fullTimer);
  }
  
  loadTimers = () => {
    helper.getTimers('https://timer-server.herokuapp.com/api/timers', (foundTimers) => {
      this.setState({
        timers: foundTimers
      });
    });
  }
  
  startTimer = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return { ...timer, startedFrom: now};
        } else {
          return timer;
        }
      })
    });
    helper.startTimer('https://timer-server.herokuapp.com/api/timers/start', {
      id: timerId,
      startedFrom: now
    });
  }
  
  stopTimer = (timerId) => {
    const now = Date.now();
    let newElapsedTime = 0;
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          newElapsedTime = timer.elapsedTime + now - timer.startedFrom;
          return { ...timer, startedFrom: null, elapsedTime: newElapsedTime};
        } else {
          return timer;
        }
      })
    });
    helper.stopTimer('https://timer-server.herokuapp.com/api/timers/stop', {
      id: timerId,
      elapsedTime: newElapsedTime
    });
  }
  
  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId)
    });
    helper.deleteTimer('https://timer-server.herokuapp.com/api/timers/', {
      id: timerId
    });
  }
  
  handlePlusClick = () => {
    this.setState({
      displayAddForm: true
    });
  }
  
  handleCreateClick = (timer) => {
    this.createTimer(timer);
    this.setState({
      displayAddForm: false
    });
  }
  
  handleCancelClick = () => {
    this.setState({
      displayAddForm: false
    });
  }
  
  handleTrashClick = timerId => {
    this.deleteTimer(timerId);
  }
  
  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  }
  
  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  }
  
  render() {
    return (
      <div className='ui container'>
        <Grid>
        <Grid.Row>
          <TimerGroup
            timers={this.state.timers}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
        </Grid.Row>
        <Grid.Row>
          <AddTimerPanel
            displayForm={this.state.displayAddForm}
            onPlusClick={this.handlePlusClick}
            onCreateClick={this.handleCreateClick}
            onCancelClick={this.handleCancelClick}
          />
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
