'use client'

import Link from "next/link"
import GitLogo from "./git-logo"

export default function Footer() {

    return (
        <footer>
            <nav className="flex items-center text-center justify-between px-8 py-6 bg-gray-800 text-white">
                <Link href="https://www.thewhitefoxdev.com/blog/next-shopping-cart-zustand">
                    theWhiteFox dev blog Post
                </Link>
                <Link href="https://github.com/theWhiteFox/web-front-end-developer-test">
                    <GitLogo />
                </Link>
            </nav>
        </footer>
    )
}