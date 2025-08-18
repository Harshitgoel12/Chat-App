import { Link } from "react-router-dom";
import "./App.css";
import chatImg from "./chats.png";

function Home() {
  return (
    <>
      <div className="overflow-x-hidden bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 md:py-28">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Connect, Chat & Collaborate with{" "}
              <span className="text-purple-400">ChatConnect</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              A real-time messaging platform built with using the MERN Stack,
              WebSockets, and modern UI/UX principles.
            </p>
            <div className="space-x-4">
              <Link
                to={"/Contacts"}
                className="bg-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to={"/login"}
                className="bg-white font-semibold text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition shadow-lg"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 mt-16 flex items-center justify-center">
            <img
              src={chatImg}
              alt="chat"
              className="w-[320px] md:w-[400px] rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.8)]"
            />
          </div>
        </div>

        <section className="px-10 py-16 bg-gradient-to-r from-purple-800/30 via-black to-indigo-800/20">
          <h2 className="text-4xl font-bold text-center mb-12">
             Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/10 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-3"> Real-Time Chat</h3>
              <p className="text-gray-300">
                Experience instant messaging with WebSocket-powered connections.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-3">🔒 Secure</h3>
              <p className="text-gray-300">
                End-to-end authentication with JWT & bcrypt password hashing.
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl shadow-lg hover:scale-105 transition">
              <h3 className="text-2xl font-semibold mb-3">🌐 Cross-Platform</h3>
              <p className="text-gray-300">
                Responsive design ensures seamless experience on web & mobile.
              </p>
            </div>
          </div>
        </section>

        <section className="px-10 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">📖 About ChatConnect</h2>
            <p className="text-gray-300 text-lg">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, molestiae.
              <span className="text-purple-400 font-semibold">Lorem, ipsum dolor.</span>{" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque doloribus aperiam ullam accusamus accusantium molestias ea mollitia eum quas labore!
            </p>
          </div>
        </section>

        <section className="px-10 py-16 bg-gradient-to-r from-purple-900/30 via-black to-blue-900/20">
          <h2 className="text-4xl font-bold text-center mb-12">Tech Stack</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/10 rounded-xl shadow-lg">MongoDB</div>
            <div className="p-6 bg-white/10 rounded-xl shadow-lg">Express.js</div>
            <div className="p-6 bg-white/10 rounded-xl shadow-lg">React.js</div>
            <div className="p-6 bg-white/10 rounded-xl shadow-lg">Socket.IO
</div>
          </div>
        </section>

        <section className="px-10 py-20 text-center">
          <h2 className="text-4xl font-bold mb-10">💬 What Users Say</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="p-6 bg-white/10 rounded-xl shadow-md">
              <p className="text-gray-300 italic">
                "This is one of the smoothest chat apps I’ve ever used. Super
                fast and secure!"
              </p>
              <h4 className="mt-3 font-semibold">– A Happy User</h4>
            </div>
            <div className="p-6 bg-white/10 rounded-xl shadow-md">
              <p className="text-gray-300 italic">
                "The UI feels premium, and the real-time updates are flawless."
              </p>
              <h4 className="mt-3 font-semibold">– Tech Enthusiast</h4>
            </div>
          </div>
        </section>

        <section className="px-10 py-20 bg-gradient-to-r from-purple-800 to-indigo-900 text-center">
          <h2 className="text-4xl font-bold mb-6">
             Ready to Start Chatting?
          </h2>
          <p className="text-gray-300 mb-6">
            Join now and experience the next-gen messaging platform.
          </p>
          <Link
            to={"/signup"}
            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition shadow-lg"
          >
            Create Account
          </Link>
        </section>
      </div>
    </>
  );
}

export default Home;
