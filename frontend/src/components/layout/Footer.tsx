import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Explore', to: '/explore' },
      { label: 'Learn', to: '/learn' },
      { label: 'Writing Lab', to: '/lab' },
      { label: 'Community', to: '/sabha' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Lipi Sabha', to: '/about' },
      { label: 'Guidelines', to: '/guidelines' },
      { label: 'Community Principles', to: '/about#principles' },
      { label: 'Accessibility', to: '/about#accessibility' },
    ],
  },
  {
    title: 'Contribute',
    links: [
      { label: 'Submit Content', to: '/contribute' },
      { label: 'Review Process', to: '/guidelines#reviews' },
      { label: 'Privacy', to: '/about#privacy' },
      { label: 'Documentation', to: '/guidelines#documentation' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
                ल
              </div>
              <span className="font-display text-lg font-bold text-white">
                Lipi Sabha
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Helping communities explore, compare, and make decisions about writing systems. The community is the decision-maker.
            </p>
            <p className="text-xs text-white/40 italic">
              Writing systems are explored here. Decisions belong to communities.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map(group => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 Lipi Sabha. Open-source platform for community-led writing system exploration.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Built with <Heart size={12} className="text-coral" /> for language communities
          </p>
        </div>
      </div>
    </footer>
  );
}
