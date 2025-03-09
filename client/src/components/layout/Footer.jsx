import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary-foreground text-muted-foreground border-t border-gray-700">
      <div className="container mx-auto py-10 px-4 text-center">
        {/* Copyright & Info */}
        <p className="text-sm md:text-base">
          <span className="font-semibold hover:text-white transition">
            Ahmad Fiqri Oemry
          </span>{" "}
          &copy; {new Date().getFullYear()}
        </p>
        <p className="text-xs md:text-sm mt-1 opacity-75">
          Created with ReactJS
        </p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
