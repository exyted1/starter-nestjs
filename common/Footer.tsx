import { contrastify } from '@cardinal/common'
import { darken, lighten } from 'polished'
import {  FaGithub, FaGlobe, FaMedium, FaTelegram, FaTwitter } from 'react-icons/fa'

export const SOCIALS = {
  discord: { icon: <FaTelegram />, link: 'https://discord.gg/byq6uNTugq' },
  github: { icon: <FaGithub />, link: 'https://github.com/cardinal-labs' },
  medium: { icon: <FaMedium />, link: 'https://cardinal-labs.medium.com/' },
  twitter: { icon: <FaTwitter />, link: 'https://twitter.com/cardinal_labs' },
}
const logoImageUrl = 'https://www.minkspace.com/images/logo/mink.png';

export const Footer = ({
  bgColor = '#4706e2',
  accentColor = '#4706e2',
}: {
  bgColor?: string
  accentColor?: string
}) => {
  return (
    <div
      className="px-10 md:px-32"
      style={{
        background: darken(0.03, bgColor),
      }}
    >
       <div className="flex w-full flex-wrap items-start justify-between gap-10 py-10 ">
        <div className="flex items-center">
          {/* Use an img tag with the imported PNG image */}
          <img src={logoImageUrl} alt="Logo" className="img-container2" />
        </div>
        <div className="flex gap-10 self-end text-center md:gap-20">
          <span className="flex flex-col items-start gap-1">
            <div
              className="mb-2 text-lg font-semibold"
              style={{ color: contrastify(100, bgColor) }}
            >
              Resources
            </div>
            {/* <a href="https://docs.cardinal.so/" className="text-gray-400">
              Documentation
            </a> */}
            <a href="https://minkspace.com" className="text-gray-400">
              Home
            </a>
            <a href="https://mint.minkspace.com" className="text-gray-400">
              Minting
            </a>
            <a href="https://paper.minkspace.com" className="text-gray-400">
              Litepaper
            </a>
            {/* <a href="mailto:team@cardinal.so" className="text-gray-400">
              Contact
            </a> */}
            {/*<a href="" className="text-gray-400">
              Privacy
            </a> */}
          </span>
          {/* <span className="flex flex-col items-start">
            <div className="mb-5 text-lg font-semibold">Company</div>
            <a href="https://www.cardinal.so/" className="text-gray-400">
              Website
            </a>
            <a href="" className="text-gray-400">
              Blog
            </a>
            <a
              href="https://twitter.com/cardinal_labs"
              className="text-gray-400"
            >
              Twitter
            </a>
            <a
              href="https://discord.com/invite/byq6uNTugq"
              className="text-gray-400"
            >
              Discord
            </a>
          </span> */}
        </div>
      </div>
      <div
        className="text-md flex items-center justify-between border-t py-8 text-gray-400"
        style={{ borderColor: lighten(0.2, bgColor) }}
      >
        <div className="flex items-center justify-center gap-2 text-gray-400">
          MinkSpace
        </div>
        <div className="flex gap-4 text-gray-200">
        <a
            href="https://minkspace.com/"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors hover:text-primary`}
          >
            <FaGlobe />
          </a>
          <a
            href="https://t.me/minkspace_com"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors hover:text-primary`}
          >
            <FaTelegram  />
          </a>
          <a
            href="https://twitter.com/minkspace_com"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors hover:text-primary`}
          >
            <FaTwitter />
          </a>
        </div>
      </div>
      {/* <div className="text-md flex flex-row justify-center font-medium">
        Copyright 2022 Cardinal Labs. All rights reserved
      </div> */}
    </div>
  )
}
