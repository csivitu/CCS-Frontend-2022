import Head from "next/head";
import Navbar from "../components/Navbar.js";
import Hero from "../components/Hero";
import Domains from "../components/Domains";
import FAQs from "../components/FAQs";
import LandingPortfolio from "../components/LandingPortfolio";
import Footer from "../components/Footer";
import nookies from 'nookies'
import { getUserState } from "../lib/axios.js";


export function Home({ loggedIn, username, domainsAttempted }) {
  return (
    <>
      <Head>
        <title>CSI CCS | Home</title>
      </Head>
      <Hero loggedIn={loggedIn} />
      <Navbar loggedIn={loggedIn} username={username} dashBoard={false} />
      <Domains domainsAttempted={domainsAttempted} />
      <LandingPortfolio />
      <FAQs />
      <Footer />

    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  if (!cookies.refreshToken) {
    return {
      props: { loggedIn: false }
    }
  }
  const res = await getUserState(cookies)
  if (!res.success) {
    return {
      redirect: {
        permanent: true,
        destination: '/logout'
      }
    }
  }
  const { result: { userId: { username }, domainsAttempted } } = res

  return {
    props: { loggedIn: true, username, domainsAttempted },
  }
}