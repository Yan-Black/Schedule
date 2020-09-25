import * as React from 'react';
import { Component } from 'react';

import ErrorIndicator from '../components/ErrorIndicator';
import { Props, State } from './models';

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  handleCloseError = (): void => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator handleCloseError={this.handleCloseError} />;
    }

    return children;
  }
}

export default ErrorBoundary;
