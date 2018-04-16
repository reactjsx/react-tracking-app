import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import TimerGroup from './components/TimerGroup';
import TimerPanel from './components/TimerPanel';
import uuid from 'uuid';
import helper from './utils/helper';

class App extends Component {
  state = {
    displayAddForm: false,
    timers: []
  };
  
  URI = 'https://timer-server.herokuapp.com/api/timers';
  START_TIMER_URI = 'https://timer-server.herokuapp.com/api/timers/start';
  STOP_TIMER_URI = 'https://timer-server.herokuapp.com/api/timers/stop';
  
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
    helper.createTimer(this.URI, fullTimer);
  }
  
  updateTimer = (newTimer) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === newTimer.id) {
          return { ...timer, title: newTimer.title, project: newTimer.project};
        } else {
          return timer;
        }
      })
    });
    helper.updateTimer(this.URI, newTimer);
  }
  
  loadTimers = () => {
    helper.getTimers(this.URI, (foundTimers) => {
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
    helper.startTimer(this.START_TIMER_URI, {
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
    helper.stopTimer(this.STOP_TIMER_URI, {
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
  
  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  }
  
  handleUpdateClick = (timer) => {
    this.updateTimer(timer);
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
        <Grid.Row centered>
          <Header as='h1'>
            My Task Tracking App
          </Header>
        </Grid.Row>
        
        <TimerGroup
          timers={this.state.timers}
          onTrashClick={this.handleTrashClick}
          onUpdateClick={this.handleUpdateClick}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
        
        <Grid.Row centered>
          <TimerPanel
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
