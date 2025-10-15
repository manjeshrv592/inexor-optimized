import Link from "next/link";

const PagePanelBg = () => {
  return (
    <Link href="/">
      <div className="fixed inset-0 z-[60] bg-[#0d0d0d]">&nbsp;</div>
    </Link>
  );
};

export default PagePanelBg;
