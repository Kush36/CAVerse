// src/components/common/WhatsAppChat.js
export default function WhatsAppChat() {
  return (
    <>
      <a
        href="https://wa.me/918299XXXXXX?text=Hi%20CaVerse%20Team!%20I%20want%20to%20know%20more%20about%20the%20courses"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-green-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
            <i className="fab fa-whatsapp text-4xl text-white"></i>
          </div>
          <span className="absolute -top-10 right-0 bg-black/90 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
            Chat with us on WhatsApp
          </span>
        </div>
      </a>
    </>
  );
}