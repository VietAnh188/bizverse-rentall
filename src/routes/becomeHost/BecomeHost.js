import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BecomeHost.css';
import cx from 'classnames';
import history from '../../core/history';

// Component
import ListPlaceStep1 from '../../components/ListPlaceStep1';

class BecomeHost extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    mode: PropTypes.string,
    listId: PropTypes.number,
    formBaseURI: PropTypes.string,
    mode: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  componentDidMount() {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  render() {
    const { title, formPage, formBaseURI, mode, listId, baseCurrency } = this.props;
    let isDoneAStep = false; 
    const secondPart = this.state.location.split("become-a-host/")[1]

    if (secondPart) {
      isDoneAStep = !isNaN(secondPart.split("/")[0])
    }

    return (
      <div className={cx(s.root)}>
        <div className={cx(s.container, 'existingPage', s.becomeHostContainer, {
          [s.nearlyHostContainer]: isDoneAStep
        })}>
          <ListPlaceStep1
            listId={listId}
            formPage={formPage}
            formBaseURI={formBaseURI}
            mode={mode}
            baseCurrency={baseCurrency}
          />
        </div>
      </div>
    );
  }
}


export default withStyles(s)(BecomeHost);
