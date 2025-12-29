const HeroSection = () => {
  const customers = [
    {
      name: "Factory Weights",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      logo: "https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/spur-brand-logos/factory-weights-logo.png",
    },
    {
      name: "Mi Vida Loca Streetwear",
      flag: "🇳🇱",
      logo: "https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/spur-brand-logos/mi-vida-loca-logo.png",
    },
    {
      name: "Nickron",
      flag: "🇮🇳",
      logo: "https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/spur-brand-logos/nickron-logo.png",
    },
    {
      name: "50K.trade",
      flag: "🇦🇪",
      logo: "https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/spur-brand-logos/50k-logo.png",
    },
    {
      name: "Chunmun",
      flag: "🇮🇳",
      logo: "https://chunmun.in/cdn/shop/files/RsD9D4E8x-Chunmun_80x@2x.png?v=1745384053",
    },
    {
      name: "Jaipur Rugs",
      flag: "🇮🇳",
      logo: "https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/logos/jaipur-rugs-logo.webp",
    },
    {
      name: "Libas",
      flag: "🇮🇳",
      logo: "https://r2.spurnow.com/customers/libas-logo.webp",
    },
    {
      name: "Fashor",
      flag: "🇮🇳",
      logo: "https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/logos/fashor-logo.webp",
    },
  ];

  return (
    <div className="mx-auto mt-4 flex flex-col items-center text-center sm:mt-12">
      {/* Badges Section */}
      <div className="flex flex-col items-center justify-center gap-1.5 text-sm md:flex-row md:gap-2 md:text-base">
        {/* Meta Business Partner */}
        <div className="flex items-center justify-center gap-1.5 rounded-full border border-gray-300 px-1.5 py-0.5 md:gap-2 md:px-2 md:py-1">
          <img
            src="https://r2.spurnow.com/meta-icon.webp"
            alt="Meta Business Partner"
            className="h-3.5 w-3.5 md:h-4 md:w-4"
          />
          <span>Meta Business Partner</span>
        </div>

        {/* GDPR Compliant */}
        <div className="flex items-center justify-center gap-1.5 rounded-full border border-gray-300">
          <div className="flex h-5 items-center gap-1.5 rounded-l-full bg-[#2050E0] px-1.5 text-white md:h-6 md:gap-2 md:px-2">
            <svg
              viewBox="0 0 512 512"
              width="1.2em"
              height="1.2em"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path
                fill="currentColor"
                d="m256 46.305l-9.404 19.054l-21.03 3.056l15.217 14.832l-3.592 20.945L256 94.305l18.81 9.888l-3.593-20.945l15.217-14.832l-21.03-3.057zM167.566 72.63l-9.404 19.056l-21.03 3.056l15.218 14.832l-3.592 20.946l18.808-9.89l18.81 9.89l-3.593-20.946L198 94.742l-21.03-3.056l-9.404-19.055zm176.868 0l-9.405 19.056L314 94.742l15.217 14.832l-3.592 20.946l18.81-9.89l18.807 9.89l-3.592-20.946l15.217-14.832l-21.03-3.056l-9.403-19.055zm-243.868 67.425l-9.404 19.054l-21.03 3.056l15.218 14.832l-3.592 20.945l18.808-9.888l18.81 9.888l-3.593-20.945L131 162.166l-21.03-3.057l-9.404-19.055zm310.868 0l-9.405 19.054l-21.03 3.056l15.217 14.832l-3.592 20.945l18.81-9.888l18.807 9.888l-3.592-20.945l15.217-14.832l-21.03-3.057l-9.403-19.055zM76.566 228.55l-9.404 19.054l-21.03 3.056l15.218 14.832l-3.592 20.945l18.808-9.888l18.81 9.887l-3.593-20.945L107 250.66l-21.03-3.056l-9.404-19.055zm358.868 0l-9.405 19.054L405 250.66l15.217 14.832l-3.592 20.945l18.81-9.888l18.807 9.887l-3.592-20.945l15.217-14.832l-21.03-3.056l-9.403-19.055zm-334.868 89.897l-9.404 19.055l-21.03 3.057l15.218 14.83l-3.592 20.946l18.808-9.89l18.81 9.89l-3.593-20.945L131 340.56l-21.03-3.058zm310.868 0l-9.405 19.055L381 340.56l15.217 14.83l-3.592 20.946l18.81-9.89l18.807 9.89l-3.592-20.945l15.217-14.83l-21.03-3.058l-9.403-19.055zm-243.868 65.746l-9.404 19.055l-21.03 3.057l15.218 14.832l-3.592 20.945l18.808-9.89l18.81 9.89l-3.593-20.945L198 406.305l-21.03-3.057zm176.868 0l-9.405 19.055l-21.03 3.057l15.217 14.832l-3.592 20.945l18.81-9.89l18.807 9.89l-3.592-20.945l15.217-14.832l-21.03-3.057l-9.403-19.055zm-88.61 23.614l-9.404 19.056l-21.03 3.055l15.217 14.834l-3.59 20.943l.385-.203l-.035.203L256 455.898l18.633 9.797l-.035-.203l.386.203l-3.59-20.943l15.215-14.834l-21.03-3.055l-9.404-19.056l-.176.355l-.176-.355z"
              ></path>
            </svg>
          </div>
          <span className="px-1.5 md:px-2">GDPR Compliant</span>
        </div>

        {/* Shopify Partner */}
        <div className="flex items-center justify-center gap-1.5 rounded-full border border-gray-300 px-1.5 py-0.5 md:gap-2 md:px-2 md:py-1">
          <svg
            viewBox="0 0 256 292"
            width="1.06em"
            height="1.2em"
            className="h-3.5 w-3.5 md:h-4 md:w-4"
          >
            <path
              fill="#95BF46"
              d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805c-.19.056-3.388 1.043-8.678 2.68c-5.18-14.906-14.322-28.604-30.405-28.604c-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635c-14.558 4.511-24.9 7.718-26.221 8.133c-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042l89.77-19.42S223.973 58.8 223.775 57.34M156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023c0-9.264-1.286-16.723-3.349-22.636c8.287 1.04 13.806 10.469 17.358 21.32m-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238c0 .572-.005 1.095-.01 1.624c-9.117 2.824-19.024 5.89-28.953 8.966c5.575-21.516 16.025-31.908 25.161-35.828m-11.131-10.537c1.617 0 3.246.549 4.805 1.622c-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828"
            ></path>
            <path
              fill="#5E8E3E"
              d="M221.237 54.983a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233l89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
            ></path>
            <path
              fill="#FFF"
              d="m135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693c0 15.038 39.2 20.8 39.2 56.024c0 27.713-17.577 45.558-41.277 45.558c-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232c0-19.616-32.16-20.491-32.16-52.724c0-27.129 19.472-53.382 58.778-53.382c15.145 0 22.627 4.338 22.627 4.338"
            ></path>
          </svg>
          <span>Shopify Partner</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[65vh] w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 pt-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-left text-5xl tracking-tight text-gray-900 sm:text-6xl">
                Sell More. Support Better.
                <span className="block text-blue-600">
                  Automate Everything.
                </span>
              </h1>
              <p className="mt-6 text-left text-lg leading-8 text-gray-600">
                Spur is a multi-channel AI Agent for marketing and customer
                support. Helps you sell more and support better.
              </p>
              <div className="mt-10 flex flex-col gap-6">
                <button className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-lg text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  <svg
                    viewBox="0 0 256 256"
                    width="1.2em"
                    height="1.2em"
                    className="h-5 w-5"
                  >
                    <path
                      fill="currentColor"
                      d="M197.58 129.06L146 110l-19-51.62a15.92 15.92 0 0 0-29.88 0L78 110l-51.62 19a15.92 15.92 0 0 0 0 29.88L78 178l19 51.62a15.92 15.92 0 0 0 29.88 0L146 178l51.62-19a15.92 15.92 0 0 0 0-29.88ZM137 164.22a8 8 0 0 0-4.74 4.74L112 223.85L91.78 169a8 8 0 0 0-4.78-4.78L32.15 144L87 123.78a8 8 0 0 0 4.78-4.78L112 64.15L132.22 119a8 8 0 0 0 4.74 4.74L191.85 144ZM144 40a8 8 0 0 1 8-8h16V16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0V48h-16a8 8 0 0 1-8-8m104 48a8 8 0 0 1-8 8h-8v8a8 8 0 0 1-16 0v-8h-8a8 8 0 0 1 0-16h8v-8a8 8 0 0 1 16 0v8h8a8 8 0 0 1 8 8"
                    ></path>
                  </svg>
                  Try For Free
                </button>
                <a
                  href="/live-demo"
                  className="w-fit text-lg leading-6 text-blue-600 hover:text-blue-500"
                >
                  Book Live Demo ↗
                </a>
              </div>
            </div>

            {/* Right Content - Image with Icons */}
            <div className="relative lg:mt-0">
              <div className="relative mx-auto aspect-[520/540] w-full max-w-[520px]">
                <img
                  src="https://s3.eu-central-1.amazonaws.com/cdn.spurnow.com/live-chat-ai-preview.webp"
                  alt="AI Chat Preview"
                  className="h-full w-full object-contain"
                />
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:right-4 sm:gap-3">
                  {/* Social Media Icons */}
                  {["globe"].map((icon, index) => (
                    <button
                      key={icon}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-xl transition-transform hover:scale-105 sm:h-14 sm:w-14 ${
                        index === 0 ? "ring-2 ring-blue-500" : "opacity-25"
                      }`}
                    >
                      {getSocialIcon(icon)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section id="customers" className="px-4">
        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {customers.map((customer, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1.5 shadow-sm sm:gap-2 sm:px-4 sm:py-2"
            >
              <img
                className="h-5 w-5 rounded-full object-contain sm:h-6 sm:w-6"
                src={customer.logo}
                alt={customer.name}
              />
              <span className="text-sm font-medium sm:text-base">
                {customer.name}
              </span>
              <span className="text-xs sm:text-sm">{customer.flag}</span>
              <svg
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
                className="h-3.5 w-3.5 text-blue-500 sm:h-4 sm:w-4"
              >
                <path
                  fill="currentColor"
                  d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68zm-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"
                ></path>
              </svg>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-gray-600 sm:mt-8 sm:text-base">
          Trusted by 1000s of businesses worldwide
        </p>
      </section>
    </div>
  );
};

// Helper function to render social icons
const getSocialIcon = (icon: any) => {
  switch (icon) {
    case "globe":
      return (
        <svg
          viewBox="0 0 256 256"
          width="1.2em"
          height="1.2em"
          className="h-5 w-5 sm:h-7 sm:w-7"
        >
          <path
            fill="currentColor"
            d="M128 24a104 104 0 1 0 104 104A104.12 104.12 0 0 0 128 24m87.62 96h-39.83c-1.79-36.51-15.85-62.33-27.38-77.6a88.19 88.19 0 0 1 67.22 77.6ZM96.23 136h63.54c-2.31 41.61-22.23 67.11-31.77 77c-9.55-9.9-29.46-35.4-31.77-77m0-16c2.31-41.61 22.23-67.11 31.77-77c9.55 9.93 29.46 35.43 31.77 77Zm11.36-77.6C96.06 57.67 82 83.49 80.21 120H40.37a88.19 88.19 0 0 1 67.22-77.6M40.37 136h39.84c1.82 36.51 15.85 62.33 27.38 77.6A88.19 88.19 0 0 1 40.37 136m108 77.6c11.53-15.27 25.56-41.09 27.38-77.6h39.84a88.19 88.19 0 0 1-67.18 77.6Z"
          ></path>
        </svg>
      );
    case "whatsapp":
      return (
        <svg
          viewBox="0 0 256 258"
          width="1.2em"
          height="1.2em"
          className="h-5 w-5 sm:h-7 sm:w-7"
        >
          <defs>
            <linearGradient
              id="logosWhatsappIcon0"
              x1="50%"
              x2="50%"
              y1="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#1FAF38"></stop>
              <stop offset="100%" stopColor="#60D669"></stop>
            </linearGradient>
            <linearGradient
              id="logosWhatsappIcon1"
              x1="50%"
              x2="50%"
              y1="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#F9F9F9"></stop>
              <stop offset="100%" stopColor="#FFF"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#logosWhatsappIcon0)"
            d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
          ></path>
          <path
            fill="url(#logosWhatsappIcon1)"
            d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
          ></path>
          <path
            fill="#FFF"
            d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
          ></path>
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 256 256"
          width="1.2em"
          height="1.2em"
          className="h-5 w-5 sm:h-7 sm:w-7"
        >
          <g fill="none">
            <rect
              width="256"
              height="256"
              fill="url(#skillIconsInstagram0)"
              rx="60"
            ></rect>
            <rect
              width="256"
              height="256"
              fill="url(#skillIconsInstagram1)"
              rx="60"
            ></rect>
            <path
              fill="#fff"
              d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563Zm62.351 16.604c-6.625 0-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"
            ></path>
          </g>
        </svg>
      );
    case "messenger":
      return (
        <svg
          viewBox="0 0 256 256"
          width="1.2em"
          height="1.2em"
          className="h-5 w-5 sm:h-7 sm:w-7"
        >
          <defs>
            <radialGradient
              id="logosMessenger0"
              cx="19.247%"
              cy="99.465%"
              r="108.96%"
              fx="19.247%"
              fy="99.465%"
            >
              <stop offset="0%" stopColor="#09F"></stop>
              <stop offset="60.975%" stopColor="#A033FF"></stop>
              <stop offset="93.482%" stopColor="#FF5280"></stop>
              <stop offset="100%" stopColor="#FF7061"></stop>
            </radialGradient>
          </defs>
          <path
            fill="url(#logosMessenger0)"
            d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835c2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.22 10.22 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92c72.106 0 128-52.818 128-124.16S200.106 0 128 0"
          ></path>
          <path
            fill="#FFF"
            d="m51.137 160.47l37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085"
          ></path>
        </svg>
      );
    default:
      return null;
  }
};

export default HeroSection;
