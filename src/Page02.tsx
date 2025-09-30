import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion";
import CustomLogo from "./CustomLogo";

// Types
interface Feature {
    title: string;
    desc: string;
    icon: string;
    color: string;
}
interface Step {
    title: string;
    desc: string;
    icon: string;
}
interface Testimonial {
    quote: string;
    author: string;
    role: string;
}
interface Tech {
    icon: string;
    name: string;
    desc: string;
}
interface FAQEntry {
    question: string;
    answer: string;
}
interface ComparisonItem {
    feature: string;
    blueAlert: boolean | string;
    traditional: boolean | string;
    others: boolean | string;
}
interface ImpactCard {
    year: string;
    title: string;
    desc: string;
    metric: string;
    icon: string;
}

// Enhanced Data
const features: Feature[] = [
    {
        title: "Crowdsourced Reporting",
        desc: "Citizens and volunteers report ocean hazards in real-time with geotagged photos, videos, and descriptions directly from the field.",
        icon: "📱",
        color: "from-cyan-400 to-blue-500",
    },
    {
        title: "Official Dashboard",
        desc: "Disaster managers access real-time hazard maps with validated reports, enabling rapid response and resource allocation.",
        icon: "🗺️",
        color: "from-blue-400 to-indigo-500",
    },
    {
        title: "Instant Alerts",
        desc: "SMS and push notifications warn coastal communities within minutes of confirmed hazards, saving lives through early warning.",
        icon: "🚨",
        color: "from-indigo-400 to-purple-500",
    },
    {
        title: "Geospatial Analysis",
        desc: "PostGIS-powered spatial queries identify affected areas and at-risk populations for targeted emergency response.",
        icon: "📍",
        color: "from-purple-400 to-pink-500",
    },
    {
        title: "Multi-Platform Access",
        desc: "Flutter mobile app for field reporting and React web dashboard for officials ensure seamless cross-platform operation.",
        icon: "💻",
        color: "from-emerald-400 to-cyan-500",
    },
    {
        title: "Cloud Infrastructure",
        desc: "Scalable AWS/Azure deployment handles surge reporting during disasters with 99.9% uptime guarantee.",
        icon: "☁️",
        color: "from-pink-400 to-rose-500",
    },
];

const steps: Step[] = [
    {
        title: "1. Hazard Detection",
        desc: "Citizen spots ocean hazard like unusual tides, oil spills, or strong currents along the coastline.",
        icon: "👁️",
    },
    {
        title: "2. Mobile Reporting",
        desc: "User opens BlueAlert app, captures photo/video, and submits geotagged report with description.",
        icon: "📸",
    },
    {
        title: "3. Cloud Processing",
        desc: "Report uploads to cloud platform, stored in PostgreSQL with PostGIS for spatial indexing.",
        icon: "☁️",
    },
    {
        title: "4. Official Review",
        desc: "Disaster managers view reports on real-time dashboard map, assess severity and validate hazards.",
        icon: "👮",
    },
    {
        title: "5. Alert Dispatch",
        desc: "Confirmed hazards trigger SMS via Twilio and push notifications to warn affected coastal areas.",
        icon: "📢",
    },
];

const testimonials: Testimonial[] = [
    {
        quote: "BlueAlert helped us evacuate 500 families before the cyclone hit. The early warning saved countless lives.",
        author: "Captain R. Sharma",
        role: "Coast Guard Commander, Mumbai",
    },
    {
        quote: "As a fisherman, I can now report dangerous currents instantly. It's protecting our entire community.",
        author: "José Martinez",
        role: "Fishing Community Leader, Kerala",
    },
    {
        quote: "The real-time dashboard transformed our disaster response. We can now deploy resources precisely where needed.",
        author: "Dr. Priya Nair",
        role: "Disaster Management Director, Chennai",
    },
    {
        quote: "Integration with INCOIS data gives us unprecedented ocean hazard visibility across the Indian coastline.",
        author: "Admiral S. Kumar",
        role: "Maritime Safety Expert, INCOIS",
    },
];

const tech: Tech[] = [
    { icon: "📱", name: "Flutter", desc: "Cross-platform mobile app for iOS/Android field reporting." },
    { icon: "⚛️", name: "React", desc: "Modern web dashboard for officials with real-time updates." },
    { icon: "🗺️", name: "Leaflet/Mapbox", desc: "Interactive maps showing hazard locations and affected areas." },
    { icon: "🐍", name: "Python FastAPI", desc: "High-performance backend APIs for data processing." },
    { icon: "🐘", name: "PostgreSQL + PostGIS", desc: "Spatial database for geotagged reports and queries." },
    { icon: "📨", name: "Twilio", desc: "SMS alert delivery to coastal communities." },
    { icon: "🔔", name: "Firebase FCM", desc: "Push notifications for mobile app users." },
    { icon: "🐳", name: "Docker + AWS", desc: "Containerized deployment on scalable cloud infrastructure." },
];

const comparisons: ComparisonItem[] = [
    { feature: "Response Time", blueAlert: "< 5 minutes", traditional: "30-60 minutes", others: "15-30 minutes" },
    { feature: "Coverage Area", blueAlert: "100% Coastline", traditional: "Major Ports Only", others: "Urban Areas" },
    { feature: "Citizen Reporting", blueAlert: true, traditional: false, others: "Limited" },
    { feature: "Real-time Maps", blueAlert: true, traditional: false, others: true },
    { feature: "Multi-language", blueAlert: "10+ Languages", traditional: "English Only", others: "2-3 Languages" },
    { feature: "Offline Mode", blueAlert: "Coming Soon", traditional: false, others: false },
    { feature: "Cost per Alert", blueAlert: "₹0.50", traditional: "₹50+", others: "₹5-10" },
    { feature: "Integration APIs", blueAlert: true, traditional: false, others: "Partial" },
];

const impactCards: ImpactCard[] = [
    {
        year: "2024",
        title: "MVP Launch",
        desc: "Deploy in 5 coastal states with core reporting features",
        metric: "10K+ Users",
        icon: "🚀",
    },
    {
        year: "2025",
        title: "AI Integration",
        desc: "Image analysis and predictive hazard modeling",
        metric: "95% Accuracy",
        icon: "🤖",
    },
    {
        year: "2026",
        title: "National Coverage",
        desc: "Expand to entire Indian coastline with INCOIS",
        metric: "7,500km Coast",
        icon: "🇮🇳",
    },
    {
        year: "2027",
        title: "Global Platform",
        desc: "International deployment in Southeast Asia",
        metric: "100M+ Protected",
        icon: "🌏",
    },
];

const faqs: FAQEntry[] = [
    {
        question: "How quickly can alerts reach affected communities?",
        answer: "Alerts are dispatched within 5 minutes of hazard confirmation via SMS and push notifications, reaching registered users instantly.",
    },
    {
        question: "What types of ocean hazards can be reported?",
        answer: "Users can report unusual tides, oil spills, strong currents, marine debris, harmful algae blooms, and any unusual ocean conditions.",
    },
    {
        question: "Is the platform available offline?",
        answer: "The MVP requires internet connectivity. Offline mode with sync capabilities is planned for the next phase to support remote coastal areas.",
    },
];

// Floating Ocean Icons Component
const FloatingIcons: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y: y1, rotate }} className="absolute top-20 left-10 text-4xl opacity-10">🌊</motion.div>
            <motion.div style={{ y: y2 }} className="absolute top-40 right-20 text-5xl opacity-10">⚓</motion.div>
            <motion.div style={{ y: y3, rotate }} className="absolute bottom-20 left-1/3 text-3xl opacity-10">🐚</motion.div>
            <motion.div style={{ y: y1 }} className="absolute top-60 right-1/3 text-4xl opacity-10">🏖️</motion.div>
        </div>
    );
};

// Enhanced CountUp
const CountUp: React.FC<{ target: number; start: boolean; suffix?: string; prefix?: string }> = ({ target, start, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const springValue = useSpring(0, { stiffness: 100, damping: 30 });

    useEffect(() => {
        if (!start) {
            springValue.set(0);
            return;
        }
        springValue.set(target);
    }, [start, target, springValue]);

    useEffect(() => {
        return springValue.on("change", (v) => setCount(Math.floor(v)));
    }, [springValue]);

    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Enhanced Background with animated gradients
const AnimatedBackground: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
    const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.15, 0.05]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <motion.div
                style={{ y: y1, scale: scale1, opacity }}
                className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 blur-3xl"
            />
            <motion.div
                style={{ y: y2, scale: scale2, opacity }}
                className="absolute right-0 top-64 w-80 h-80 rounded-full bg-gradient-to-bl from-blue-500 to-cyan-500 blur-3xl"
            />
            <motion.div
                style={{ y: y3, opacity }}
                className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 blur-3xl"
            />
        </div>
    );
};

// Comparison Table Component
const ComparisonTable: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left px-4 py-3 text-slate-400 font-medium">Feature</th>
                        <th className="px-4 py-3 text-cyan-400 font-bold">BlueAlert</th>
                        <th className="px-4 py-3 text-slate-400 font-medium">Traditional</th>
                        <th className="px-4 py-3 text-slate-400 font-medium">Others</th>
                    </tr>
                </thead>
                <tbody>
                    {comparisons.map((item, i) => (
                        <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.05 }}
                            className="border-t border-white/10 hover:bg-white/5 transition-colors"
                        >
                            <td className="px-4 py-4 text-white font-medium">{item.feature}</td>
                            <td className="px-4 py-4 text-center">
                                {typeof item.blueAlert === "boolean" ? (
                                    item.blueAlert ? (
                                        <span className="text-emerald-400 text-xl">✓</span>
                                    ) : (
                                        <span className="text-red-400 text-xl">✗</span>
                                    )
                                ) : (
                                    <span className="text-cyan-400 font-semibold">{item.blueAlert}</span>
                                )}
                            </td>
                            <td className="px-4 py-4 text-center">
                                {typeof item.traditional === "boolean" ? (
                                    item.traditional ? (
                                        <span className="text-emerald-400 text-xl">✓</span>
                                    ) : (
                                        <span className="text-red-400 text-xl">✗</span>
                                    )
                                ) : (
                                    <span className="text-slate-400">{item.traditional}</span>
                                )}
                            </td>
                            <td className="px-4 py-4 text-center">
                                {typeof item.others === "boolean" ? (
                                    item.others ? (
                                        <span className="text-emerald-400 text-xl">✓</span>
                                    ) : (
                                        <span className="text-red-400 text-xl">✗</span>
                                    )
                                ) : (
                                    <span className="text-slate-400">{item.others}</span>
                                )}
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Enhanced Feature Card with hover effects
const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${feature.color}`} />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-sm p-6 h-full hover:border-white/20 transition-all duration-300">
                <motion.div
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-4 inline-block"
                >
                    {feature.icon}
                </motion.div>
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
            </div>
        </motion.div>
    );
};

// Future Impact Card
const ImpactCardComponent: React.FC<{ card: ImpactCard; index: number }> = ({ card, index }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -10, scale: 1.05 }}
            className="relative"
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-sm p-6 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{card.icon}</span>
                    <span className="text-cyan-400 font-bold text-sm px-3 py-1 rounded-full bg-cyan-400/10">
                        {card.year}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{card.desc}</p>
                <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                    {card.metric}
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Signup Modal
const SignupModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", role: "citizen" });
    const [step, setStep] = useState(1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.name && form.email && form.phone) {
            alert(`Welcome to BlueAlert, ${form.name}! You'll receive alerts for coastal hazards.`);
            setForm({ name: "", email: "", phone: "", role: "citizen" });
            setStep(1);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-6"
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Join BlueAlert</h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                                ✕
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-2 mb-6">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-2 w-16 rounded-full transition-colors ${
                                        step >= s ? "bg-cyan-400" : "bg-white/10"
                                    }`}
                                />
                            ))}
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <input
                                            required
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Full name"
                                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                        />
                                        <select
                                            value={form.role}
                                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                                            className="w-full mt-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        >
                                            <option value="citizen">Citizen</option>
                                            <option value="volunteer">Volunteer</option>
                                            <option value="official">Official</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => form.name && setStep(2)}
                                            className="w-full mt-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold px-4 py-3 hover:opacity-95 transition"
                                        >
                                            Continue
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="Email address"
                                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                        />
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="flex-1 rounded-xl border border-white/20 text-white font-semibold px-4 py-3 hover:bg-white/5 transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => form.email && setStep(3)}
                                                className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold px-4 py-3 hover:opacity-95 transition"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <input
                                            required
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="Mobile number (for SMS alerts)"
                                            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                        />
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="flex-1 rounded-xl border border-white/20 text-white font-semibold px-4 py-3 hover:bg-white/5 transition"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold px-4 py-3 hover:opacity-95 transition"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Main Page Component
const Home: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [openFAQ, setOpenFAQ] = useState<number[]>([]);
    const [startStats, setStartStats] = useState(false);

    const { scrollY, scrollYProgress } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Trigger stats animation
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
    useEffect(() => {
        if (statsInView) setStartStats(true);
    }, [statsInView]);

    const toggleFAQ = (index: number) => {
        setOpenFAQ((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
            <AnimatedBackground />

            {/* Navbar */}
            <motion.nav
                style={{ backgroundColor: `rgba(15, 23, 42, ${navOpacity})` }}
                className="fixed inset-x-0 top-0 z-40 border-b border-white/10 backdrop-blur-xl"
            >
                <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
                <motion.a
                    href="#hero"
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent flex items-center gap-2"
                >
                    <CustomLogo size={40} className="nav-logo text-cyan-400" />
                    <span className="text-transparent">
                        BlueAlert
                    </span>
                </motion.a>
                    <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        {["Features", "Workflow", "Impact", "Testimonials", "FAQ"].map((item) => (
                            <motion.li key={item} whileHover={{ scale: 1.05 }}>
                                <a
                                    href={`#${item.toLowerCase()}`}
                                    className="hover:text-cyan-400 transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-cyan-400 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModalOpen(true)}
                        className="hidden md:block rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold px-6 py-2 hover:shadow-lg hover:shadow-cyan-500/25 transition"
                    >
                        Get Started
                    </motion.button>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-2xl">
                        {mobileOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden border-t border-white/10 bg-slate-900 bg-opacity-90 backdrop-blur-xl"
                        >
                            <div className="px-6 py-2 space-y-2">
                                {["Features", "Workflow", "Impact", "Testimonials", "FAQ"].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-1 text-slate-300 hover:text-cyan-400 transition-colors"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <button
                                    onClick={() => { setModalOpen(true); setMobileOpen(false); }}
                                    className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold px-6 py-2 hover:shadow-lg transition"
                                >
                                    Get Started
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Hero Section */}
            <section id="hero" className="relative pt-32 pb-24 min-h-screen flex items-center">
                <FloatingIcons />
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="mx-auto max-w-6xl px-6 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-cyan-400 text-sm font-medium">Live Now: Coastal Safety Network</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-cyan-300 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                            BlueAlert
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10"
                    >
                        Ocean Hazard Reporting & Early Warning Platform.
                        Protecting coastal communities through crowdsourced intelligence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setModalOpen(true)}
                            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
                        >
                            <span className="relative z-10">Report Hazard Now</span>
                        </motion.button>
                        <motion.a
                            href="#features"
                            whileHover={{ scale: 1.05 }}
                            className="px-8 py-4 rounded-full border-2 border-white/20 text-white font-semibold hover:bg-white/5 hover:border-white/30 transition-all"
                        >
                            Explore Platform
                        </motion.a>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-8 text-slate-400"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>INCOIS Partner</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>Coast Guard Approved</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span>
                            <span>NDMA Certified</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-950/50">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: 7500, suffix: "km", label: "Coastline Covered", sublabel: "Indian Ocean", color: "from-cyan-400 to-teal-500" },
                            { value: 50000, suffix: "+", label: "Active Users", sublabel: "5 Coastal States", color: "from-blue-400 to-cyan-500" },
                            { value: 5, prefix: "<", suffix: "min", label: "Alert Time", sublabel: "Average Response", color: "from-emerald-400 to-teal-500" },
                            { value: 95, suffix: "%", label: "Accuracy Rate", sublabel: "Hazard Detection", color: "from-purple-400 to-blue-500" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    <CountUp target={stat.value} start={startStats} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <div className="mt-2 text-white font-semibold">{stat.label}</div>
                                <div className="text-slate-400 text-sm">{stat.sublabel}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                                Platform Features
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Comprehensive ocean safety through technology and community
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <FeatureCard key={i} feature={feature} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="py-24 bg-slate-950/50">
                <div className="mx-auto max-w-6xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                                How It Works
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            From hazard detection to community alert in minutes
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-teal-500 to-blue-500 md:-translate-x-1/2" />

                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className={`relative flex items-center gap-8 mb-12 ${
                                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            >
                                <div className="flex-1 md:text-right">
                                    <div className={`inline-block p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-sm ${
                                        i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                                    }`}>
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-3xl">{step.icon}</span>
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                        </div>
                                        <p className="text-slate-300">{step.desc}</p>
                                    </div>
                                </div>
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-900 md:-translate-x-1/2" />
                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section id="solutions" className="py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                                Why Choose BlueAlert?
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Compare our platform with traditional warning systems
                        </p>
                    </motion.div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm p-6 overflow-hidden">
                        <ComparisonTable />
                    </div>
                </div>
            </section>

            {/* Future Impact Section */}
            <section id="impact" className="py-24 bg-slate-950/50">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                                Roadmap to Safer Oceans
                            </span>
                        </h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Our vision for coastal safety evolution
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {impactCards.map((card, i) => (
                            <ImpactCardComponent key={i} card={card} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24">
                <div className="mx-auto max-w-4xl px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-center mb-12"
                    >
                        <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                            Community Voices
                        </span>
                    </motion.h2>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-sm p-8 md:p-12"
                            >
                                <div className="text-6xl text-cyan-400/20 mb-4">"</div>
                                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8">
                                    {testimonials[currentTestimonial].quote}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-2xl font-bold text-slate-900">
                                        {testimonials[currentTestimonial].author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg">
                                            {testimonials[currentTestimonial].author}
                                        </div>
                                        <div className="text-cyan-400">
                                            {testimonials[currentTestimonial].role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex items-center justify-center gap-3 mt-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentTestimonial(i)}
                                    className={`h-2 rounded-full transition-all ${
                                        i === currentTestimonial
                                            ? "w-8 bg-cyan-400"
                                            : "w-2 bg-white/30 hover:bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-slate-950/50">
                <div className="mx-auto max-w-3xl px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-center mb-12"
                    >
                        <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                            Common Questions
                        </span>
                    </motion.h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl border border-white/10 bg-slate-900\/90 backdrop-blur-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-lg font-semibold text-white pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: openFAQ.includes(i) ? 180 : 0 }}
                                        className="text-cyan-400 text-xl"
                                    >
                                        ⌄
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {openFAQ.includes(i) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-5"
                                        >
                                            <p className="text-slate-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 p-12 md:p-16 text-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                                Join the Coastal Safety Network
                            </h3>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Be part of the solution. Help protect coastal communities by reporting ocean hazards.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setModalOpen(true)}
                                    className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:shadow-2xl transition-all"
                                >
                                    Register Now
                                </motion.button>
                                <a
                                    href="#features"
                                    className="px-8 py-4 rounded-full border-2 border-white/50 text-white font-semibold hover:bg-white/10 transition-all"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 border-t border-white/10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-4">
                                BlueAlert
                            </div>
                            <p className="text-slate-400 text-sm">
                                Ocean Hazard Reporting & Early Warning Platform for coastal safety.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Platform</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-cyan-400 transition">Mobile App</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">Web Dashboard</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">API Access</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">Documentation</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Partners</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-cyan-400 transition">INCOIS</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">Coast Guard</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">NDMA</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">State Disaster</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-cyan-400 transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">Report Issue</a></li>
                                <li><a href="#" className="hover:text-cyan-400 transition">Emergency</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm">
                            © 2025 BlueAlert Platform. Saving lives through early warning.
                        </p>
                        <div className="flex items-center gap-4">
                            {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                                >
                                    {social[0]}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Signup Modal */}
            <SignupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default Home;
