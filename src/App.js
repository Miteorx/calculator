import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import store from './store';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstNumber: '',
      secondNumber: '',
      text: '0',
      operatorFounded: false,
      operatorType: '',
      result: '',
      history: [],
    };
    this.refOutput = React.createRef()
  }

  calc() {
    let res;
    let first = this.state.firstNumber
    let second = this.state.secondNumber
    if (this.state.operatorType === '+') {
      res = +first + +second;
    } else if (this.state.operatorType === '-') {
      res = first - second
    } else if (this.state.operatorType === '*') {
      res = first * second
    } else if (this.state.operatorType === '/') {
      res = first / second
    }

    this.setState({
      result: this.state.result + res,
      firstNumber: res,
      secondNumber: '',
      operatorFounded: false,
      operatorType: '',
      text: res,
      history: [...this.state.history, this.state.text + '=' + res]
    });
  }

  tapeNumber(value) {
    if (this.state.text === '0') {
      this.setState({
        firstNumber: value,
        text: value
      })
    } else if (this.state.operatorFounded) {
      this.setState({
        secondNumber: this.state.secondNumber + value,
        text: this.state.text + value,
      })
    } else {
      this.setState({
        firstNumber: this.state.firstNumber + value,
        text: this.state.text + value,
      })
    }
  }

  tapeOperator(value) {
    let notAnEqual = value !== '=';
    if (this.state.operatorFounded && this.state.secondNumber !== '' && value
        === '=') {
      this.calc();
    } else if (!this.state.operatorFounded && notAnEqual) {
      this.setState({
        operatorType: value,
        operatorFounded: true,
        text: this.state.text + value,
      })
    } else {
      if (this.state.operatorType && notAnEqual && this.state.secondNumber
          === '') {
        this.setState({
          operatorType: value,
          text: this.state.text.substring(0, this.state.text.length - 1) + value
        })
      }
    }
  }

  render() {
    return (
        <div>
          <div>
            {this.state.history.map((item) => {
              return <Typography variant="h5" gutterBottom>
                {item}
              </Typography>
            })}
          </div>

          <div>
            <TextField
                value={this.state.text}
            />
          </div>

          <div>
            {store.numbers.map((item) => {
                  return <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.tapeNumber(item.val)}>
                    {item.val}
                  </Button>
                }
            )}
          </div>

          <div>
            {store.operators.map((item) => {
                  return <Button
                      variant="contained"
                      onClick={() => this.tapeOperator(item.val)}>
                    {item.val}
                  </Button>
                }
            )}
          </div>


        </div>
    );
  }

}

export default App;
