import { useTranslation } from "react-i18next";
import { anachakCate, anachakMenus } from "../data/anachak";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Anachak = () => {
  const { i18n } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const categoryRefs = useRef([]);

  // Toggle Language Function
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "km" : "en";
    i18n.changeLanguage(newLang);
  };

  // Scroll to the category
  const scrollToCategory = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open portal with the selected menu
  const openPortal = (menu) => {
    setSelectedMenu(menu);
    setIsPortalOpen(true);
  };

  // Close the portal
  const closePortal = () => {
    setIsPortalOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter menus based on search term
  const filteredMenus = anachakMenus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex justify-center items-start">
      <div className="w-full sm:w-[390px] bg-white font-khmer h-screen">
        <nav className="p-3 bg-orange-400 sticky top-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/anachak/logo.png" className="rounded-full h-16" />
              <h1 className="font-bold font-khmer text-xl text-white">
                NhamSalmon
              </h1>
            </div>
            <button onClick={toggleLanguage}>
              {i18n.language === "en" ? (
                <img
                  src="/anachak/engflag.png"
                  className="h-6 w-9 rounded-md cursor-pointer"
                />
              ) : (
                <img
                  src="/anachak/khflag.png"
                  className="h-6 w-9 rounded-md cursor-pointer"
                />
              )}
            </button>
          </div>
          <div
            id="menu"
            className="flex w-full space-x-3 overflow-x-scroll py-3 scrollbar-custom"
          >
            {anachakCate.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToCategory(i)}
                className="font-bold bg-white rounded-full min-w-20 px-1 py-1 flex justify-center items-center"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="relative mt-3">
            <input
              type="text"
              placeholder={i18n.language === "en" ? "Search..." : "ស្វែងរក..."}
              className="w-full pl-3 pr-10 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </nav>
        <main className="flex flex-col overflow-y-scroll h-[690px] scrollbar-custom-y">
          {anachakCate.map((a, i) => (
            <div
              key={i}
              ref={(el) => (categoryRefs.current[i] = el)}
              className="w-full"
            >
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 flex-grow"></div>
                <h2 className="mx-4 font-bold text-black">{a.name}</h2>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 overflow-hidden px-3">
                {filteredMenus
                  .filter((b) => b.type === a.name)
                  .map((b, j) => (
                    <div
                      key={j}
                      onClick={() => openPortal(b)}
                      className="rounded-lg shadow-3xl cursor-pointer"
                    >
                      <img
                        className="rounded-t-lg"
                        src={b.imageLink}
                        alt={b.imageLink}
                      />
                      <h3 className="font-medium">{b.name}</h3>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </main>
        <div className="flex flex-col gap-1 justify-center items-center pb-9 pt-6">
          <h1 className="font-bold text-sm">POWER BY</h1>
          <img
            src="/anachak/image.png"
            alt="logo.png"
            className="rounded-full h-16"
          />
          <h1 className="text-xs">DIGITAL MENU</h1>
        </div>
      </div>
      {/* Portal for menu details */}
      <AnimatePresence>
        {isPortalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          >
            <div className="bg-white rounded-lg w-80 text-center relative">
              <button
                onClick={closePortal}
                className="absolute top-2 right-2 text-gray-700 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-red-600"
                >
                  <path
                    fill="currentColor"
                    d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                  />
                </svg>
              </button>
              {selectedMenu && (
                <>
                  <img
                    src={selectedMenu.imageLink}
                    alt={selectedMenu.name}
                    className="rounded-lg w-full"
                  />
                  <h3 className="font-bold text-xl mt-3 font-khmer">
                    {selectedMenu.name}
                  </h3>
                  <div className="flex justify-around mt-4 pb-3">
                    <a href="#" className="text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="#1877F2"
                          d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                        />
                        <path
                          fill="#FFF"
                          d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                        />
                      </svg>

                      {/* Social Media Icon */}
                    </a>
                    <a href="#" className="text-pink-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                      >
                        <g fill="none">
                          <rect
                            width="256"
                            height="256"
                            fill="url(#skillIconsInstagram0)"
                            rx="60"
                          />
                          <rect
                            width="256"
                            height="256"
                            fill="url(#skillIconsInstagram1)"
                            rx="60"
                          />
                          <path
                            fill="#fff"
                            d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"
                          />
                          <defs>
                            <radialGradient
                              id="skillIconsInstagram0"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#FD5" />
                              <stop offset=".1" stopColor="#FD5" />
                              <stop offset=".5" stopColor="#FF543E" />
                              <stop offset="1" stopColor="#C837AB" />
                            </radialGradient>
                            <radialGradient
                              id="skillIconsInstagram1"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#3771C8" />
                              <stop offset=".128" stopColor="#3771C8" />
                              <stop
                                offset="1"
                                stopColor="#60F"
                                stopOpacity="0"
                              />
                            </radialGradient>
                          </defs>
                        </g>
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                      >
                        <defs>
                          <linearGradient
                            id="logosTelegram0"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#2AABEE" />
                            <stop offset="100%" stopColor="#229ED9" />
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#logosTelegram0)"
                          d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.04 128.04 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51s-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0"
                        />
                        <path
                          fill="#FFF"
                          d="M57.94 126.648q55.98-24.384 74.64-32.152c35.56-14.786 42.94-17.354 47.76-17.441c1.06-.017 3.42.245 4.96 1.49c1.28 1.05 1.64 2.47 1.82 3.467c.16.996.38 3.266.2 5.038c-1.92 20.24-10.26 69.356-14.5 92.026c-1.78 9.592-5.32 12.808-8.74 13.122c-7.44.684-13.08-4.912-20.28-9.63c-11.26-7.386-17.62-11.982-28.56-19.188c-12.64-8.328-4.44-12.906 2.76-20.386c1.88-1.958 34.64-31.748 35.26-34.45c.08-.338.16-1.598-.6-2.262c-.74-.666-1.84-.438-2.64-.258c-1.14.256-19.12 12.152-54 35.686c-5.1 3.508-9.72 5.218-13.88 5.128c-4.56-.098-13.36-2.584-19.9-4.708c-8-2.606-14.38-3.984-13.82-8.41c.28-2.304 3.46-4.662 9.52-7.072"
                        />
                      </svg>
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Anachak;
