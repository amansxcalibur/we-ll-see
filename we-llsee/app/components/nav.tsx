import Image from "next/image"
import profilePic from "@/public/Assets/modernart-cropped.png"
import Link from "next/link"

export default function NavBar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%]">
          <div className="border border-white/20 shadow-lg
                      rounded-full px-6 py-3 flex items-center justify-between">

            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl tracking-wide">We'llSEE</span>
            </div>

            <ul className="flex gap-10 text-xl font-medium">
              <li className="hover:bg-white/20 px-4 py-1 rounded-full cursor-pointer transition">
                <Link href={"/"}> Home
                </Link>
              </li>

              <li className="hover:bg-white/20 px-4 py-1 rounded-full cursor-pointer transition">
                Leaderboard
              </li>

              <li className="hover:bg-white/20 px-4 py-1 rounded-full cursor-pointer transition">
                Thing
              </li>

            </ul>
            <div className="flex gap-4">
              <button className="px-5 py-2 rounded-full bg-black border border-gray-800 text-white text-lg font-medium transition">
                Contribute on GitHub ★
              </button>
              <Link className="" href={"/profile"} >
                  <Image src={profilePic} title="profile" alt="profile picture" className="rounded-full border-white shadow-lg h-11 w-11" />
              </Link>
            </div>
          </div>
        </nav>

    )
}