import Head from "next/head";
import '../styles/global.css'



// const theme = createTheme({
//   palette: {
//     primary: {
//       main: blueGrey[100],
//     },
//     secondary: {
//       main: amber[400],
//     },
//   },
//   typography: {
//     h1: {
//       fontFamily: prompt.style.fontFamily,
//       fontWeight: 700,
//       fontSize: "28px",
//       lineHeight: "40px",
//     },
//     subtitle1: {
//       fontFamily: prompt.style.fontFamily,
//       fontWeight: 700,
//       fontSize: "16px",
//       lineHeight: "40px",
//       color: "#0074B7",
//     },
//     h3: {
//       fontFamily: roboto.style.fontFamily,
//       fontWeight: 400,
//       fontSize: "14px",
//       lineHeight: "2px",
//       color: "#666",
//     },
//     h4: {
//       fontFamily: roboto.style.fontFamily,
//       fontWeight: 400,
//       fontSize: "16px",
//       lineHeight: "15px",
//       color: "#666",
//     },
//     body1: {
//       fontFamily: roboto.style.fontFamily,
//     },
//     caption: {
//       fontFamily: prompt.style.fontFamily,
//     },
//   },
// });

export default function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
