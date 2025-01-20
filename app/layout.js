'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./lib/AuthContext";
import "./globals.css";
import Links from "./components/links";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen"> {/* Flex container for full screen */}
            {/* Navbar */}
            <div className="navbar bg-base-200 px-10 py-4 w-full">
              <div className="flex items-center justify-between w-full">
                <a className="btn btn-ghost text-xl">
                  WSEI - Frameworki frontendowe
                </a>
                <div className="flex-none">
                  <div className="drawer drawer-end">
                    <input
                      id="my-drawer-4"
                      type="checkbox"
                      className="drawer-toggle"
                    />
                    <div className="drawer-content">
                      <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block h-5 w-5 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          ></path>
                        </svg>
                      </label>
                    </div>
                    <div className="drawer-side" style={{ zIndex: 2 }}>
                      <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                      ></label>
                      <Links />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-white text-gray-600 body-font py-7 w-full">
              <div className="flex items-center justify-between px-10 mx-auto sm:flex-row flex-col w-full">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  <span className="ml-3 text-xl">WSEI - Frameworki frontendowe</span>
                </a>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                  2025 —
                  <a
                    href="https://github.com/kacperj17/frontent-laby"
                    className="text-gray-600 ml-1"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Kacper Jewuła
                  </a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
