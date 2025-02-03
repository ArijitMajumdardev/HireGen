export default function Footer() {
    return (
      <footer className="py-10 px-6 bg-gray-900 text-white text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} ResumeGen. All rights reserved.</p>
  
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 text-sm">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 text-sm">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 text-sm">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  