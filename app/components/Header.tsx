import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full h-16 bg-[#604D44] text-white shadow-md">
      <nav className="flex justify-center items-center h-full space-x-16">
        <Link href="/" className="no-underline text-white hover:text-gray-300">Inicio</Link>
        <Link href="/enconstruccion/" className="no-underline text-white hover:text-gray-300">Publicaciones</Link>
        <Link href="/contacto/" className="no-underline text-white hover:text-gray-300">Quiero saber más</Link>
        <div className="socialmedia flex space-x-4">
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