import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black/90 text-gray-300 py-8 px-6 md:px-16 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-purple-400">ChatConnect</h3>
          <p className="text-sm text-gray-400 mt-2">
            Connecting people with fast, reliable and secure chat.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-purple-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Contacts" className="hover:text-purple-400">
                Contacts
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-purple-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-purple-400">
                Signup
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} ChatConnect. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
