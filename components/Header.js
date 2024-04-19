import React from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation'
//import LuckyLogo from "../assets/lucky.svg";
import LuckyLogo from "../assets/Lucky_logo_black_bg.png";

import github_svg from "../assets/github.svg"
import discord_svg from "../assets/discord.svg"
import telegram_svg from "../assets/telegram.svg"
import x_svg from "../assets/x.svg"

import NetworkSelect from "./NetworkSelect.js";
import AccountSelect from "./AccountSelect.js";
import ExportedImage from "next-image-export-optimizer";
import { ApiContext } from "../context/ApiProvider.js";
import { useContext } from "react";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const headerStyle = {
  title: `col-span-3 sm:col-span-1 flex text-3xl text-white-700 text-center font-semibold  xs:min-w-full`,
  headwrapper: `grid grid-cols-3 p-4 `,
  buttonsContainer: `col-span-3 sm:col-span-2 flex justify-end items-center`,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const pathname = usePathname()
  const { network } = useContext(ApiContext);
  const raffle_url = network === undefined ? "/astar" : "/" + network;

  const navigation = [
    { name: 'The Raffle', href: '/', img:undefined, current:(pathname==="/"+network) },
    { name: 'Lotto', href: '/lotto/shibuya', img: undefined,current:pathname.startsWith("/lotto") },
    { name: 'About', href: '/wiki', img: undefined,current:pathname==="/wiki" },
    { name: '', href: 'https://discord.gg/R3jjRSZ6D9', img:discord_svg, blank:true, current: false },
    { name: '', href: 'https://twitter.com/LuckyDapp', img:x_svg, blank:true, current: false },
  ]

  //console.log("pathname",pathname)
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between ">
              
              <div className="flex flex-1 sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <ExportedImage
                    className="h-20 w-auto"
                    src={LuckyLogo}
                    alt="Lucky dApp"
                  />
                </div>
                <div className="inset-y-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
                <div className="pl-4 inset-y-0 flex items-center sm:inline-flex hidden">
                  <div className="self-center flex space-x-4">
                    {navigation.map((item) => {
                      return <a
                          key={item.name}
                          href={item.href}
                          target={item.blank?"_blank":"_self"}
                          className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-full px-3 py-2 text-sm font-medium cursor:pointer"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.img ? <ExportedImage
                          className="inline h-5 w-auto pb-1 invert"
                          src={item.img}
                          alt={item.name}
                        /> : null}{item.name}
                      </a>}
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                <NetworkSelect/>    
                <AccountSelect />

                {/* Profile dropdown */}
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.img ? <ExportedImage
                          className="inline h-4 w-auto invert"
                          src={item.img}
                          alt={item.name}
                        /> : null}{item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

/*

<div className={headerStyle.headwrapper}>
      <div className={headerStyle.title}>
        <a href={raffle_url}><ExportedImage className="mr-1" src={LuckyLogo} alt="Lucky" height={75} /></a>
      </div>
      
      <div className={headerStyle.buttonsContainer}>
        <NetworkSelect/>    
        <AccountSelect />
      </div>
    </div>

    */

/*
      <div className="sm:col-span-8 md:col-span-3 gd:col-span-3 flex justify-end items-center"> 
        <a className="pr-8" href={raffle_url}>The Lucky Raffle</a>
        <a className="pr-8" href="/wallets">Wallet Overview</a> 
        <a className="pr-8" href="/wiki">Docs</a> 
      </div>
      */

export default Header;
