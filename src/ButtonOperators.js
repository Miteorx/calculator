import React from 'react';
import Button from '@material-ui/core/Button';

class ButtonOperators extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {
      value
    } = this.props;

    return (
        <Button variant="contained">
          {value}
        </Button>
    )
  }
}

export default ButtonOperators;