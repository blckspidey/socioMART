import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, ShoppingBag } from "lucide-react";
import PageContainer from "./PageContainer";

export default function Footer() {
  return (
    <footer className="relative bg-gray-50 border-t border-gray-200">
      <PageContainer className="pt-20 pb-10">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
             <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl -z-10" />
          </div>
              <span className="text-lg font-bold text-gray-900">
                socio<span className="text-primary">MART</span>
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              A social-first marketplace where local businesses grow through
              discovery, trust, and community.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="#" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="#" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Sellers */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Sellers
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="#" className="hover:text-primary">
                  Start Selling
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-gray-200" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SocioMart. Made with ❤️ for local
            businesses by GD.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-500 hover:text-primary"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-500 hover:text-primary"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-primary"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
