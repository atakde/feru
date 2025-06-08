import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button
} from "@heroui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();
  const isAnonymous = user?.is_anonymous || false;

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <img
          src="/feru_logo.png"
          alt="Logo"
          className="h-9 w-auto"
        />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={router.pathname === "/"}>
          <Link color="foreground" href="/">
            Measure
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname === "/features"}>
          <Link color="foreground" href="/features">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname === "/api-docs"}>
          <Link color="foreground" href="/api-docs">
            API
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname === "/pricing"}>
          <Link color="foreground" href="/pricing">
            Pricing
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {(!authLoading && user && !isAnonymous) && (

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="logout" color="danger " onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {(!authLoading && (!user || isAnonymous)) && (
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat" href="/register">
              Sign Up
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
