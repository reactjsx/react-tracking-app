import React, { Component } from 'react';
import { Button, Form, Card } from 'semantic-ui-react';

class AddOrUpdateTimerForm extends Component {
  state = {
    title: this.props.title || '',
    project: this.props.project || ''
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
  
  handleUpdateClick = (event) => {
    event.preventDefault();
    this.props.onUpdateClick({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
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
              {
                !this.props.id ?
                (<Button
                  color='green'
                  type='submit'
                  onClick={this.handleCreateClick}
                >
                  Create
                </Button>) :
                (<Button
                  color='blue'
                  type='submit'
                  onClick={this.handleUpdateClick}
                >
                  Update
                </Button>) 
              }
              
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
export default AddOrUpdateTimerForm;