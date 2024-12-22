import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SuperButton from "@/components/SuperButton";
import Container from "./Container";
import { getCarTypes } from "@/lib/getters";

type Props = {};

const Header = async(props: Props) => {

  const carTypes = await getCarTypes() 
  return (
    <header className="fixed top-0 left-0 w-full  z-10">
      <Container>
        <div className="  flex items-center bg-white  p-[32px] rounded-bl-[16px] rounded-br-[16px] justify-between">
          {/* logo */}
          <Logo />
          {/* Nav Links */}
          <NavLinks  carTypes={carTypes}/>
          {/* My Booking */}
          <SuperButton
            buttonType="linkButton"
            href="/booking"
            variant="site"
            title="My Booking"
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
