import Head from "next/head";
import Navbar from "../components/Navbar.js";
import Hero from "../components/Hero";
import Domains from "../components/Domains";
import FAQs from "../components/FAQs";
import LandingPortfolio from "../components/LandingPortfolio";
import Footer from "../components/Footer";
import nookies from 'nookies'


export function Home({ loggedIn }) {
  return (
    <>
      <Head>
        <title>CSI CCS | Home</title>
        <meta name="keywords" content="ccs" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Semibold.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="true" />
      </Head>
      <Hero loggedIn={loggedIn} />
      <Navbar />
      <Domains />
      <LandingPortfolio />
      <FAQs />
      <Footer />

    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const { refreshToken } = nookies.get(context)
  if (!refreshToken) {
    return {
      props: { loggedIn: false }
    }
  }
  return {
    props: { loggedIn: true },
  }
}