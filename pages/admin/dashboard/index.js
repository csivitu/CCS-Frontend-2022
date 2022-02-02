import { adminGetUsersRequest } from "../../../lib/axios";
import nookies from "nookies";
import Link from "next/link";
import { useState } from "react";


const Dashboard = ({ result }) => {

  const [users, setUsers] = useState(result)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {users.map((usr) => (
        <div key={usr._id} className="text-2xl py-1 font-semi-bold">
          <Link href={`/admin/dashboard/${usr.username}`} passHref>
            <a className="cursor-pointer">{usr.username}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  const { success, code, message, result } = await adminGetUsersRequest(cookies);
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
