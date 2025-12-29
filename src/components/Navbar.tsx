import React, { useState } from "react";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

interface LanguageOption {
  value: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const languages: LanguageOption[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "pt", label: "Português" },
    { value: "fr", label: "Français" },
    { value: "nl", label: "Nederlands" },
    { value: "id", label: "Bahasa Indonesia" },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const SpurLogo: React.FC = () => (
    <svg
      className="text-primary h-6 w-6"
      viewBox="0 0 143 180"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M97.6942 41.4769C102.953 41.4769 107.908 41.3299 112.848 41.5225C117.276 41.6947 121.897 41.5427 126.077 42.7536C138.363 46.3154 145.208 59.2401 141.753 71.6125C137.137 88.1547 132.521 104.702 127.683 121.178C120.63 145.189 99.1027 161.087 73.6333 161.285C64.7922 161.356 55.9512 161.244 47.1101 161.366C45.8282 161.386 44.3134 161.964 43.3305 162.795C38.4311 166.919 33.6889 171.225 28.8706 175.451C19.2037 183.922 4.17133 179.322 0.903426 166.863C0.589302 165.662 0.538637 164.365 0.538637 163.109C0.523438 130.171 0.523438 97.2339 0.523438 64.3015C0.523438 53.3933 9.27838 43.2755 20.1157 41.9582C24.5235 41.4211 29.0074 41.4769 33.9017 41.2438C33.9017 38.6295 33.6585 35.8581 33.9574 33.1526C34.4032 29.1602 34.7224 25.031 36.0093 21.2767C40.7415 7.48559 54.8213 -1.12749 69.3774 0.438064C83.6346 1.97322 95.6625 13.6465 97.3953 27.853C97.8107 31.2729 97.6131 34.7688 97.6891 38.2292C97.7094 39.2223 97.6891 40.2153 97.6891 41.4769H97.6942ZM13.2353 113.634C13.2353 129.503 13.2455 145.371 13.2252 161.244C13.2252 163.418 13.6711 165.343 15.8041 166.301C17.9269 167.253 19.6445 166.351 21.2759 164.882C26.3526 160.322 31.5255 155.874 36.597 151.309C38.9834 149.161 41.6788 148.223 44.8707 148.244C54.5477 148.304 64.2248 148.309 73.9018 148.254C93.4231 148.142 109.702 136.018 115.245 117.216C119.956 101.236 124.197 85.1199 129.015 69.1705C131.478 61.0134 125.388 54.432 118.031 54.4877C87.1457 54.7056 56.2602 54.6904 25.3747 54.4877C19.1277 54.4472 13.1036 58.4092 13.1897 66.7791C13.3468 82.3941 13.2353 98.0091 13.2353 113.629V113.634ZM86.8974 41.3553C86.8974 37.9354 87.0089 34.7384 86.8772 31.5516C86.5175 22.8321 81.0051 15.3032 73.0456 12.471C64.6352 9.4818 55.8042 11.8175 49.8764 18.5103C43.9536 25.1981 44.6984 33.2286 45.0176 41.3553H86.8924H86.8974Z"
        fill="currentColor"
      ></path>
      <path
        d="M97.6635 97.9939C96.7869 114.572 84.4702 127.643 69.6405 129.148C52.3384 130.901 37.7823 119.359 34.636 103.825C34.1698 101.53 33.9621 99.144 33.957 96.7982C33.952 93.6164 36.3586 91.2199 39.2668 91.1541C42.104 91.0882 44.4194 93.2161 44.8045 96.3219C45.0325 98.156 44.9514 100.051 45.3516 101.839C47.7278 112.423 57.1617 119.344 67.8065 118.427C78.208 117.53 86.431 108.715 86.9022 97.9432C86.9326 97.2694 86.8768 96.5854 86.9528 95.9217C87.2568 93.2415 89.633 91.1439 92.3031 91.1591C94.8667 91.1743 97.1771 93.1503 97.5469 95.7291C97.6888 96.7222 97.6533 97.7456 97.6635 97.9939V97.9939Z"
        fill="currentColor"
      ></path>
    </svg>
  );

  return (
    <header className="border-b border-gray-100 bg-white/95 backdrop-blur-xl sticky top-0 z-50">
      <nav
        className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <SpurLogo />
            <span className="text-blue-600 text-base font-semibold">Spur</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-1">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
          >
            Products
          </Link>

          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
          >
            Industries
          </Link>

          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
          >
            Pricing
          </Link>

          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
          >
            Resources
          </Link>

          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
          >
            Tools
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-1 justify-end">
          <div className="mr-4 flex items-center gap-4">
            <div className="hidden lg:block">
              <div className="relative">
                <select
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  aria-label="Select language"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <FaGlobe className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md"
            >
              <span>Log in</span>
              <FaArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleMobileLinkClick}
            >
              Products
            </Link>

            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleMobileLinkClick}
            >
              Industries
            </Link>

            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleMobileLinkClick}
            >
              Pricing
            </Link>

            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleMobileLinkClick}
            >
              Resources
            </Link>

            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={handleMobileLinkClick}
            >
              Tools
            </Link>

            <Link
              to="/"
              className="block rounded-lg px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 text-center mt-2"
              onClick={handleMobileLinkClick}
            >
              Log in
            </Link>

            {/* Mobile Language Selector */}
            <div className="py-2">
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  aria-label="Select language"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <FaGlobe className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
