import React, { Component } from 'react';
import Head from 'next/head';
import '../../styles/main.css';
import '../../styles/materialize.css';
import '../../styles/common.css';
import '../../styles/animate.css';
import '../../styles/license.css';
import '../../styles/sub.css';
class Meta extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Days+One|Oswald"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Days+One|Noto+Sans+KR|Oswald"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Condensed"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Hammersmith+One"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Fugaz+One"
          rel="stylesheet"
        />

        <title> KT Hotel Service - ONM </title>
      </Head>
    );
  }
}

export default Meta;
