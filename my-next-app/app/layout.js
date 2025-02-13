import "./globals.css"; // Your global styles
import AppContextProvider from "../Store/AppContext.jsx";
import { Dangrek } from "next/font/google"; // Import Dangrek font
import { Toaster } from "react-hot-toast";

// Initialize Dangrek font
const dangrek = Dangrek({
  subsets: ["latin"],
  weight: "400", // You can adjust the weight if needed
});

// Metadata for the page
export const metadata = {
  title: "sdsds Page",
  description: "A demo application built with Next.js",
  icons: {
    icon: "/nextjs-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={`bg-white ${dangrek.className}`}>
          {/* Modal for mobile screens */}
          <div className="lg:hidden flex justify-center items-center w-full">
            <div
              id="popup-modal"
              tabIndex="-1"
              className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-xl font-normal text-white">
                      This Application Is Only For Web User's Open It On A Large
                      Screen 😊😊 !!
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content for large screens */}
          <div className="hidden lg:block">
            <Toaster />
            {children}
          </div>
        </body>
      </AppContextProvider>
    </html>
  );
}
