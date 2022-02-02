import { adminGetRequest } from "../../lib/axios";

const dashboard = () => {
  async function getUsers() {
    const data = await adminGetRequest();
    console.log(data);
  }

  getUsers()
  return <div>Hi soureesh</div>;
};

export default dashboard;
