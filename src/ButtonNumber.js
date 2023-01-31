import React from 'react';
import Button from '@material-ui/core/Button';

class ButtonNumber extends React.Component {
  constructor() {
    super();
  }

  tape(value) {

  }

  render() {
    const {
      value
    } = this.props;

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => this.tape(value)}>

          {value}
        </Button>
    )
  }
}

export default ButtonNumber;