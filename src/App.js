import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import TimerGroup from './components/TimerGroup';
import AddTimerPanel from './components/AddTimerPanel';
import uuid from 'uuid';
import helper from './utils/helper';

class App extends Component {
  state = {
    timers: []
    // timers: [
    //   {
    //     id: uuid.v4(),
    //     title: 'timer1',
    //     project: 'project1',
    //     elapsedTime: 10,
    //     startedFrom: null
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'timer2',
    //     project: 'project2',
    //     elapsedTime: 20,
    //     startedFrom: null
    //   }
    // ]
  };
  
  componentDidMount() {
    this.loadTimers();
    setInterval(() => this.loadTimers(), 5000);
  }
  
  loadTimers = () => {
    helper.getTimers('https://infinite-scrubland-11596.herokuapp.com/api/timers', (foundTimers) => {
      this.setState({
        timers: foundTimers
      });
    });
  }
  
  handleStartButtonClick = (timerId) => {
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
    helper.startTimer('https://infinite-scrubland-11596.herokuapp.com/api/timers/start', {
      id: timerId,
      startedFrom: now
    });
  }
  
  handleStopButtonClick = (timerId) => {
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
    helper.stopTimer('https://infinite-scrubland-11596.herokuapp.com/api/timers/stop', {
      id: timerId,
      elapsedTime: newElapsedTime
    });
  }
  
  render() {
    return (
      <div className='ui container'>
        <Grid>
        <Grid.Row>
          <TimerGroup
            timers={this.state.timers}
            onStartClick={this.handleStartButtonClick}
            onStopClick={this.handleStopButtonClick}
          />
        </Grid.Row>
        <Grid.Row>
          <AddTimerPanel />
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
