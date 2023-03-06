import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

export default class AsyncStripeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null
    };
  }

  componentDidUpdate() {
    const { stripe } = this.state;
    const { apiKey } = this.props;

    if (!stripe && !!window.Stripe) {
      this.setState({
        stripe: window.Stripe(apiKey)
      });
    }
  }

  // render
  render() {
    const { stripe } = this.state;

    return (
      <StripeProvider stripe={stripe}>
        {this.props.children}
      </StripeProvider>
    );
  }
}