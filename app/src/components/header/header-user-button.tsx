import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function HeaderUserButton() {
    return (
        <>
            <SignedOut>
                <SignInButton>
                    <button className="flex flex-row justify-center items-center cursor-pointer px-4 py-2 text-black rounded-md hover:bg-gray-100 hover:underline">
                        <Avatar className="w-12 h-12">
                            <AvatarImage />
                            <AvatarFallback className="bg-gray-300"></AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-bold text-left">Log in / Register</span>
                    </button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <button className="flex flex-row justify-center items-center cursor-pointer px-4 py-2 text-black rounded-md">
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: 'w-12 h-12',
                        },
                    }} />
                </button>
            </SignedIn>
        </>
    );
}