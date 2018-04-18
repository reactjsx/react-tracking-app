import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import AddOrUpdateTimerForm from './AddOrUpdateTimerForm';

const TimerPanel = (props) => {
  if (!props.displayForm) {
    return (
      <Button
        size='huge'
        icon
        color='blue'
        onClick={props.onPlusClick}
      >
        <Icon name='add' />
      </Button>
    );
  } else {
    return (
      <AddOrUpdateTimerForm
        onCreateClick={props.onCreateClick}
        onCancelClick={props.onCancelClick}
      />
    );
  }
};
export default TimerPanel;