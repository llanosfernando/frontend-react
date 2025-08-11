import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2 style={{color: 'red', textAlign: 'center', marginTop: '40px'}}>¡Ocurrió un error inesperado en la página!</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
