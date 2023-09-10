// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from "next/document";
import { AppType } from "next/app";
import { MyAppProps } from "./_app";
import createEmotionCache from "../utils/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";



export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href='https://fonts.googleapis.com/css2?family=Prompt:wght@700&family=Roboto+Serif:opsz@8..144&display=swap' rel="stylesheet" />
      </Head>
      <body>
        <>test</>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};


