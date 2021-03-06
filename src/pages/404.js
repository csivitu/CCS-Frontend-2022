import Link from 'next/link';
const notFound = () => {
    return (
        <>
            <title>CSI - CCS | 404</title>
            <div className="flex flex-col items-center justify-center h-screen gap-2">
                <p className="text-center text-xl">Page not found :(</p>

                <Link href="/" passHref>
                    <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                        Home
                    </button>
                </Link>
            </div>
        </>
    );
};

export default notFound;
