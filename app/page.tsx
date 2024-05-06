/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3UuoudzNifO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unlock Your Potential with Intellecta
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Intellecta is a platform that connects you with like-minded individuals, provides a calendar of
                  engaging events, and facilitates meaningful discussions through our chat feature.
                </p>
              </div>
              <div>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/login"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4 text-center">
                <UsersIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold">Peer Groups</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect with like-minded individuals in our curated peer groups, fostering meaningful discussions and
                  collaborations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <CalendarIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold">Event Calendar</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay up-to-date with our comprehensive event calendar, featuring a variety of educational, networking,
                  and social gatherings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <MessageCircleIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
                <h3 className="text-xl font-bold">Chat</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage in real-time discussions with your peers, share ideas, and collaborate on projects through our
                  intuitive chat feature.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from our satisfied users about their experience with Intellecta.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    “Intellecta has been a game-changer for my personal and professional growth. The peer groups and
                    events have consistently provided valuable insights and connections.“
                  </blockquote>
                  <div>
                    <div className="font-semibold">Jane Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Entrepreneur, Acme Inc</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    “I&apos;ve been a member of Intellecta for over a year, and it&apos;s been an invaluable resource for me. The
                    chat feature has allowed me to connect with like-minded individuals and collaborate on projects.“
                  </blockquote>
                  <div>
                    <div className="font-semibold">John Smith</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer, Acme Inc</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    “Intellecta has been a game-changer for my personal and professional growth. The peer groups and
                    events have consistently provided valuable insights and connections.“
                  </blockquote>
                  <div>
                    <div className="font-semibold">Sarah Lee</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Marketing Manager, Acme Inc</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the Intellecta Community</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Sign up to stay updated on our latest features, events, and community updates.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Intellecta. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CalendarIcon({className}: {className: string}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function MessageCircleIcon({className}: {className: string}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function UsersIcon({className}: {className: string}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}