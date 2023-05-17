import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';
import { useEffect } from 'react';
type SnipSettings = {
  publicApiKey: String
  loadStrategy: String
  addProductBehavior?: String
  modalStyle: "side",

}



export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com"/>
        <link rel="preconnect" href="https://cdn.snipcart.com"/>
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css"/>

        <script src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"/>
 
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
