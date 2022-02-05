import { adminGetUsersRequest } from "../../../lib/axios";
import nookies from "nookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomInput } from "../../../components/CustomForm";
import { Button } from "@mui/material";

const Dashboard = ({ result }) => {
  const [users, setUsers] = useState(result);
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState(false);
  const [round, setRound] = useState(false);

  const toggleDom = (dom) => {
    if (domain === false || domain !== dom) {
      setDomain(dom);
    } else {
      setDomain(false);
    }
  };

  useEffect(() => {
    let filtered = result.filter(
      (user) =>
        user.username.includes(query) ||
        user.userId.regNo.includes(query.toUpperCase())
    );
    if (domain) {
      filtered = filtered.filter((user) =>
        user.domainsAttempted.map((dom) => dom.domain).includes(domain)
      );
    }
    if (round) {
      filtered = filtered.filter(
        (user) =>
          user.techRound === parseInt(round) ||
          user.managementRound === parseInt(round) ||
          user.designRound === parseInt(round) ||
          user.videoRound === parseInt(round)
      );
    }
    setUsers(filtered);
  }, [query, result, domain, round]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-row justify-center items-center">
        <Button onClick={(e) => toggleDom("tech", e)}>Tech</Button>
        <Button onClick={(e) => toggleDom("management", e)}>Management</Button>
        <Button onClick={(e) => toggleDom("design", e)}>Design</Button>
        <Button onClick={(e) => toggleDom("video", e)}>Video</Button>
      </div>
      <div className="flex flex-row justify-center items-center my-4">
        <CustomInput
          label="round"
          type="text"
          value={round}
          setValue={setRound}
        />
      </div>
      <div className="flex flex-row justify-center items-center my-4">
        <CustomInput
          label="search"
          type="text"
          value={query}
          setValue={setQuery}
        />
      </div>
      {users.map((usr) => (
        <div
          key={usr._id}
          className="text-2xl py-1 font-semi-bold flex flex-row w-2/3"
        >
          <Link href={`/admin/dashboard/${usr.username}`} passHref>
            <a className="cursor-pointer flex-auto">
              {usr.username} - {usr.userId.regNo}
            </a>
          </Link>
          {usr.domainsAttempted.map((domain) => {
            switch (domain.domain) {
              case "tech":
                return (
                  <p
                    className={`self-end mx-3 ${
                      usr.isChecking.tech && !usr.checked.tech
                        ? "text-orange-400"
                        : ""
                    } ${usr.checked.tech ? "text-green-500" : ""}`}
                    key={domain.domain}
                  >
                    {domain.domain}
                  </p>
                );
              case "management":
                return (
                  <p
                    className={`self-end mx-3 ${
                      usr.isChecking.management && !usr.checked.management
                        ? "text-orange-400"
                        : ""
                    } ${usr.checked.management ? "text-green-500" : ""}`}
                    key={domain.domain}
                  >
                    {domain.domain}
                  </p>
                );
              case "design":
                return (
                  <p
                    className={`self-end mx-3 ${
                      usr.isChecking.design && !usr.checked.design
                        ? "text-orange-400"
                        : ""
                    } ${usr.checked.design ? "text-green-500" : ""}`}
                    key={domain.domain}
                  >
                    {domain.domain}
                  </p>
                );
              case "video":
                return (
                  <p
                    className={`self-end mx-3 ${
                      usr.isChecking.video && !usr.checked.video
                        ? "text-orange-400"
                        : ""
                    } ${usr.checked.video ? "text-green-500" : ""}`}
                    key={domain.domain}
                  >
                    {domain.domain}
                  </p>
                );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  const { success, code, message, result } = await adminGetUsersRequest(
    cookies
  );
  if (!success) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: { success, code, message, result } };
}
