/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import LinkedIn from "../public/assets/LinkedIn.svg";
import GitHub from "../public/assets/Github.svg";
import Instagram from "../public/assets/Instagram.svg";
import Spotify from "../public/assets/Spotify.svg";
import { AddURL, DomainURL } from "./CustomForm";

const Dashboard = () => {
  const [newURL, setNewURL] = useState("");
  const [select, setSelect] = useState("management");
  const [management, setManagement] = useState("");
  const [tech, setTech] = useState("");
  const [design, setDesign] = useState("");
  const [video, setVideo] = useState("");

  async function submitURL() {

  }

  return (
    <div className="min-h-screen flex flex-col px-5 gap-6 items-center justify-center bg-grid bg-no-repeat bg-cover bg-center">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="bg-peach rounded-xl">
          <Image
            src="https://avatars.dicebear.com/api/croodles-neutral/sourish.svg"
            alt="avatar"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="uppercase font-bold text-4xl">KADAMBARI CHIKARA</h1>
          <p className="italic text-3xl font-thin">saltyboy</p>
          <h1 className="uppercase font-bold text-2xl mt-2">SOCIALS</h1>
          <div className="flex text-3xl gap-2">
            <LinkedIn />
            <GitHub />
            <Instagram />
            <Spotify />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-6xl">
        <h1 className="uppercase font-bold text-4xl">PORTFOLIO</h1>
        <p className="text-3xl font-extralight self-start mb-6">Show us your work</p>
        <div className="">
          <AddURL
            select={select}
            setSelect={setSelect}
            url={newURL}
            setURL={setNewURL}
            submitURL={submitURL}
          />
        </div>
        <div className="flex flex-col gap-2">
            <DomainURL domain="management" value={management} setValue={setManagement} />
            <DomainURL domain="design" value={design} setValue={setDesign} />
            <DomainURL domain="tech" value={tech} setValue={setTech} />
            <DomainURL domain="video" value={video} setValue={setVideo} />
        </div>
      </div>
      {/* <p>This is a protected</p>
      <Link href="/logout" passHref>
        <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
          LOGOUT
        </button>
      </Link> */}
    </div>
  );
};

export default Dashboard;
