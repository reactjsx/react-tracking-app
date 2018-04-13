import React, { Component } from 'react';
import { Button, Icon, Form, Card } from 'semantic-ui-react';

class AddTimerPanel extends Component {
  state = {
    displayForm: true,
    title: '',
    project: ''
  };
  
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }
  
  handleProjectChange = (event) => {
    this.setState({ project: event.target.value });
  }
  
  handleCreateClick = (event) => {
    event.preventDefault();
    this.props.onCreateClick({
      title: this.state.title,
      project: this.state.project
    });
    this.clearInput();
  }
  
  handleCancelClick = () => {
    this.clearInput();
    this.props.onCancelClick();
  }
  
  clearInput = () => {
    this.setState({
      title: '',
      project: ''
    });
  }
  
  render() {
    if (!this.props.displayForm) {
      return (
        <Button
          icon
          onClick={this.props.onPlusClick}
        >
          <Icon name='add' />
        </Button>
      );
    } else {
      return (
        <Card>
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                />
              </Form.Field>
              <Form.Field>
                <label>Project</label>
                <input
                  onChange={this.handleProjectChange}
                  value={this.state.project}
                />
              </Form.Field>
              <Button.Group fluid>
                <Button
                  color='blue'
                  type='submit'
                  onClick={this.handleCreateClick}
                >
                  Create
                </Button>
                <Button
                  color='red'
                  onClick={this.handleCancelClick}
                >
                  Cancel
                </Button>
              </Button.Group>
            </Form>
          </Card.Content>
        </Card>
      );
    }
  }
}
export default AddTimerPanel;