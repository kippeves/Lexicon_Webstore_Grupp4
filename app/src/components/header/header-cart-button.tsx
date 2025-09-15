
export default function HeaderCartButton() {
    return (
        <button className="ml-2 px-4 py-2 text-black rounded-md hover:bg-gray-100 hover:underline">
            <div className="flex flex-row content-center justify-center mr-2">
                <div className="flex flex-col content-center justify-center mr-4 rounded-full bg-gray-200 p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 16h9.45c.75 0 1.41-.41 1.75-1.03l3.24-6.16A1 1 0 0 0 21.7 7H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.16 17.37 5.76 18 6.5 18h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
                    </svg>
                </div>

                <div className="flex flex-col content-center justify-center text-left">
                    <span className="text-sm text-gray-500">Cart</span>
                    <span className="font-bold">$0</span>
                </div>
            </div>
        </button>
    );
}