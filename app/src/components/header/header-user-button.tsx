import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

export default function HeaderUserButton() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <div className="flex items-center">
            <button className="flex flex-row justify-center items-center cursor-pointer px-3 md:px-4 py-3 text-black rounded-md text-sm hover:bg-accent gap-1.5">
              <User size={28} />
              <span className="hidden md:inline font-bold text-left">
                Log in
              </span>
            </button>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
                userButtonBox:
                  "flex items-center p-2 hover:bg-[#f5f5f5] transition-all rounded-full",
              },
            }}
          />
        </div>
      </SignedIn>
    </>
  );
}
