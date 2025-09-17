import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <section className="flex flex-row justify-center items-center">
            <SignUp />
        </section>
    );
}