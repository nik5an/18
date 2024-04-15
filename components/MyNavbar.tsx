"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link as ScrollLink } from "react-scroll";
import { useSession } from "next-auth/react";
import UserAccountNav from "./userAccountNav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignInForm from "./form/signInForm";
import { MdManageAccounts } from "react-icons/md";

const links = [
  { href: "services", label: "Услуги" },
  { href: "about", label: "За нас" },
];
const logo = "https://i.postimg.cc/6qvB4KXY/barbershop-logo.png";

const MyNavbar = () => {
  let [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-black bg-opacity-30">
      <div className="navbar max-w-5xl mx-auto flex-col md:flex-row justify-between relative">
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="btn btn-primary rounded-lg">
            <div className="w-40 h-18">
              <Image src={logo} alt="logo" width={500} height={500}></Image>
            </div>
          </Link>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl text-white absolute right-8 top-4 cursor-pointer md:hidden"
        >
          {!open ? <IoIosMenu /> : <IoIosClose />}
        </div>
        <ul
          className={`menu mt-4 md:mt-0 md:ml-8 flex flex-col md:flex-row items-center ${
            open ? "" : "hidden md:flex"
          }`}
        >
          {links.map((link) => (
            <li key={link.href} className="md:ml-4 my-0">
              <ScrollLink
                activeClass="active"
                to={link.href}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="capitalize text-2xl text-white focus:text-white cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}

          <li className="relative">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 bg-black bg-opacity-80"
              >
                <div className="flex items-center justify-center w-12 h-12 text-4xl text-white">
                  {session?.user ? (
                    <MdManageAccounts />
                  ) : (
                    <MdOutlineAccountCircle />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-box w-22 absolute top-full left-0 text-base"
              >
                <li>
                  {session?.user ? (
                    <>
                      {session?.user.email === "asd@gmail.com" ? (
                        <Link href={"/admin"}>Admin</Link>
                      ) : null}
                      <Link href={"/my-booking"}>Моите часове</Link>
                      <UserAccountNav />
                    </>
                  ) : (
                    <Dialog>
                      <DialogTrigger className="w-20">Влез</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center font-normal">
                            Логин
                          </DialogTitle>
                          <SignInForm></SignInForm>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MyNavbar;
