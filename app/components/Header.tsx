import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-[#604D44] text-white shadow-md">
      <nav className="flex flex-wrap justify-between items-center h-full px-4 py-2 sm:py-0 sm:h-16">
        <div className="flex justify-center space-x-8 w-full sm:w-auto">
          <Link href="/" className="no-underline text-white hover:text-gray-300">Inicio</Link>
          <Link href="/contacto/" className="no-underline text-white hover:text-gray-300">Quiero saber más</Link>
        </div>
        <div className="flex justify-center sm:justify-end space-x-4 mt-4 sm:mt-0 w-full sm:w-auto">
          <a
            href="https://www.instagram.com/dental.start/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white no-underline hover:text-gray-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=54111554670433"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white no-underline hover:text-gray-300"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;