"use client";
import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";

const MyNavbar: React.FC = () => {
  const handleSignOut = () => {};

  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/admin/dashboard/users">Users</Link>
        </NavbarItem>
      </NavbarContent>
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
