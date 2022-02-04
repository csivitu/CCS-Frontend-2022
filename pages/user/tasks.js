import Head from "next/head";
import Link from "next/link";

const projects = () => {
    return (
        <>
            <Head>
                <title>CSI-CCS | Tasks</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen gap-2">
                <p className="text-center text-xl">Tasks will be available after if you clear round 1</p>
                <Link href="/" passHref>
                    <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
};

export default projects;
