import Image from "next/image";

const Logo = () => {
  return (
    <div className="border-b border-neutral-800 bg-[#050505] p-3 pb-6 text-center xl:border-none xl:bg-transparent xl:p-1 xl:pt-6">
      <Image
        src="/img/logo.svg"
        alt="Inexor logo"
        width={150}
        height={40}
        className="mx-auto h-auto w-20 xl:w-full"
        priority
      />
    </div>
  );
};

export default Logo;
