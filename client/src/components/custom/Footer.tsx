export default function Footer() {
  return (
    <footer className="bg-[#05021E] text-white  py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-1">HireGen</h3>
          <p className="text-sm text-gray-400">Empowering your career with AI tools.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-800 my-8"></div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} HireGen. All rights reserved.
      </div>
    </footer>
  );
}
