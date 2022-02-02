import nookies from "nookies";
import { adminGetUserRequest } from "../../../lib/axios";

const User = ({ result }) => {
  return <div>hi {result.techRound}</div>;
};

export default User;

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  const {
    query: { user },
  } = ctx;
  const { success, result } = await adminGetUserRequest(cookies, user);
  if (!success) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: { result } };
}
