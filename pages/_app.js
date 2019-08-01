import React from 'react';
import App, { Container } from 'next/app';
import BaseLayout from '../components/layout/BaseLayout';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));
    return {
      pageProps
    };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </Container>
    );
  }
}

export default MyApp;
