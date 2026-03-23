import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  Award,
  Bone,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Eye,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Tag,
  Users,
  Wind,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const ADDRESS =
  "K9 A, Lane 4, near DN Regalia Road, Kalinga Vihar, Kalinga Vihar LIG, Mall, Bhubaneswar, Odisha 751019";
const PHONE = "9664590329";
const WHATSAPP_URL = `https://wa.me/91${PHONE}`;

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Doctor", href: "#doctors" },
  { label: "Blog", href: "#blog" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQs", href: "#faqs" },
  { label: "Book Now", href: "#booking" },
];

const TREATMENTS = [
  {
    icon: Bone,
    name: "Neck & Cervical Pain",
    desc: "Targeted needling to relieve cervical spondylosis, stiffness, and disc issues",
  },
  {
    icon: Activity,
    name: "Back Pain & Sciatica",
    desc: "Effective for lumbar pain, sciatica, herniated discs and posture issues",
  },
  {
    icon: Zap,
    name: "Knee & Joint Pain",
    desc: "Reduces inflammation, restores mobility for osteoarthritis and sports injuries",
  },
  {
    icon: Brain,
    name: "Headache & Migraine",
    desc: "Regulates nerve pathways to eliminate chronic headaches and migraines",
  },
  {
    icon: Wind,
    name: "Frozen Shoulder",
    desc: "Restores full shoulder movement through meridian therapy",
  },
  {
    icon: Heart,
    name: "Arthritis & Rheumatism",
    desc: "Anti-inflammatory acupuncture reduces pain and improves joint function",
  },
  {
    icon: Activity,
    name: "Paralysis & Stroke Rehab",
    desc: "Stimulates nerve regeneration for partial paralysis recovery",
  },
  {
    icon: Zap,
    name: "Sports Injuries",
    desc: "Accelerates healing of ligament, tendon and muscle injuries",
  },
  {
    icon: Eye,
    name: "Insomnia & Stress",
    desc: "Balances the nervous system for deep, restorative sleep",
  },
  {
    icon: Leaf,
    name: "Weight Management",
    desc: "Ear acupuncture and metabolic stimulation for natural weight loss",
  },
  {
    icon: Shield,
    name: "Skin Disorders",
    desc: "Treats eczema, psoriasis, acne and pigmentation from within",
  },
  {
    icon: Heart,
    name: "Fertility & Women's Health",
    desc: "Regulates hormones and enhances reproductive health naturally",
  },
  {
    icon: Activity,
    name: "Digestive Disorders",
    desc: "Relieves IBS, acidity, constipation and gut inflammation",
  },
  {
    icon: Wind,
    name: "Respiratory Conditions",
    desc: "Treats asthma, sinusitis and chronic bronchitis effectively",
  },
];

const BLOGS = [
  {
    title: "Can Acupuncture Cure Chronic Back Pain Permanently?",
    image: "/assets/generated/blog-back-pain.dim_800x500.jpg",
    summary:
      "Millions suffer from chronic back pain. Discover how acupuncture addresses the root cause with targeted meridian therapy, not just temporary relief.",
    date: "March 10, 2026",
    category: "Pain Relief",
    readTime: "5 min read",
  },
  {
    title: "Acupuncture for Diabetes: Managing Blood Sugar Naturally",
    image: "/assets/generated/blog-diabetes.dim_800x500.jpg",
    summary:
      "Clinical studies show acupuncture can help regulate insulin response and improve pancreatic function. Learn the science behind it.",
    date: "February 22, 2026",
    category: "Diabetes Care",
    readTime: "6 min read",
  },
  {
    title:
      "Sciatica & Nerve Pain: Why Acupuncture Works Better Than Painkillers",
    image: "/assets/generated/blog-sciatica.dim_800x500.jpg",
    summary:
      "Sciatica can be debilitating. Acupuncture targets the exact nerve pathways to provide lasting relief without side effects.",
    date: "February 5, 2026",
    category: "Nerve Health",
    readTime: "4 min read",
  },
  {
    title: "Fertility & Acupuncture: A Natural Path to Parenthood",
    image: "/assets/generated/blog-fertility.dim_800x500.jpg",
    summary:
      "Couples struggling with infertility are turning to acupuncture. Understand how hormonal balance and improved circulation aid conception.",
    date: "January 18, 2026",
    category: "Women's Health",
    readTime: "7 min read",
  },
  {
    title: "Migraine & Headache Relief Through Ancient Acupuncture Techniques",
    image: "/assets/generated/blog-migraine.dim_800x500.jpg",
    summary:
      "Chronic migraines don't have to rule your life. Traditional acupuncture points have been proven to reduce migraine frequency by up to 60%.",
    date: "January 3, 2026",
    category: "Neurological Health",
    readTime: "5 min read",
  },
];

const REVIEWS = [
  {
    name: "Sunita Panda",
    initial: "S",
    color: "bg-rose-500",
    rating: 5,
    text: "Dr. Ramesh Mishra is a miracle worker. I had severe cervical spondylosis for 6 years. After 12 sessions, I am completely pain-free. Highly recommended to everyone in Bhubaneswar!",
  },
  {
    name: "Rajendra Sahoo",
    initial: "R",
    color: "bg-blue-500",
    rating: 5,
    text: "Best acupuncture specialist in BBSR. My knee pain of 4 years is gone after treatment. The clinic is very clean and Dr. Mishra explains everything patiently.",
  },
  {
    name: "Mamata Rath",
    initial: "M",
    color: "bg-purple-500",
    rating: 5,
    text: "I came with paralysis symptoms and lost hope everywhere else. Dr. Ramesh Chandra Mishra gave me a new life. Today I walk normally. God bless him.",
  },
  {
    name: "Pradeep Kumar Nayak",
    initial: "P",
    color: "bg-green-600",
    rating: 5,
    text: "My diabetes was not in control for years. After acupuncture treatment with Dr. Mishra, my sugar levels are now stabilized. Amazing results in just 2 months!",
  },
  {
    name: "Anita Mohanty",
    initial: "A",
    color: "bg-orange-500",
    rating: 5,
    text: "Struggling with infertility for 3 years. After Dr. Mishra's acupuncture treatment, I am now blessed with a baby girl. He is truly the best doctor in Odisha!",
  },
  {
    name: "Bijay Swain",
    initial: "B",
    color: "bg-teal",
    rating: 5,
    text: "Sciatica pain was unbearable. Visited many hospitals with no result. Dr. Ramesh Mishra treated me in just 15 sessions. Zero pain now. Thank you doctor!",
  },
  {
    name: "Reena Tripathy",
    initial: "R",
    color: "bg-pink-500",
    rating: 5,
    text: "Migraine headaches since childhood. After 20 sessions at Regional Institute of Acupuncture, I rarely get migraines now. Dr. Mishra is very experienced and caring.",
  },
  {
    name: "Sanjay Das",
    initial: "S",
    color: "bg-indigo-500",
    rating: 5,
    text: "Excellent treatment for my frozen shoulder. I could not lift my arm for 2 years. Now full movement restored. Dr. Mishra is the top specialist in Bhubaneswar without doubt.",
  },
];

const WHY_CHOOSE = [
  {
    icon: Award,
    title: "Government Certified",
    desc: "Licensed by Ministry of AYUSH, Govt. of India. Fully accredited and registered practitioners.",
  },
  {
    icon: Users,
    title: "30+ Years Expertise",
    desc: "Treating thousands of patients since 1995. BBSR's most trusted acupuncture institute.",
  },
  {
    icon: Shield,
    title: "Drug-Free Treatment",
    desc: "Zero medicines, zero side effects, 100% natural healing. Safe for all ages.",
  },
  {
    icon: Zap,
    title: "Modern Equipment",
    desc: "Latest acupuncture tools and diagnostic technology for precise, effective treatment.",
  },
  {
    icon: Heart,
    title: "Affordable Pricing",
    desc: "Quality treatment at reasonable costs. Transparent pricing with no hidden charges.",
  },
  {
    icon: Leaf,
    title: "Holistic Approach",
    desc: "Treats root cause, not just symptoms. Complete wellness through traditional wisdom.",
  },
];

const FAQS = [
  {
    q: "Is acupuncture painful?",
    a: "Most patients feel minimal or no pain. The needles are ultra-thin (0.2mm) and sterile, designed for maximum comfort. Many patients report feeling deeply relaxed during sessions.",
  },
  {
    q: "How many sessions are needed?",
    a: "Typically 8-15 sessions depending on the condition and its severity. Chronic conditions may require more sessions. Dr. Mishra will give you a personalized treatment plan after the first consultation.",
  },
  {
    q: "Are there any side effects?",
    a: "Acupuncture is completely safe with no known side effects when done by certified practitioners. At RIAB, we use single-use sterile needles for every patient, ensuring complete safety.",
  },
  {
    q: "Is it effective for all types of pain?",
    a: "Yes, acupuncture is clinically proven effective for 50+ conditions including all types of pain, neurological conditions, women's health issues, and lifestyle disorders.",
  },
  {
    q: "Do you need a doctor's referral?",
    a: "No referral needed. Walk-in consultations are welcome Mon-Sat 9AM-7PM and Sunday 10AM-2PM. You can also book an appointment online through this website.",
  },
  {
    q: "What makes RIAB different from others?",
    a: "RIAB is Bhubaneswar's oldest and most trusted acupuncture institute. Dr. Ramesh Chandra Mishra has 30+ years of experience with over 2,000 successful treatments.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 fill-current ${n <= count ? "text-star" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" role="img" aria-label="Google">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type FormData = {
  name: string;
  phone: string;
  email: string;
  age: string;
  weight: string;
  height: string;
  problem: string;
  duration: string;
  cureMethod: string;
  preferredDate: string;
  previousTreatment: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  age: "",
  weight: "",
  height: "",
  problem: "",
  duration: "",
  cureMethod: "",
  preferredDate: "",
  previousTreatment: "",
};

export default function RIABWebsite() {
  const { actor } = useActor();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [showWhatsAppTip, setShowWhatsAppTip] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const setField = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.problem) {
      toast.error("Please fill in Name, Phone, and Health Problem.");
      return;
    }
    if (!actor) {
      toast.error("Connection error. Please try again.");
      return;
    }
    setSubmitting(true);
    try {
      const summary = `Age: ${formData.age}, Weight: ${formData.weight}kg, Height: ${formData.height}cm | Problem: ${formData.problem} | Duration: ${formData.duration} | Cure Method: ${formData.cureMethod} | Previous Treatment: ${formData.previousTreatment}`;
      await actor.submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        treatmentType: formData.cureMethod || "Not specified",
        preferredDate: formData.preferredDate,
        message: summary,
      });
      toast.success(
        "Appointment booked! Dr. Mishra will confirm your slot via WhatsApp within 2 hours.",
      );
      // Send WhatsApp notification to admin
      const waMsg = `New Appointment Booking!%0AName: ${formData.name}%0APhone: ${formData.phone}%0AAge: ${formData.age}%0AWeight: ${formData.weight}kg%0AHeight: ${formData.height}cm%0AProblem: ${formData.problem}%0ADuration: ${formData.duration}%0APreferred Date: ${formData.preferredDate}%0ACure Method: ${formData.cureMethod}%0APrevious Treatment: ${formData.previousTreatment}`;
      window.open(`https://wa.me/91${PHONE}?text=${waMsg}`, "_blank");
      setFormData(INITIAL_FORM);
    } catch {
      toast.error(`Failed to submit. Please call us at +91 ${PHONE}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const heroInView = useInView(0.1);
  const aboutInView = useInView(0.1);
  const treatmentsInView = useInView(0.05);
  const doctorsInView = useInView(0.1);
  const blogInView = useInView(0.05);
  const reviewsInView = useInView(0.1);
  const _whyInView = useInView(0.1);
  const faqInView = useInView(0.1);
  const contactInView = useInView(0.1);

  return (
    <div className="font-poppins min-h-screen bg-white">
      {/* FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {showWhatsAppTip && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 bottom-1 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
            >
              Chat on WhatsApp
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
            </motion.div>
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="whatsapp.button"
            onMouseEnter={() => setShowWhatsAppTip(true)}
            onMouseLeave={() => setShowWhatsAppTip(false)}
            className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl bg-green-500 hover:bg-green-600 transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute w-14 h-14 rounded-full bg-green-400 animate-ping opacity-60" />
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 fill-white relative z-10"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal shadow-md flex-shrink-0 bg-white">
              <img
                src="/assets/uploads/img-20260324-wa0001-019d1c0e-7a4a-745b-a914-da54bde50169-1.jpg"
                alt="Regional Institute of Acupuncture logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p
                className={`font-bold text-sm leading-tight ${
                  scrolled ? "text-navy" : "text-white"
                }`}
              >
                Regional Institute of
              </p>
              <p
                className={`font-bold text-xs leading-tight ${
                  scrolled ? "text-teal" : "text-teal"
                }`}
              >
                Acupuncture, Bhubaneswar
              </p>
            </div>
          </a>
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.label === "Book Now" ? (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.primary_button"
                  className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-dark transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  className={`text-sm font-medium transition-colors hover:text-teal ${
                    scrolled ? "text-navy" : "text-white"
                  }`}
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-navy" : "text-white"}`}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-6"
            data-ocid="nav.modal"
          >
            <div className="flex justify-between items-center mb-8">
              <p className="font-bold text-navy text-lg">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.close_button"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-navy" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  className="text-navy font-semibold text-lg py-2 border-b border-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-semibold"
              >
                WhatsApp Us: +91 {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-navy overflow-hidden"
        ref={heroInView.ref}
      >
        <div className="absolute inset-0 opacity-10">
          {[
            "c0",
            "c1",
            "c2",
            "c3",
            "c4",
            "c5",
            "c6",
            "c7",
            "c8",
            "c9",
            "c10",
            "c11",
            "c12",
            "c13",
            "c14",
            "c15",
            "c16",
            "c17",
            "c18",
            "c19",
          ].map((id) => (
            <div
              key={id}
              className="absolute rounded-full bg-teal"
              style={{
                width: `${Math.random() * 200 + 40}px`,
                height: `${Math.random() * 200 + 40}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.05,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex-1 max-w-2xl"
            >
              <Badge className="bg-teal text-white mb-4 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                Bhubaneswar's #1 Acupuncture Institute
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                Heal Naturally.
                <br />
                <span className="text-teal">Live Pain-Free.</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                Under the expert guidance of{" "}
                <strong className="text-white">
                  Dr. Ramesh Chandra Mishra
                </strong>
                , Odisha's leading acupuncture specialist with 30+ years of
                transforming lives through authentic healing.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#booking"
                  data-ocid="hero.primary_button"
                  className="bg-teal text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-teal-dark transition-colors"
                >
                  Book Consultation – ₹1,000
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="hero.secondary_button"
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-white"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Now
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { val: "30+", label: "Years Experience" },
                  { val: "2,000+", label: "Happy Patients" },
                  { val: "14+", label: "Conditions Treated" },
                  { val: "98%", label: "Success Rate" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
                  >
                    <p className="text-teal text-2xl font-bold">{stat.val}</p>
                    <p className="text-gray-300 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Yin-Yang Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={heroInView.inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:flex flex-shrink-0 items-center justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-teal/20 blur-3xl scale-110" />
                <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-teal/40 shadow-2xl bg-white">
                  <img
                    src="/assets/uploads/img-20260324-wa0001-019d1c0e-7a4a-745b-a914-da54bde50169-1.jpg"
                    alt="Yin-Yang Acupuncture Symbol"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -inset-4 rounded-full border border-teal/20 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-20 bg-gray-section"
        ref={aboutInView.ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={aboutInView.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
                About Our Institute
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Established with a mission to bring authentic, drug-free healing
                to every household in Odisha.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-xl font-bold text-navy mb-4">
                  Why We Are Odisha's Trusted Name in Acupuncture
                </h3>
                <p className="text-body mb-4">
                  The Regional Institute of Acupuncture Bhubaneswar (RIAB) was
                  founded by <strong>Dr. Ramesh Chandra Mishra</strong>, a
                  government-certified expert who dedicated his life to making
                  natural healing accessible.
                </p>
                <p className="text-body mb-6">
                  Over 30 years and 2,000+ successfully treated patients, our
                  institute has earned the trust of thousands of families across
                  Odisha who sought relief from chronic pain, neurological
                  disorders, lifestyle diseases, and more.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "30+ Years", sub: "Clinical Experience" },
                    { label: "2,000+", sub: "Patients Healed" },
                    { label: "Govt. Certified", sub: "Ministry of AYUSH" },
                    { label: "100% Natural", sub: "Drug-Free Healing" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white rounded-xl p-4 shadow-xs border border-gray-100"
                    >
                      <p className="font-bold text-teal text-lg">
                        {item.label}
                      </p>
                      <p className="text-body text-sm">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {WHY_CHOOSE.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 hover:shadow-card transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-teal" />
                    </div>
                    <p className="font-semibold text-navy text-sm mb-1">
                      {item.title}
                    </p>
                    <p className="text-body text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section
        id="treatments"
        className="py-20 bg-white"
        ref={treatmentsInView.ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Conditions We Treat
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Comprehensive acupuncture solutions for 50+ health conditions —
              treating the root cause, not just the symptoms.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={treatmentsInView.inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {TREATMENTS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={treatmentsInView.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-gray-section rounded-xl p-5 border border-gray-100 hover:shadow-card hover:border-teal/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-teal/10 group-hover:bg-teal/20 flex items-center justify-center mb-3 transition-colors">
                  <t.icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-semibold text-navy text-sm mb-1">
                  {t.name}
                </h3>
                <p className="text-body text-xs">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DOCTOR */}
      <section
        id="doctors"
        className="py-20 bg-gray-section"
        ref={doctorsInView.ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Meet Our Expert
            </h2>
            <p className="text-body">
              Learn from a specialist who has dedicated 30+ years to the science
              of natural healing.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={doctorsInView.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-amber-400 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-50 rounded-bl-full opacity-60 -z-0" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-start gap-4 mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="bg-amber-500 text-white text-xs font-semibold px-3 py-1">
                        BBSR's #1 Acupuncture Specialist
                      </Badge>
                      <Badge className="bg-teal text-white text-xs font-semibold px-3 py-1">
                        Govt. of India Certified
                      </Badge>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-navy mb-1">
                      Dr. Ramesh Chandra Mishra
                    </h3>
                    <p className="text-teal font-semibold text-sm mb-3">
                      Senior Specialist & Founder — Top Acupuncture Expert in
                      Bhubaneswar
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["MBBS", "MD (Acupuncture)", "30+ Years Experience"].map(
                        (cred) => (
                          <span
                            key={cred}
                            className="inline-flex items-center gap-1 bg-navy/5 text-navy text-xs font-medium px-3 py-1.5 rounded-full"
                          >
                            <CheckCircle className="w-3 h-3 text-teal" />
                            {cred}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { val: "30+", label: "Years of Practice" },
                    { val: "2,000+", label: "Patients Healed" },
                    { val: "50+", label: "Conditions Treated" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200"
                    >
                      <p className="text-amber-600 font-bold text-xl">
                        {s.val}
                      </p>
                      <p className="text-navy text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-body leading-relaxed mb-4">
                  Dr. Ramesh Chandra Mishra is Bhubaneswar's most experienced
                  and trusted acupuncture specialist. With over three decades of
                  dedicated practice, he has successfully treated patients with
                  paralysis, diabetes, infertility, chronic pain, neurological
                  disorders, and more — purely through the power of natural
                  acupuncture therapy.
                </p>
                <p className="text-body leading-relaxed mb-6">
                  His deep understanding of traditional Chinese medicine
                  combined with modern diagnostic approaches makes him uniquely
                  effective in treating complex, multi-system conditions that
                  conventional medicine has failed to address.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#booking"
                    data-ocid="doctor.primary_button"
                    className="bg-teal text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-dark transition-colors"
                  >
                    Book Consultation with Dr. Mishra
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="doctor.secondary_button"
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
                  >
                    WhatsApp Dr. Mishra
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section
        id="booking"
        className="py-20 bg-gray-section"
        ref={contactInView.ref}
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-10">
              <Badge className="bg-teal text-white mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Consultation – ₹1,000
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
                Book Your Consultation – ₹1,000
              </h2>
              <p className="text-body max-w-xl mx-auto">
                Fill the form below and{" "}
                <strong>Dr. Ramesh Chandra Mishra</strong> will personally
                review your case and call you back within 2 hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden">
              <div className="bg-navy px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      Consultation Request Form
                    </p>
                    <p className="text-gray-400 text-sm">
                      Reviewed personally by Dr. Ramesh Chandra Mishra
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleBooking}
                data-ocid="booking.modal"
                className="p-8"
              >
                {/* Personal Info */}
                <div className="mb-8">
                  <h3 className="text-navy font-bold text-base mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-name"
                        className="text-navy font-medium text-sm"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bk-name"
                        data-ocid="booking.input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setField("name", e.target.value)}
                        required
                        className="border-gray-200 focus:border-teal h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-phone"
                        className="text-navy font-medium text-sm"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bk-phone"
                        type="tel"
                        data-ocid="booking.input"
                        placeholder="+91 XXXXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        required
                        className="border-gray-200 focus:border-teal h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-email"
                        className="text-navy font-medium text-sm"
                      >
                        Email Address{" "}
                        <span className="text-gray-400 text-xs font-normal">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="bk-email"
                        type="email"
                        data-ocid="booking.input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className="border-gray-200 focus:border-teal h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-date"
                        className="text-navy font-medium text-sm"
                      >
                        Preferred Appointment Date
                      </Label>
                      <Input
                        id="bk-date"
                        type="date"
                        data-ocid="booking.input"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setField("preferredDate", e.target.value)
                        }
                        className="border-gray-200 focus:border-teal h-11"
                      />
                    </div>
                  </div>
                </div>

                {/* Health Vitals */}
                <div className="mb-8">
                  <h3 className="text-navy font-bold text-base mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    Health Vitals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-age"
                        className="text-navy font-medium text-sm"
                      >
                        Age <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bk-age"
                        type="number"
                        data-ocid="booking.input"
                        placeholder="Years"
                        min={1}
                        max={120}
                        value={formData.age}
                        onChange={(e) => setField("age", e.target.value)}
                        required
                        className="border-gray-200 focus:border-teal h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-weight"
                        className="text-navy font-medium text-sm"
                      >
                        Weight (kg) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="bk-weight"
                          type="number"
                          data-ocid="booking.input"
                          placeholder="e.g. 70"
                          min={1}
                          value={formData.weight}
                          onChange={(e) => setField("weight", e.target.value)}
                          required
                          className="border-gray-200 focus:border-teal h-11 pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                          kg
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-height"
                        className="text-navy font-medium text-sm"
                      >
                        Height (cm) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="bk-height"
                          type="number"
                          data-ocid="booking.input"
                          placeholder="e.g. 165"
                          min={1}
                          value={formData.height}
                          onChange={(e) => setField("height", e.target.value)}
                          required
                          className="border-gray-200 focus:border-teal h-11 pr-12"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                          cm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Problem */}
                <div className="mb-8">
                  <h3 className="text-navy font-bold text-base mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    Health Problem Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <Label
                        htmlFor="bk-problem"
                        className="text-navy font-medium text-sm"
                      >
                        Chief Complaint / Health Problem{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="bk-problem"
                        data-ocid="booking.textarea"
                        placeholder="Describe your main health issue in detail (e.g. severe lower back pain radiating to legs for 2 years, unable to walk properly...)"
                        value={formData.problem}
                        onChange={(e) => setField("problem", e.target.value)}
                        required
                        className="border-gray-200 focus:border-teal min-h-[100px] resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-duration"
                        className="text-navy font-medium text-sm"
                      >
                        Duration of Problem
                      </Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(v) => setField("duration", v)}
                      >
                        <SelectTrigger
                          id="bk-duration"
                          data-ocid="booking.select"
                          className="border-gray-200 focus:border-teal h-11"
                        >
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-1-month">
                            Less than 1 month
                          </SelectItem>
                          <SelectItem value="1-3-months">1–3 months</SelectItem>
                          <SelectItem value="3-6-months">3–6 months</SelectItem>
                          <SelectItem value="6-12-months">
                            6 months – 1 year
                          </SelectItem>
                          <SelectItem value="more-1-year">
                            More than 1 year
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="bk-cure"
                        className="text-navy font-medium text-sm"
                      >
                        Preferred Cure Method
                      </Label>
                      <Select
                        value={formData.cureMethod}
                        onValueChange={(v) => setField("cureMethod", v)}
                      >
                        <SelectTrigger
                          id="bk-cure"
                          data-ocid="booking.select"
                          className="border-gray-200 focus:border-teal h-11"
                        >
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acupuncture-only">
                            Acupuncture Only
                          </SelectItem>
                          <SelectItem value="acupuncture-herbal">
                            Acupuncture + Herbal
                          </SelectItem>
                          <SelectItem value="acupuncture-physio">
                            Acupuncture + Physio
                          </SelectItem>
                          <SelectItem value="full-holistic">
                            Full Holistic Treatment
                          </SelectItem>
                          <SelectItem value="let-doctor-decide">
                            Not Sure – Let Doctor Decide
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label
                        htmlFor="bk-previous"
                        className="text-navy font-medium text-sm"
                      >
                        Any Previous Treatment Tried?{" "}
                        <span className="text-gray-400 text-xs font-normal">
                          (optional)
                        </span>
                      </Label>
                      <Textarea
                        id="bk-previous"
                        data-ocid="booking.textarea"
                        placeholder="List any previous treatments, medications, surgeries, or therapies tried (e.g. physiotherapy, painkillers, surgery...)"
                        value={formData.previousTreatment}
                        onChange={(e) =>
                          setField("previousTreatment", e.target.value)
                        }
                        className="border-gray-200 focus:border-teal min-h-[80px] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-teal flex-shrink-0" />
                    Your information is confidential and only shared with Dr.
                    Mishra.
                  </p>
                  <Button
                    type="submit"
                    data-ocid="booking.submit_button"
                    disabled={submitting}
                    className="bg-teal hover:bg-teal-dark text-white px-8 py-3 h-auto text-base font-semibold rounded-xl"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      "Submit Consultation Request"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 bg-white" ref={blogInView.ref}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Health Blog & Insights
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Expert insights by Dr. Ramesh Chandra Mishra on natural healing,
              acupuncture science, and managing chronic conditions.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={blogInView.inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {BLOGS.map((blog, i) => (
              <motion.article
                key={blog.title}
                initial={{ opacity: 0, y: 20 }}
                animate={blogInView.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                data-ocid={`blog.item.${i + 1}`}
                className={`bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-card transition-shadow overflow-hidden flex flex-col ${
                  i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 bg-teal/10 text-teal text-xs font-semibold px-2.5 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy text-base mb-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-body text-sm mb-4 flex-1">
                    {blog.summary}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </div>
                    <button
                      type="button"
                      data-ocid={`blog.button.${i + 1}`}
                      className="text-teal font-semibold text-sm hover:text-teal-dark transition-colors flex items-center gap-1"
                      onClick={() =>
                        toast.info(
                          "Full article coming soon! Follow us on WhatsApp for updates.",
                        )
                      }
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        className="py-20 bg-gray-section"
        ref={reviewsInView.ref}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              What Our Patients Say
            </h2>
            <p className="text-body max-w-xl mx-auto">
              Real experiences from real patients — verified Google reviews from
              the people Dr. Mishra has helped.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <GoogleLogo />
              <span className="text-sm font-semibold text-gray-700">
                Google Reviews
              </span>
              <span className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="w-4 h-4 fill-current text-star" />
                ))}
              </span>
              <span className="text-sm text-gray-600 font-medium">
                5.0 (All Reviews)
              </span>
            </div>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={reviewsInView.inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                data-ocid={`reviews.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={reviewsInView.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 hover:shadow-card transition-shadow flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {r.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">
                        {r.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <GoogleLogo />
                        <span className="text-xs text-gray-400">
                          Google Review
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <StarRating count={r.rating} />
                <p className="text-body text-xs leading-relaxed">
                  &ldquo;{r.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 bg-gray-section" ref={faqInView.ref}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-body">
              Everything you need to know before your first visit.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={faqInView.inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  data-ocid={`faq.item.${i + 1}`}
                  className="bg-white rounded-xl border border-gray-100 px-5 shadow-xs"
                >
                  <AccordionTrigger className="text-navy font-semibold text-sm py-4 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-sm pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Visit Us</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {ADDRESS}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a
                  href={`tel:+91${PHONE}`}
                  data-ocid="contact.link"
                  className="flex items-center gap-3 text-gray-300 hover:text-teal transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal" />
                  <span className="text-sm">+91 {PHONE}</span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.link"
                  className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-green-400"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-sm">WhatsApp: +91 {PHONE}</span>
                </a>
                <a
                  href="mailto:riabbbsr@gmail.com"
                  data-ocid="contact.link"
                  className="flex items-center gap-3 text-gray-300 hover:text-teal transition-colors"
                >
                  <Mail className="w-4 h-4 text-teal" />
                  <span className="text-sm">riabbbsr@gmail.com</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Clinic Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Mon – Sat</span>
                  <span className="text-teal font-medium">
                    9:00 AM – 7:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Sunday</span>
                  <span className="text-teal font-medium">
                    10:00 AM – 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Emergency</span>
                  <span className="text-green-400 font-medium">
                    Call / WhatsApp
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    data-ocid="contact.link"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal/30 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-dark py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Regional Institute of Acupuncture,
            Bhubaneswar. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
