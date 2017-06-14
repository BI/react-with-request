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
      const mergedProps = Object.assign({}, this.props, this.state.propsFromResponse)
      if (shouldFetch(mergedProps)) {
        fetch(mergedProps, this.handleResponse)
      }
    }

    componentDidUpdate(nextProps) {
      const mergedProps = Object.assign({}, this.props, this.state.propsFromResponse)
      const nextMergedProps = Object.assign({}, nextProps, this.state.propsFromResponse)
      if (shouldFetch(mergedProps, nextMergedProps)) {
        fetch(nextMergedProps, this.handleResponse)
      }
    }

    handleResponse(propsFromResponse) {
      this.setState({ propsFromResponse }, () => this.props.onLoad(propsFromResponse))
    }

    render() {
      if (!this.state.propsFromResponse) {
        return <LoadingIndicator type="bars" />
      }

      return <WrappedComponent {...this.props} {...this.state.propsFromResponse} />
    }
  }
}
