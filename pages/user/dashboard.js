/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import Dashboard from "../../components/Dashboard";


const dashboard = () => {

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default dashboard;

export async function getServerSideProps({ query }) {
  return { props: {} }
}
