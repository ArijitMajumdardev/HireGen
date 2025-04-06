import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CS Student",
    message:
      "HireGen helped me prep for my internship interviews like a breeze. The AI feedback is actually helpful!",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Aarav Mehta",
    role: "Final Year, ECE",
    message:
      "Loved the mock interview voice agents. Way better than practicing alone. 10/10 would recommend.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Ritika Desai",
    role: "Aspiring Data Scientist",
    message:
      "The resume builder is 🔥! Simple UI and powerful AI suggestions made my resume stand out.",
    avatar: "https://i.pravatar.cc/100?img=56",
  },
];

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-24 px-6  text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        What Users Say
      </h2>

      {/* Mobile Carousel */}
      {isMobile ? (
        <motion.div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar px-1 "
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="min-w-[85%] bg-[#272533] backdrop-blur-md p-6 rounded-3xl shadow-md border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{t.message}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // Desktop Grid
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#1e1c2a]/60 backdrop-blur-md p-6 rounded-3xl shadow-md border border-white/10"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{t.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
