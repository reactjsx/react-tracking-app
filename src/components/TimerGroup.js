import React from 'react';
import { Card } from 'semantic-ui-react';
import Timer from './Timer';

const TimerGroup = (props) => {
  const timers = props.timers.map((timer) => {
    return (
      <Timer
        id={timer.id}
        key={timer.id}
        title={timer.title}
        project={timer.project}
        elapsedTime={timer.elapsedTime}
        startedFrom={timer.startedFrom}
        onStartClick={() => props.onStartClick(timer.id)}
        onStopClick={() => props.onStopClick(timer.id)}
      />
    );
  });
  return (
    <Card.Group>
      {timers}
    </Card.Group>
  );
};

export default TimerGroup;