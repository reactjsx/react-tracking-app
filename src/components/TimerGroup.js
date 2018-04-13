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
        onTrashClick={props.onTrashClick}
        onUpdateClick={props.onUpdateClick}
        onStartClick={props.onStartClick}
        onStopClick={props.onStopClick}
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