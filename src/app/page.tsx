import React from "react";
import Image from "next/image";
import Container from "@/components/layouts/Container";

const page = () => {
  return (
    <section className="h-screen relative">
      <Image
        alt="Flight waiting to get filled with shipments"
        src={"/img/hero.png"}
        fill
        quality={80}
        className="object-cover size-full"
      />

      <Container className="h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-end pb-[12vh] text-center xl:pb-[8vh]">
          <div className="mb-[28vh] backdrop-blur-sm md:bg-black/10 md:p-4">
            <h1 className="font-michroma xxl:text-4xl xxxl:text-5xl mb-4 text-[22px] lg:text-3xl">
              Global IT Deployments, Simplified
            </h1>
            <p className="xxl:text-base xxl:max-w-2xl xxxl:text-lg xxxl:max-w-3xl mx-auto max-w-xl text-[12px] lg:text-sm">
              End-to-end Importer of Record (IOR), Delivered Duty Paid (DDP)
              shipping, and Foreign VAT Reclaim services for IT & Data Center
              hardware — trusted by global technology leaders.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default page;
