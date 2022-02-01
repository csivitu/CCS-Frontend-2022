import R_Piece from "../public/assets/prop_r.svg";

function LandingPortfolio() {
  return (
    <section className="text-gray-light flex flex-col gap-6 w-full relative items-center py-32 px-6 justify-center">
      <div className="absolute right-2 md:right-5 -bottom-16 z-10">
        <R_Piece className="w-32 md:w-44 lg:w-44" />
      </div>
      <h1 className="text-3xl md:text-6xl font-bold text-center">
        Already have a portfolio?
      </h1>
      <p className="text-md md:text-2xl text-center tracking-wider w-full md:w-1/2">
        Show us your work by uploading a link to your portfolio in your profile
        section.
      </p>
    </section>
  );
}

export default LandingPortfolio;
