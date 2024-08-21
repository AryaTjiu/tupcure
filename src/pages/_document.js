import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="font-opensans selection:bg-purple-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
