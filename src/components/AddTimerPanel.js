import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class AddTimerPanel extends Component {
  render() {
    return (
      <Button icon>
        <Icon name='add' />
      </Button>
    );
  }
}
export default AddTimerPanel;