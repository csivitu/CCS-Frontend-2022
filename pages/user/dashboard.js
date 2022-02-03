import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import nookies from 'nookies'
import LinkedIn from "../../public/assets/LinkedIn.svg";
import GitHub from "../../public/assets/Github.svg";
import Instagram from "../../public/assets/Instagram.svg";
import Spotify from "../../public/assets/Spotify.svg";
import { AddURL, DomainURL } from "../../components/CustomForm";
import { getUserState } from "../../lib/axios";
import Navbar from "../../components/Navbar";
import LinkModal from "../../components/LinkModal";
import Head from "next/head";

const Dashboard = ({ username, name }) => {
  const [newURL, setNewURL] = useState("");
  const [select, setSelect] = useState("management");
  const [management, setManagement] = useState("");
  const [tech, setTech] = useState("");
  const [design, setDesign] = useState("");
  const [video, setVideo] = useState("");
  // !TODO!  

  return (
    <>
      <Head>
        <title>CSI-CCS | Dashboard</title>
      </Head>
      <Navbar username={username} loggedIn={true} dashBoard={true} />
      <div className="min-h-screen flex flex-col px-5 gap-6 items-center justify-center bg-grid bg-no-repeat bg-cover bg-center">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-peach rounded-xl">
            <Image
              src={`https://avatars.dicebear.com/api/croodles-neutral/${username}.svg`}
              alt="avatar"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="uppercase font-bold text-4xl">{name}</h1>
            <p className="italic text-3xl font-thin">{username}</p>
            <h1 className="uppercase font-bold text-2xl mt-2">SOCIALS</h1>
            <div className="flex text-3xl gap-2">
              {/* <LinkModal/> */}
              <button >
                <LinkedIn className="hover:text-peach" />
              </button>
              <GitHub />
              <Instagram />
              <Spotify />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-6xl">
          <h1 className="uppercase font-bold text-4xl">PORTFOLIO</h1>
          <p className="text-3xl font-extralight self-start mb-6">Show us your work</p>
          <div className="flex flex-col gap-2">
            <DomainURL domain="management" value={management} setValue={setManagement} />
            <DomainURL domain="design" value={design} setValue={setDesign} />
            <DomainURL domain="tech" value={tech} setValue={setTech} />
            <DomainURL domain="video" value={video} setValue={setVideo} />
          </div>
        </div>
      </div >
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const res = await getUserState(cookies)
  if (!res.success) {
    return {
      redirect: {
        permanent: true,
        destination: '/logout'
      }
    }
  }
  const { result: { userId: { username, name } } } = res
  return {
    props: { username, name },
  }
}
