"use client";

import { signOut } from "@/actions/user";
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

const MyNavbar: React.FC = () => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Navbar>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" variant="flat" onClick={handleSignOut}>
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default MyNavbar;
