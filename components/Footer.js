import Image from "next/image";

function Footer() {
  return (
    <footer className="text-gray-light flex flex-col gap-4 w-full relative items-center py-12 px-6 justify-center m-0 border-none">
      <p>When we build, it matters!</p>
      <div className="w-44">
        <Image
          src="/assets/CSI_logo_Light.png"
          alt="CSI Logo"
          height="48"
          width="248"
        />
      </div>
    </footer>
  );
}

export default Footer;
