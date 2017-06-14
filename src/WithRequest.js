import React, { Component } from 'react'
import LoadingIndicator from 'react-loading-simple'

export default function withRequest(WrappedComponent, shouldFetch, fetch) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = { propsFromResponse: this.props.initialProps }
      this.handleResponse = this.handleResponse.bind(this)
    }

    componentDidMount() {
      if (shouldFetch(this.props)) {
        fetch(this.props, this.handleResponse)
      }
    }

    componentDidUpdate(nextProps) {
      if (shouldFetch(this.props, nextProps) && this.state.propsFromResponse === undefined) {
        fetch(nextProps, this.handleResponse)
      }
    }

    handleResponse(propsFromResponse) {
      this.setState({ propsFromResponse })
    }

    render() {
      if (!this.state.propsFromResponse) {
        return <LoadingIndicator type="bars" />
      }

      return <WrappedComponent {...this.props} {...this.state.propsFromResponse} />
    }
  }
}
