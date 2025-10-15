interface PagePanelProps {
  children: React.ReactNode;
}

const PagePanel = ({ children }: PagePanelProps) => {
  return (
    <div className="fixed z-[100] cursor-default overflow-visible shadow-2xl bg-[#1c1b1b] top-[53px] xl:top-[76px] xxl:top-[64px] left-[10px] lg:left-[calc(50%-350px)] xl:left-[80px] xxl:left-[96px] w-[calc(100%-20px)] lg:w-[700px] xl:w-[calc(100%-160px)] xxl:w-[calc(100%-192px)] h-[calc(100dvh-74px)] xl:h-[calc(100vh-132px)] xxl:h-[calc(100vh-168px)]">
      {children}
    </div>
  );
};

export default PagePanel;
