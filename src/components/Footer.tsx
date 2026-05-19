import { labData } from "../data/mockData";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-bold text-primary mb-4">Biometamaterials Lab</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Innovative solutions through bio-inspired metamaterials and advanced biotechnology.
          </p>
          <div className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Biometamaterials Lab. All rights reserved.
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Contact Us</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>{labData.contact.address}</li>
            <li>TEL: {labData.contact.phone}</li>
            <li>EMAIL: {labData.contact.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2">
            <a href="/research" className="text-sm text-slate-500 hover:text-primary">Research</a>
            <a href="/member" className="text-sm text-slate-500 hover:text-primary">Members</a>
            <a href="/publication" className="text-sm text-slate-500 hover:text-primary">Publications</a>
            <a href="/contact" className="text-sm text-slate-500 hover:text-primary">Join Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
