import PagePanel from "@/components/layouts/PagePanel";
import PagePanelBg from "@/components/layouts/PagePanelBg";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <>
      <PagePanelBg />
      <PagePanel>{children}</PagePanel>
    </>
  );
};

export default layout;
