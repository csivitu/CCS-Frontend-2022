import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Navbar from "../components/Navbar.js";
import Hero from "../components/Hero";
import Domains from "../components/Domains";
import FAQs from "../components/FAQs";
import LandingPortfolio from "../components/LandingPortfolio";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <>
      <Head>
        <title>CCS | Home</title>
        <meta name="keywords" content="ccs" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Semibold.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="true" />
      </Head>
      <Hero />
      <Navbar />
      <Domains />
      <LandingPortfolio />
      <FAQs />
      <Footer />

      {/* <div>
        <h1 className={styles.title}> HomePage</h1>
        <p className={styles.text}>
          Hello there, CSI-VIT welcomes you to CCS!{" "}
        </p>
        <Link href="/login">
          <a className={styles.btn}>Login</a>
        </Link>
        <Link href="/signup">
          <a className={styles.btn}>Sign Up</a>
        </Link>
      </div> */}
    </>
  );
}
