import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, SunMedium, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import menuData from "@/data/converted_navbar_nested.json";
import quickActions from "@/data/quick_actions.json";

// Simple recursive menu renderer for nested dropdowns
const NavItem: React.FC<{ item: any; level?: number; mobile?: boolean; rootIsLight?: boolean }> = ({ item, level = 0, mobile = false, rootIsLight = false }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (closeTimeout.current) {
                clearTimeout(closeTimeout.current as ReturnType<typeof setTimeout>);
                closeTimeout.current = null;
            }
        };
    }, []);

    const isActive = (path?: string) => path && location.pathname === path;

    const hasChildren = Boolean(item.dropdown && item.dropdown.length > 0);

    const textClass = rootIsLight ? 'text-slate-900' : 'text-white/90';
    const activeClass = rootIsLight ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white';

    const openWithCancel = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current as ReturnType<typeof setTimeout>);
            closeTimeout.current = null;
        }
        setOpen(true);
    };

    const closeWithDelay = (delay = 150) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current as ReturnType<typeof setTimeout>);
        closeTimeout.current = setTimeout(() => {
            setOpen(false);
            closeTimeout.current = null;
        }, delay);
    };

    // Mobile: render collapsible vertical item
    if (mobile) {
        return (
            <div className="w-full">
                <button
                    onClick={() => hasChildren ? setOpen((v) => !v) : (item.path && navigate(item.path))}
                    className={`w-full text-left px-3 py-2 rounded-sm transition-colors duration-150 ${isActive(item.path) ? activeClass : textClass} ${rootIsLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="truncate uppercase text-sm font-semibold">{item.name || item.label}</span>
                        {hasChildren && (
                            <ChevronDown className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`} />
                        )}
                    </div>
                </button>
                {hasChildren && open && (
                    <div className="pl-3 mt-1 space-y-1">
                        {item.dropdown.map((child: any, idx: number) => (
                            <MobileNavEntry key={child.label || child.name || idx} item={child} rootIsLight={rootIsLight} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Desktop: hover dropdown (compact)
    // compute dropdown palette depending on light/dark root theme
    const dropdownStyle = rootIsLight
        ? { display: open ? 'block' : 'none', background: 'linear-gradient(180deg,#fffaf0,#f3f7fb)', border: '1px solid rgba(15,23,42,0.06)', color: '#0f172a' }
        : { display: open ? 'block' : 'none', background: 'linear-gradient(180deg,#b50b3a,#a60a37)', border: '1px solid rgba(255,255,255,0.06)' };

    return (
        <div className={`group relative`} onMouseLeave={() => closeWithDelay()} onMouseEnter={() => openWithCancel()}>
            <button
                onClick={() => {
                    if (hasChildren) setOpen((v) => !v);
                    else if (item.path) navigate(item.path);
                }}
                onMouseEnter={() => hasChildren && openWithCancel()}
                className={`flex items-center gap-2 px-2 py-0.5 rounded-sm font-semibold transition-all duration-150 transform text-sm w-full justify-center text-center ${isActive(item.path) ? activeClass : textClass}`}
                aria-expanded={hasChildren ? open : undefined}
            >
                <span className="whitespace-nowrap max-w-[10rem] truncate uppercase text-xs tracking-wide">{item.name || item.label}</span>
                {hasChildren && <ChevronDown className="w-3 h-3 opacity-90" />}
            </button>

            {hasChildren && (
                <div
                    className={
                        `absolute mt-1 z-50 w-56 rounded-lg shadow-lg ${level > 0 ? 'translate-x-full -left-2 top-0 w-52' : 'left-1/2 -translate-x-1/2'}`
                    }
                    style={dropdownStyle}
                    onMouseEnter={() => openWithCancel()}
                    onMouseLeave={() => closeWithDelay()}
                >
                    <div className="p-1">
                        {item.dropdown.map((child: any, idx: number) => (
                            <div key={child.label || child.name || idx} className="px-0 py-0">
                                <div className={
                                    `rounded-none py-2 px-3 transition-colors duration-150 ${rootIsLight ? 'border-b border-slate-200/20 last:border-b-0 hover:bg-slate-50 text-slate-900' : 'border-b border-white/8 last:border-b-0 hover:bg-white/5'}`
                                }>
                                    <NavItem item={child} level={level + 1} rootIsLight={rootIsLight} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const NavbarNested: React.FC = () => {
    // track global theme (root document class) so dropdown palettes can adapt
    const [rootIsLight, setRootIsLight] = useState<boolean>(false);

    useEffect(() => {
        const initial = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
        setRootIsLight(initial);
        if (typeof document !== 'undefined') {
            const obs = new MutationObserver(() => {
                setRootIsLight(document.documentElement.classList.contains('light'));
            });
            obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
            return () => obs.disconnect();
        }
    }, []);

    // initialize theme from localStorage if present
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const stored = window.localStorage.getItem('theme');
        if (stored === 'light') {
            document.documentElement.classList.add('light');
            document.body.classList.add('light');
            setRootIsLight(true);
        } else if (stored === 'dark') {
            document.documentElement.classList.remove('light');
            document.body.classList.remove('light');
            setRootIsLight(false);
        }
    }, []);

    const toggleTheme = () => {
        if (typeof document === 'undefined') return;
        const isLight = document.documentElement.classList.contains('light');
        if (isLight) {
            document.documentElement.classList.remove('light');
            document.body.classList.remove('light');
            try { window.localStorage.setItem('theme', 'dark'); } catch (e) { }
            setRootIsLight(false);
        } else {
            document.documentElement.classList.add('light');
            document.body.classList.add('light');
            try { window.localStorage.setItem('theme', 'light'); } catch (e) { }
            setRootIsLight(true);
        }
    };

    // Reorder: ensure 'Administration' appears at index 2 (3rd position)
    const raw = (menuData as any).main || [];
    const adminIndex = raw.findIndex((i: any) => i.name && i.name.toLowerCase() === 'administration');
    const data = (() => {
        if (adminIndex === -1) return raw;
        const copy = [...raw];
        const admin = copy.splice(adminIndex, 1)[0];
        copy.splice(2, 0, admin); // insert at position 2 (3rd)
        return copy;
    })();

    // mobile menu state
    const [mobileOpen, setMobileOpen] = useState(false);
    const [actionsOpen, setActionsOpen] = useState(false);
    const actionsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!actionsRef.current) return;
            if (!actionsRef.current.contains(e.target as Node)) setActionsOpen(false);
        }
        document.addEventListener('click', onDocClick);
        return () => document.removeEventListener('click', onDocClick);
    }, []);

    return (
        <nav className="bg-gradient-to-r from-[#ff6a88] via-[#ff9a9e] to-[#8e44ad] text-white border-b border-white/10 z-50 shadow-[0_6px_20px_rgba(139,92,246,0.08)]">
            <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-transparent rounded-md flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <span className="text-base md:text-lg font-bold tracking-tight">Pipeway</span>
                        <div className="hidden md:flex items-center gap-2 ml-4 flex-1 max-w-[60vw] md:max-w-[50vw]">
                            {data.map((item: any) => (
                                <div key={item.name} className="relative flex-1">
                                    <NavItem item={item} rootIsLight={rootIsLight} />
                                </div>
                            ))}
                        </div>
                        {/* Mobile hamburger */}
                        <div className="md:hidden ml-3">
                            <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="p-2 rounded-md bg-white/10">
                                <Menu className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative" ref={actionsRef}>
                            <button
                                onClick={() => setActionsOpen((v) => !v)}
                                className="hidden md:inline-flex items-center px-3 py-1 text-sm font-medium bg-white/10 rounded-lg ring-1 ring-white/10 hover:scale-105 transform transition"
                            >
                                Actions
                            </button>
                            {actionsOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white/95 dark:bg-slate-800 text-gray-900 shadow-lg">
                                    <div className="p-2">
                                        {(quickActions as any).actions.map((a: any, i: number) => {
                                            if (a.type === 'separator') return <div key={i} className="my-1 border-t border-gray-200" />;
                                            return (
                                                <button key={i} onClick={() => { setActionsOpen(false); window.location.href = a.path; }} className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">{a.label}</button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <button onClick={toggleTheme} className="p-2 rounded-md bg-white/10" aria-label="Toggle theme">
                                {rootIsLight ? <Moon className="w-4 h-4 text-white" /> : <SunMedium className="w-4 h-4 text-white" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile overlay menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden">
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#ff9a9e] to-[#8e44ad] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                                <span className="text-lg font-bold">Pipeway</span>
                            </div>
                            <div>
                                <button className="p-2 rounded-md bg-white/10" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-24 px-4 pb-8 overflow-auto">
                        <div className="space-y-2">
                            {data.map((item: any, idx: number) => (
                                <MobileNavEntry key={item.name || idx} item={item} rootIsLight={rootIsLight} />
                            ))}
                            <div className="border-t border-white/10 pt-3">
                                <div className="space-y-1">
                                    {(quickActions as any).actions.map((a: any, i: number) => {
                                        if (a.type === 'separator') return <div key={i} className="my-1 border-t border-white/10" />;
                                        return (
                                            <button key={i} onClick={() => { setMobileOpen(false); window.location.href = a.path; }} className="w-full text-left px-3 py-2 rounded-sm hover:bg-white/5">{a.label}</button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarNested;

// Helper: mobile nav recursive entry
const MobileNavEntry: React.FC<{ item: any; rootIsLight?: boolean }> = ({ item, rootIsLight = false }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const hasChildren = Boolean(item.dropdown && item.dropdown.length > 0);

    return (
        <div>
            <button
                onClick={() => {
                    if (hasChildren) setOpen((v) => !v);
                    else if (item.path) navigate(item.path);
                }}
                className="w-full text-left px-3 py-2 rounded-sm transition-colors duration-150 text-white/95 bg-transparent hover:bg-white/5 flex items-center justify-between"
            >
                <span className="truncate uppercase text-sm font-medium">{item.name || item.label}</span>
                {hasChildren && <ChevronDown className={`w-4 h-4 transform transition-transform ${open ? 'rotate-180' : ''}`} />}
            </button>
            {hasChildren && open && (
                <div className="pl-4 mt-1 space-y-1">
                    {item.dropdown.map((child: any, idx: number) => (
                        <MobileNavEntry key={child.label || child.name || idx} item={child} rootIsLight={rootIsLight} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Dropdown gradient based on root theme
function getDropdownGradient() {
    try {
        const rootLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
        if (rootLight) {
            return 'linear-gradient(135deg, rgba(255,230,230,0.98), rgba(240,245,255,0.98))';
        }
    } catch (e) { }
    return 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(230,230,255,0.08))';
}
