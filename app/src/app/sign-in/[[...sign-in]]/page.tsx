import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <section className="flex flex-row justify-center items-center">
            <SignIn />
        </section>
    );
}