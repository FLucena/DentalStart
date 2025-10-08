export default function Footer() {
    return (
      <footer className="bg-[#725A56] text-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-2 md:mb-0">&copy; Todos los derechos reservados - 2025</p>
          <div className="flex items-center text-sm">
            <i className="fas fa-phone mr-2"></i>
            <a href="tel:01154670433" className="hover:text-gray-300 transition-colors duration-200">
              011 5467-0433
            </a>
          </div>
        </div>
      </footer>
    );
  }
  