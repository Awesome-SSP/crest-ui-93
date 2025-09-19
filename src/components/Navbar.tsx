import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getInitials } from '../lib/getInitials';
import { Button } from './ui/button';
import { Command } from 'lucide-react';
import { CommandNavigation } from './command-navigation';

type LinkItem = { label: string; to: string; icon?: React.ReactNode };

export default function NavBar({
  logoSrc = '/placeholder-logo.svg',
  logoAlt = 'App',
  links = [
    { label: 'Dashboard', to: '/' },
    { label: 'Accounts', to: '/accounts' },
    { label: 'Transactions', to: '/transactions' },
    { label: 'Reports', to: '/reports' },
    { label: 'Help', to: '/help' },
  ],
  currentTheme,
  onThemeChange,
  user,
  onSignOut,
}: {
  logoSrc?: string;
  logoAlt?: string;
  links?: LinkItem[];
  currentTheme?: 'light' | 'dark';
  onThemeChange?: (t: 'light' | 'dark') => void;
  user?: { name: string; avatarUrl?: string };
  onSignOut?: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(true);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setAvatarOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // If logoSrc looks like a Windows Temp ScreenClip path or local absolute file path,
    // don't attempt to load it (it will show a broken image). Treat those as invalid and
    // fall back to the text/SVG logo immediately.
    try {
      const lower = String(logoSrc || "").toLowerCase();
      if (lower.includes('screenclip') || lower.includes('tempstate') || /^([a-z]:\\)/i.test(logoSrc)) {
        setLogoLoaded(false);
      }
    } catch (e) {
      // ignore
    }

    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(target)) {
        setMobileOpen(false);
      }
      if (avatarOpen && avatarRef.current && !avatarRef.current.contains(target)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [mobileOpen, avatarOpen]);

  function toggleTheme() {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    if (onThemeChange) onThemeChange(next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }

  return (
    <header className="bg-white dark:bg-slate-900 border-b dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            {logoLoaded && (
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-8 w-auto"
                onError={() => setLogoLoaded(false)}
              />
            )}
            {!logoLoaded && (
              <div className="h-8 flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <span className="text-primary-foreground font-bold text-sm">P</span>
                </div>
                <span className="text-sm font-semibold text-foreground">Pipeway</span>
              </div>
            )}
            <nav className="hidden md:flex space-x-2" aria-label="Primary">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-sky-100 text-sky-700 dark:bg-sky-800/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`
                  }
                  end={l.to === '/'}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center mr-2">
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() => setIsCommandOpen(true)}
              >
                <Command className="h-4 w-4" />
                <span>Navigation</span>
              </Button>
            </div>

            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60"
            >
              {currentTheme === 'dark' ? '☾' : '☼'}
            </button>

            <div className="relative" ref={avatarRef}>
              <button
                aria-haspopup="true"
                aria-expanded={avatarOpen}
                onClick={() => setAvatarOpen((s) => !s)}
                className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium"
              >
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <span>{getInitials(user?.name)}</span>
                )}
              </button>

              {avatarOpen && (
                <div
                  role="menu"
                  aria-label="User menu"
                  className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md shadow-lg py-1 z-20"
                >
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700">Settings</button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => {
                      setAvatarOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden" ref={mobileRef}>
              <button
                aria-controls="mobile-menu"
                aria-expanded={mobileOpen}
                aria-label="Open mobile menu"
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-sky-100 text-sky-700 dark:bg-sky-800/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`
                }
                onClick={() => setMobileOpen(false)}
                end={l.to === '/'}
              >
                {l.label}
              </NavLink>
            ))}

            <div className="border-t dark:border-slate-700 mt-2 pt-2">
              <button onClick={toggleTheme} className="w-full text-left px-3 py-2">Toggle theme</button>
              <button
                onClick={() => {
                  setIsCommandOpen(true);
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2"
              >
                Open Navigation
              </button>
              <button onClick={() => onSignOut && onSignOut()} className="w-full text-left px-3 py-2 text-red-600">Sign out</button>
            </div>
          </div>
        </div>
      )}
    
      {/* Command Navigation Modal */}
      <CommandNavigation isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </header>
  );
}
