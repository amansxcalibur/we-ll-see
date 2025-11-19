'use client'

import { useState } from "react";
import Post from "./post";
import ImageIcon from "./svg/image";
import Clip from "./svg/clip";
import Plus from "./svg/plus";
import Send from "./svg/send";

export default function ActionBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-xl flex flex-col gap-2 py-2">
      {/* --- Action Buttons --- */}
      <div className="flex justify-end gap-1 min-h-20 text-stone-500 sticky top-2">
        <button
          onClick={() => setOpen(true)}
          className="size-20 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition backdrop-blur-sm"
        >
          <ImageIcon/>
        </button>

        {/* Clip / Attach */}
        <button
          onClick={() => setOpen(true)}
          className="size-20 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition backdrop-blur-sm"
        >
          <Clip/>
        </button>

        {/* Add (+) */}
        <button
          onClick={() => setOpen(true)}
          className="size-20 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition backdrop-blur-sm"
        >
          <Plus/>
        </button>

        {/* Send */}
        <button
          onClick={() => setOpen(true)}
          className="size-20 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-neutral-800 transition backdrop-blur-sm"
        >
          <Send/>
        </button>
      </div>

      {/* --- Popup Modal --- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/80 backdrop-blur-[200px] border border-neutral-800 rounded-2xl p-6 w-full size-[40vw] max-w-[40vw] shadow-xl animate-fadeIn flex flex-col gap-y-[0.5vw]">
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>

            <div className="border min-h-[20vw] border-neutral-800 rounded-2xl"></div>

            <div className="flex items-center"><div className="min-h-[2vw] p-[1.5vw] border-neutral-800 rounded-2xl border">Start date</div></div>

            <textarea
              className="w-full h-32 border border-neutral-800 rounded-xl p-3 outline-none focus:border-neutral-800"
              placeholder="What are you planning to do?"
            ></textarea>

            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-white hover:bg-neutral-800 transition"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
      {/* FEED POSTS */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, index) => (
        <Post key={index} />
      ))}
    </div>
  );
}
