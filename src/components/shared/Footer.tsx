import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="mb-4">About MannoDhara</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A comprehensive mental health support platform designed specifically for university students, providing accessible and confidential resources.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Resources</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Book Appointment</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Self-Assessments</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Crisis Resources</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">support@mannodhara.edu</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">1-800-MannoDhara</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">University Campus, Student Wellness Center</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} MannoDhara. All rights reserved. | University Mental Health Initiative</p>
          <p className="mt-2">
            <span className="text-destructive">Crisis Hotline:</span> Available 24/7 at 988
          </p>
        </div>
      </div>
    </footer>
  );
}
