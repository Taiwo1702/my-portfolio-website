import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Film,
  Layers3,
  LoaderCircle,
  Mail,
  Menu,
  MessageSquareText,
  Monitor,
  MoveRight,
  Network,
  Play,
  Send,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import studioImage from "@/assets/portfolio-studio.jpg";
import productFilmImage from "@/assets/concept-product-film.jpg";
import { recommendPortfolioProjects } from "@/lib/project-matcher.functions";
import type { PortfolioRecommendation } from "@/lib/project-matcher.shared";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Skills", href: "#skills" },
];

const projects = [
  {
    id: "onboarding",
    title: "Employee onboarding workflow",
    category: "AI Automation",
    type: "Illustrative concept",
    description:
      "A considered onboarding flow connecting form submissions, structured employee records, welcome emails and HR notifications.",
    tools: ["n8n", "Google Sheets", "Gmail", "Slack"],
    visual: "workflow",
  },
  {
    id: "email",
    title: "Intelligent email classification",
    category: "AI Automation",
    type: "Illustrative concept",
    description:
      "An AI-assisted approach to sorting incoming messages, surfacing their intent and keeping important information organised.",
    tools: ["n8n", "OpenAI", "Gmail"],
    visual: "email",
  },
  {
    id: "voice",
    title: "Voice appointment assistant",
    category: "AI Automation",
    type: "Illustrative concept",
    description:
      "A salon assistant concept for answering common questions and helping callers find an available appointment.",
    tools: ["Vapi", "Make.com", "Google Calendar"],
    visual: "voice",
  },
  {
    id: "social",
    title: "Social content workflow",
    category: "AI Automation",
    type: "Illustrative concept",
    description:
      "A connected process that brings content sources, AI-assisted drafting and social publishing steps into one flow.",
    tools: ["n8n", "OpenAI", "Social integrations"],
    visual: "social",
  },
  {
    id: "commercial",
    title: "Cinematic product film",
    category: "AI Video & Animation",
    type: "Illustrative concept",
    description:
      "A cinematic product-advertising direction exploring crisp detail, dramatic light, precise motion and considered sound.",
    tools: ["Google Flow", "Veo", "CapCut"],
    visual: "image",
    image: productFilmImage,
  },
  {
    id: "storytelling",
    title: "Animated brand storytelling",
    category: "AI Video & Animation",
    type: "Illustrative concept",
    description:
      "A 3D animation concept combining character-led storytelling, directed scenes, voice and a polished edit.",
    tools: ["Google Flow", "Veo", "CapCut"],
    visual: "animation",
  },
  {
    id: "explainer",
    title: "Educational explainer",
    category: "AI Video & Animation",
    type: "Illustrative concept",
    description:
      "A scene-by-scene approach to making a complex subject easier to follow through clear visuals and narration.",
    tools: ["Google Flow", "ElevenLabs", "CapCut"],
    visual: "explainer",
  },
  {
    id: "website",
    title: "Responsive business website",
    category: "Web Design",
    type: "Illustrative concept",
    description:
      "A modern business website direction built around a clear content hierarchy, responsive layouts and purposeful next steps.",
    tools: ["WordPress", "Elementor", "HTML", "CSS"],
    visual: "website",
  },
];

const projectFilters = ["All work", "AI Automation", "AI Video & Animation", "Web Design"];

const serviceDetails = [
  {
    id: "automation",
    num: "01",
    icon: Workflow,
    title: "AI Automation &\nBusiness Process Optimization",
    description:
      "Intelligent workflows that connect the tools you already use, reduce repetitive admin and make the everyday run more smoothly.",
    areas: [
      "Workflow automation with n8n, Make.com & Zapier",
      "AI-powered agents, assistants & voice workflows",
      "CRM, lead management & appointment scheduling",
      "Email, Airtable, Sheets & API integrations",
      "WhatsApp and Telegram chatbot integrations",
      "Notifications, reporting & customer support flows",
    ],
    tools: ["n8n", "Make.com", "Zapier", "OpenAI", "Vapi", "Retell AI", "Airtable", "REST APIs"],
    cta: "Discuss an automation project",
    subject: "AI Automation",
  },
  {
    id: "video",
    num: "02",
    icon: Film,
    title: "AI Video Production,\nAnimation & Storytelling",
    description:
      "Purposeful, visually compelling video—from cinematic product stories and animated concepts to explainers and educational content.",
    areas: [
      "Cinematic product & promotional video concepts",
      "3D animation and character-led storytelling",
      "Educational explainers and course video",
      "Scene planning, storyboards & visual direction",
      "AI voiceover, lip-sync & avatar workflows",
      "Sound design, editing & final delivery",
    ],
    tools: ["Google Flow", "Veo", "Kling AI", "ElevenLabs", "HeyGen", "CapCut"],
    cta: "Create a video project",
    subject: "AI Video Production",
  },
  {
    id: "web",
    num: "03",
    icon: Monitor,
    title: "Modern Website Design\n& Digital Experiences",
    description:
      "Clear, responsive websites that help businesses communicate what they do and give their customers an easier path forward.",
    areas: [
      "Business, portfolio & corporate websites",
      "Responsive web design and development",
      "WordPress and Elementor customization",
      "Shopify storefront design & customization",
      "Website redesign and content structure",
      "UI/UX, usability & ongoing improvements",
    ],
    tools: ["WordPress", "Elementor", "Shopify", "HTML", "CSS", "JavaScript"],
    cta: "Build my website",
    subject: "Website Design",
  },
];

const skillGroups = [
  { title: "Automation & AI", icon: Workflow, list: ["n8n", "Make.com", "Zapier", "OpenAI API", "AI Agents", "REST APIs", "Airtable", "Google Sheets"] },
  { title: "Voice & Conversational", icon: AudioLines, list: ["Vapi", "Retell AI", "GoHighLevel", "Voice Workflows", "WhatsApp Integrations", "Telegram Bots"] },
  { title: "Video & Creative", icon: Film, list: ["Google Flow", "Veo", "Kling AI", "ElevenLabs", "HeyGen", "CapCut"] },
  { title: "Web & Digital", icon: Code2, list: ["WordPress", "Elementor", "Shopify", "HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"] },
];

const processSteps = [
  ["01", "Discovery", "Understanding your business, objectives, challenges and desired outcomes."],
  ["02", "Strategy & planning", "Shaping a clear solution, choosing appropriate tools and defining the project."],
  ["03", "Design & development", "Building the workflow, creating the visual content or developing the website."],
  ["04", "Testing & refinement", "Checking functionality, reviewing quality and refining the final work."],
  ["05", "Delivery & support", "Delivering the work with relevant guidance and support, as agreed."],
];

const reasons = [
  ["A problem-solving approach", "I start by understanding the challenge before recommending or building a solution."],
  ["A broader digital toolkit", "Automation, video and web design can work together to support the bigger picture."],
  ["Modern technology, used well", "I choose practical tools that serve the project, rather than technology for its own sake."],
  ["Care in the details", "Thoughtful attention to functionality, visual consistency, user experience and delivery."],
  ["Clear collaboration", "Good work begins with listening, clear communication and shared expectations."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "David Taiwo | AI Automation Specialist, AI Video Creator & Web Designer" },
      { name: "description", content: "David Taiwo helps businesses streamline operations with AI automation, intelligent agents, modern website design, and professional AI video production." },
      { property: "og:title", content: "David Taiwo | Digital Solutions Specialist" },
      { property: "og:description", content: "AI automation, creative video and modern web design for better digital experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});

function PortfolioHome() {
  const [filter, setFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formState, setFormState] = useState<"idle" | "sent" | "error">("idle");
  const [formBusy, setFormBusy] = useState(false);
  const [matcherNeed, setMatcherNeed] = useState("");
  const [matcherResults, setMatcherResults] = useState<PortfolioRecommendation[] | null>(null);
  const [matcherBusy, setMatcherBusy] = useState(false);
  const [matcherError, setMatcherError] = useState<string | null>(null);
  const getRecommendations = useServerFn(recommendPortfolioProjects);
  const visibleProjects = useMemo(
    () => (filter === "All work" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  useEffect(() => {
    const sections = ["home", "about", "services", "work", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }),
      { rootMargin: "-25% 0px -60% 0px" },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const subject = encodeURIComponent(`Project inquiry: ${service}`);
    const body = encodeURIComponent(
      `Hello David,\n\n${details}\n\nName: ${name}\nEmail: ${email}\nService: ${service}${budget ? `\nBudget: ${budget}` : ""}`,
    );
    setFormBusy(true);
    setFormState("idle");
    try {
      window.location.href = `mailto:taiwodavid4327@gmail.com?subject=${subject}&body=${body}`;
      setFormState("sent");
      form.reset();
    } catch {
      setFormState("error");
    } finally {
      window.setTimeout(() => setFormBusy(false), 350);
    }
  }

  async function handleMatcherSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMatcherBusy(true);
    setMatcherError(null);
    setMatcherResults(null);
    try {
      const result = await getRecommendations({ data: { need: matcherNeed } });
      setMatcherResults(result.recommendations);
      setMatcherError(result.error);
    } catch {
      setMatcherError("Recommendations are temporarily unavailable. Please try again.");
    } finally {
      setMatcherBusy(false);
    }
  }

  return (
    <main className="overflow-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <nav aria-label="Main navigation" className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3" aria-label="David Taiwo home">
            <span className="grid size-9 place-items-center border border-primary/50 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">DT</span>
            <span className="font-display text-[13px] font-semibold tracking-[0.12em]">DAVID TAIWO</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={cn("text-[12px] font-medium transition-colors hover:text-foreground", activeSection === link.href.slice(1) ? "text-foreground" : "text-muted-foreground")}>
                {link.label}
              </a>
            ))}
          </div>
          <Button asChild size="sm" className="hidden rounded-sm px-4 text-[12px] font-semibold md:inline-flex">
            <a href="#contact">Let&apos;s work together <ArrowUpRight /></a>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-background px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-[1360px] flex-col">
              {[{ label: "Home", href: "#home" }, ...navLinks, { label: "Contact", href: "#contact" }].map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-border/60 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="hero-light relative min-h-[740px] pt-[68px] lg:min-h-[790px]">
        <div className="portfolio-gridlines pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid min-h-[672px] max-w-[1360px] items-center gap-12 px-5 py-16 sm:px-8 lg:min-h-[722px] lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:px-12 lg:py-14">
          <div className="reveal relative z-10 max-w-[640px]">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <p className="text-[10px] font-semibold tracking-[0.22em] text-primary sm:text-[11px]">INDEPENDENT DIGITAL SOLUTIONS SPECIALIST</p>
            </div>
            <h1 className="font-display text-[clamp(2.85rem,5.4vw,5rem)] font-medium leading-[1.06] tracking-normal text-foreground">
              Building smarter digital experiences with <span className="text-electric">AI, automation</span> &amp; creative technology.
            </h1>
            <p className="mt-7 max-w-[525px] text-[15px] leading-7 text-muted-foreground sm:text-base">
              I help businesses streamline operations, build modern digital experiences and create engaging AI-powered videos that bring ideas to life.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 rounded-sm px-5 text-[13px]">
                <a href="#work">Explore my work <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-sm border-border/80 bg-transparent px-5 text-[13px]">
                <a href="#contact">Start a project <ArrowUpRight /></a>
              </Button>
            </div>
            <div className="mt-12 grid max-w-[560px] grid-cols-1 gap-3 border-t border-border/70 pt-5 sm:grid-cols-3 sm:gap-5">
              {[
                { Icon: Workflow, lineOne: "AI automation", lineTwo: "& intelligent agents" },
                { Icon: Film, lineOne: "AI video", lineTwo: "& animation" },
                { Icon: Monitor, lineOne: "Modern", lineTwo: "website design" },
              ].map(({ Icon, lineOne, lineTwo }) => (
                <div key={String(lineOne)} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center border border-border bg-surface/70 text-primary"><Icon className="size-4" /></span>
                  <span className="text-[11px] leading-[1.5] text-muted-foreground"><strong className="block font-semibold text-foreground">{String(lineOne)}</strong>{String(lineTwo)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[670px] lg:ml-auto">
            <div className="absolute -inset-4 border border-border/50" />
            <div className="relative overflow-hidden border border-border bg-surface">
              <img src={studioImage} alt="A digital studio displaying an automation workflow, a website preview and a video production screen" width={1536} height={1024} fetchPriority="high" className="aspect-[1.44] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent px-5 pb-5 pt-16 sm:px-7 sm:pb-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-primary">THREE DISCIPLINES. ONE PRACTICAL APPROACH.</p>
                    <p className="mt-2 font-display text-lg text-foreground sm:text-xl">Systems. Stories. Experiences.</p>
                  </div>
                  <a href="#services" className="grid size-10 shrink-0 place-items-center border border-border bg-surface/80 text-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Explore services"><ArrowDownRight className="size-4" /></a>
                </div>
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2 border border-border/80 bg-background/90 px-3 py-2 backdrop-blur-sm sm:left-5 sm:top-5">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="text-[9px] font-semibold tracking-[0.14em] text-foreground">INDEPENDENT PRACTICE</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-3 hidden border border-border bg-surface px-4 py-3 sm:block">
              <p className="text-[9px] tracking-[0.13em] text-muted-foreground">FOCUSED ON</p>
              <p className="mt-1 text-xs font-semibold text-foreground">Useful digital solutions</p>
            </div>
          </div>
        </div>
        <a href="#about" className="relative mx-auto flex max-w-[1360px] items-center gap-3 px-5 pb-6 text-[10px] font-medium tracking-[0.13em] text-muted-foreground sm:px-8 lg:px-12"><span>SCROLL TO EXPLORE</span><ArrowDown className="size-3" /></a>
      </section>

      <section id="about" className="scroll-mt-20 border-t border-border/50 bg-background">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionEyebrow num="01" label="A LITTLE ABOUT ME" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <h2 className="max-w-[470px] font-display text-4xl font-medium leading-[1.1] sm:text-5xl">Technology meets <span className="text-electric">creativity.</span></h2>
              <p className="mt-5 max-w-[390px] text-sm leading-6 text-muted-foreground">Practical digital solutions built around innovation, efficiency and design.</p>
              <div className="mt-10 aspect-[1.55] max-w-[480px] overflow-hidden border border-border">
                <img src={studioImage} width={1536} height={1024} loading="lazy" alt="A calm, modern digital workspace representing automation, web design and creative production" className="size-full object-cover object-center" />
              </div>
            </div>
            <div className="pt-1">
              <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">Hello, I&apos;m David Taiwo—an independent digital solutions specialist passionate about using technology to solve real-world business challenges.</p>
              <div className="mt-6 space-y-4 text-[13px] leading-[1.85] text-muted-foreground sm:text-sm">
                <p>My work spans AI-powered workflow automation and intelligent agents, creative video production, and modern website design. I bring technical understanding, creative thinking and care for the details to every project.</p>
                <p>I develop systems that reduce repetitive work and connect business tools. I also create visual content—from cinematic promotional concepts and educational explainers to animated storytelling—and design responsive websites that communicate value clearly.</p>
                <p>My goal is simple: turn ideas into practical digital solutions that make a meaningful difference.</p>
              </div>
              <div className="mt-10 grid gap-0 border-t border-border sm:grid-cols-3">
                {[
                  ["01", "Innovation", "Modern tools, used to find smarter ways of working."],
                  ["02", "Creativity", "Design and storytelling that make ideas engaging."],
                  ["03", "Problem solving", "Solutions shaped around the actual challenge."],
                ].map(([number, title, body]) => (
                  <div key={number} className="border-b border-border py-5 sm:border-b-0 sm:py-5 sm:pr-4">
                    <p className="font-display text-[11px] text-primary">{number}</p><p className="mt-2 text-[13px] font-semibold text-foreground">{title}</p><p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-y border-border/60 bg-surface/60">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionEyebrow num="02" label="WHAT I DO" />
          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-[620px] font-display text-4xl font-medium leading-tight sm:text-5xl">Digital services, <span className="text-electric">thoughtfully connected.</span></h2>
            <p className="max-w-[390px] pb-1 text-sm leading-6 text-muted-foreground">From intelligent automation to creative production and modern web experiences, I help businesses move forward.</p>
          </div>
          <div className="mt-12 border-t border-border">
            {serviceDetails.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.id} className="group grid gap-6 border-b border-border py-8 md:grid-cols-[74px_0.9fr_1fr] md:gap-8 md:py-10 lg:grid-cols-[94px_0.9fr_1fr] lg:gap-12">
                  <div className="flex items-start justify-between md:block"><p className="font-display text-sm text-primary">{service.num}</p><Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary md:mt-6" /></div>
                  <div>
                    <h3 className="whitespace-pre-line font-display text-[25px] font-medium leading-[1.25] sm:text-[29px]">{service.title}</h3>
                    <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-primary transition-all hover:gap-3">{service.cta}<ArrowRight className="size-3.5" /></a>
                  </div>
                  <div>
                    <p className="max-w-[500px] text-[13px] leading-6 text-muted-foreground sm:text-sm">{service.description}</p>
                    <ul className="mt-5 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                      {service.areas.map((area) => <li key={area} className="flex gap-2 text-[11px] leading-5 text-foreground/80"><Check className="mt-1 size-3 shrink-0 text-primary" />{area}</li>)}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">{service.tools.map((tool) => <span key={tool} className="border border-border bg-background/60 px-2.5 py-1 text-[10px] text-muted-foreground">{tool}</span>)}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-20 bg-background">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionEyebrow num="03" label="SELECTED WORK & PROJECTS" />
          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div><h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">A closer look at <span className="text-electric">the ideas.</span></h2><p className="mt-4 max-w-[560px] text-sm leading-6 text-muted-foreground">A range of automation, creative production and web experience concepts—each shaped around a practical problem to solve.</p></div>
            <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-primary">Have something in mind? <ArrowUpRight className="size-4" /></a>
          </div>
          <div className="mt-9 grid border border-border bg-surface/60 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><p className="text-[10px] font-semibold tracking-[0.16em]">AI PROJECT MATCHER</p></div>
              <h3 className="mt-4 font-display text-2xl font-medium">What kind of creative work do you need?</h3>
              <p className="mt-2 text-[12px] leading-5 text-muted-foreground">Describe the project, and I&apos;ll suggest portfolio concepts that may be relevant.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Automate new lead follow-ups", "Create a cinematic product video", "Design a modern business website"].map((example) => <Button key={example} type="button" variant="outline" size="sm" onClick={() => { setMatcherNeed(example); setMatcherResults(null); setMatcherError(null); }} className="h-auto min-h-8 whitespace-normal rounded-sm px-2.5 py-1.5 text-left text-[10px] leading-4">{example}</Button>)}
              </div>
              <form onSubmit={handleMatcherSubmit} className="mt-4">
                <label htmlFor="project-matcher-need" className="sr-only">Describe the creative work you need</label>
                <Textarea id="project-matcher-need" value={matcherNeed} onChange={(event) => { setMatcherNeed(event.target.value); setMatcherError(null); }} maxLength={700} minLength={12} required placeholder="For example: I need an assistant that can answer customer calls and help schedule appointments…" rows={4} className="min-h-[112px] resize-y rounded-sm border-border bg-background px-3 py-3 text-[12px] leading-5" />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className="max-w-[280px] text-[10px] leading-4 text-muted-foreground">Keep your description focused on the project; don&apos;t include confidential details.</p><Button type="submit" disabled={matcherBusy || matcherNeed.trim().length < 12} className="h-10 shrink-0 rounded-sm px-4 text-[11px]">{matcherBusy ? "Finding matches…" : "Find project matches"}{matcherBusy ? <LoaderCircle className="animate-spin"/> : <ArrowRight/>}</Button></div>
              </form>
            </div>
            <div aria-live="polite" className="min-h-[250px] p-5 sm:p-7 lg:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4"><div><p className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">SUGGESTED CONCEPTS</p><p className="mt-1 text-[11px] text-muted-foreground">Matched to your project description</p></div><span className="grid size-8 place-items-center border border-border text-primary"><Sparkles className="size-3.5"/></span></div>
              {matcherBusy && <div role="status" className="flex min-h-[170px] items-center gap-3 text-[12px] text-muted-foreground"><LoaderCircle className="size-4 animate-spin text-primary"/>Considering the closest portfolio concepts…</div>}
              {!matcherBusy && matcherError && <div role="alert" className="mt-5 border border-destructive/40 bg-destructive/10 p-4 text-[12px] leading-5 text-foreground">{matcherError}</div>}
              {!matcherBusy && matcherResults && matcherResults.length === 0 && <p className="mt-5 text-[12px] leading-6 text-muted-foreground">No close matches surfaced. Try describing the outcome, the format you need, or the tools involved.</p>}
              {!matcherBusy && matcherResults && matcherResults.length > 0 && <div className="mt-2 divide-y divide-border">{matcherResults.map((recommendation) => {
                const project = projects.find((item) => item.id === recommendation.projectId);
                if (!project) return null;
                return <button key={project.id} type="button" onClick={() => setSelectedProject(project)} className="group w-full cursor-pointer py-4 text-left first:pt-4"><span className="flex items-start justify-between gap-3"><span><span className="text-[9px] font-semibold tracking-[0.12em] text-primary">{project.category.toUpperCase()}</span><span className="mt-1 block font-display text-base font-medium text-foreground transition-colors group-hover:text-electric">{project.title}</span></span><ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"/></span><span className="mt-2 block text-[11px] leading-5 text-muted-foreground">{recommendation.reason}</span></button>;
              })}</div>}
              {!matcherBusy && !matcherError && matcherResults === null && <div className="flex min-h-[170px] items-center"><div><p className="font-display text-lg text-foreground">A more relevant place to start.</p><p className="mt-2 max-w-[360px] text-[12px] leading-5 text-muted-foreground">Share a few details to find the portfolio concepts closest to what you have in mind.</p></div></div>}
            </div>
          </div>
          <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {projectFilters.map((item) => <Button key={item} type="button" size="sm" variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)} className="h-9 rounded-sm px-3.5 text-[11px]">{item}</Button>)}
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
            {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelectedProject(project)} />)}
          </div>
          <p className="mt-9 border-t border-border pt-5 text-[11px] leading-5 text-muted-foreground">These are illustrative project concepts, not claims of commissioned or completed client work. Examples can be updated with actual project materials and links.</p>
        </div>
      </section>

      <section id="skills" className="scroll-mt-20 border-y border-border/60 bg-surface/60">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionEyebrow num="04" label="TOOLS, TECHNOLOGIES & EXPERTISE" />
          <div className="mt-7 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div><h2 className="max-w-[470px] font-display text-4xl font-medium leading-tight sm:text-5xl">The right tools for <span className="text-electric">the work.</span></h2><p className="mt-5 max-w-[400px] text-sm leading-6 text-muted-foreground">A practical toolkit across automation, conversational AI, creative production and the web. Tools are chosen to fit the project.</p><div className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground"><Layers3 className="size-4 text-primary" /> Four connected areas of practice</div></div>
            <div className="grid border-l border-t border-border sm:grid-cols-2">
              {skillGroups.map((group, index) => { const Icon = group.icon; return <div key={group.title} className={cn("border-b border-r border-border p-5 sm:p-6", index < 2 && "sm:border-b")}><div className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-border bg-background text-primary"><Icon className="size-4" /></span><h3 className="text-sm font-semibold">{group.title}</h3></div><div className="mt-5 flex flex-wrap gap-2">{group.list.map((skill) => <span key={skill} className="border border-border/80 px-2.5 py-1.5 text-[10px] text-muted-foreground">{skill}</span>)}</div></div>; })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionEyebrow num="05" label="FROM IDEA TO IMPLEMENTATION" />
          <div className="mt-7 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"><div><h2 className="max-w-[380px] font-display text-4xl font-medium leading-tight sm:text-5xl">A clear path, <span className="text-electric">from the start.</span></h2><p className="mt-5 max-w-[340px] text-sm leading-6 text-muted-foreground">A thoughtful process keeps the project focused and the collaboration clear.</p></div>
            <div className="border-t border-border">{processSteps.map(([number, title, body]) => <div key={number} className="grid grid-cols-[48px_1fr] gap-3 border-b border-border py-5 sm:grid-cols-[60px_0.68fr_1fr] sm:gap-5 sm:py-6"><span className="font-display text-[12px] text-primary">{number}</span><h3 className="text-sm font-semibold">{title}</h3><p className="col-start-2 text-[12px] leading-5 text-muted-foreground sm:col-start-auto">{body}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/60">
        <div className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <SectionEyebrow num="06" label="WHY WORK WITH ME" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"><h2 className="max-w-[430px] font-display text-4xl font-medium leading-tight sm:text-5xl">Good work starts with <span className="text-electric">understanding.</span></h2>
            <div className="grid border-t border-border sm:grid-cols-2">{reasons.map(([title, body], index) => <div key={title} className={cn("border-b border-border py-5 sm:px-5", index % 2 === 0 && "sm:border-r sm:pl-0", index % 2 === 1 && "sm:pr-0", index === 4 && "sm:border-r-0")}><p className="text-[13px] font-semibold">{title}</p><p className="mt-2 text-[12px] leading-5 text-muted-foreground">{body}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="portfolio-gridlines pointer-events-none absolute inset-0 opacity-60" /><div className="hero-light pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-[1360px] flex-col gap-7 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-24">
          <div className="max-w-[730px]"><p className="text-[10px] font-semibold tracking-[0.2em] text-primary">LET&apos;S MAKE SOMETHING USEFUL</p><h2 className="mt-5 font-display text-4xl font-medium leading-[1.12] sm:text-5xl">Have an idea? Let&apos;s turn it into <span className="text-electric">something powerful.</span></h2><p className="mt-5 max-w-[620px] text-sm leading-6 text-muted-foreground">Whether it&apos;s an intelligent automation, an engaging AI-powered video or a professional website, let&apos;s talk about what you have in mind.</p></div>
          <div className="flex flex-wrap gap-3"><Button asChild size="lg" className="h-12 rounded-sm px-5 text-[12px]"><a href="#contact">Let&apos;s discuss your project <ArrowRight /></a></Button><Button asChild variant="outline" size="lg" className="h-12 rounded-sm bg-transparent px-5 text-[12px]"><a href="#work">View my portfolio <ArrowUpRight /></a></Button></div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16 bg-background">
        <div className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <SectionEyebrow num="07" label="LET'S WORK TOGETHER" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div><h2 className="max-w-[440px] font-display text-4xl font-medium leading-tight sm:text-5xl">Tell me what you&apos;re <span className="text-electric">building.</span></h2><p className="mt-5 max-w-[390px] text-sm leading-6 text-muted-foreground">Have a project in mind? Send a note and let&apos;s discuss how I can help bring your digital ideas to life.</p>
              <div className="mt-10 border-t border-border pt-6"><p className="text-[10px] font-semibold tracking-[0.17em] text-muted-foreground">EMAIL</p><a className="mt-3 inline-flex items-center gap-3 text-[15px] font-semibold transition-colors hover:text-primary sm:text-base" href="mailto:taiwodavid4327@gmail.com"><Mail className="size-4 text-primary" />taiwodavid4327@gmail.com</a><p className="mt-5 text-[12px] text-muted-foreground">David Taiwo <span className="mx-2 text-border">/</span> Independent digital solutions specialist</p></div>
              <p className="mt-8 max-w-[360px] text-[11px] leading-5 text-muted-foreground">For a reliable introduction, social and marketplace profile links will appear here once the profile URLs are available.</p>
            </div>
            <form onSubmit={handleContactSubmit} className="border-t border-border pt-6" aria-label="Project inquiry form">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-[11px] font-medium text-foreground">Full name<Input name="name" autoComplete="name" placeholder="Your name" required minLength={2} className="h-11 rounded-sm border-border bg-surface px-3 text-[13px]" /></label>
                <label className="grid gap-2 text-[11px] font-medium text-foreground">Email address<Input name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="h-11 rounded-sm border-border bg-surface px-3 text-[13px]" /></label>
                <label className="grid gap-2 text-[11px] font-medium text-foreground">Service required<select name="service" required defaultValue="" className="h-11 w-full border border-input bg-surface px-3 text-[12px] text-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="" disabled>Select a service</option>{["AI Automation", "AI Agents & Voice Assistants", "AI Video Production", "3D Animation", "Website Design", "Other"].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
                <label className="grid gap-2 text-[11px] font-medium text-foreground">Project budget <span className="inline font-normal text-muted-foreground">(optional)</span><Input name="budget" placeholder="e.g. $1,000–$2,500" className="h-11 rounded-sm border-border bg-surface px-3 text-[13px]" /></label>
                <label className="grid gap-2 text-[11px] font-medium text-foreground sm:col-span-2">Project details<Textarea name="details" placeholder="A little about the project, what you need, and what success looks like…" required minLength={10} rows={5} className="min-h-[132px] resize-y rounded-sm border-border bg-surface px-3 py-3 text-[13px] leading-5" /></label>
              </div>
              <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"><Button type="submit" disabled={formBusy} size="lg" className="h-12 min-w-[210px] rounded-sm px-5 text-[12px]">{formBusy ? "Opening email…" : "Send project inquiry"}<Send className="size-4" /></Button><p className="max-w-[310px] text-[10px] leading-4 text-muted-foreground">Your email app will open with the inquiry addressed to David. You can review and send it there.</p></div>
              {formState === "sent" && <p role="status" className="mt-4 border border-primary/40 bg-primary/10 p-3 text-[12px] text-foreground">Your email app should open with the project details prepared. Send it there to complete your inquiry.</p>}
              {formState === "error" && <p role="alert" className="mt-4 border border-destructive/40 bg-destructive/10 p-3 text-[12px] text-foreground">We couldn&apos;t open your email app. Please email David directly at taiwodavid4327@gmail.com.</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface/60">
        <div className="mx-auto max-w-[1360px] px-5 py-8 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><a href="#home" className="inline-flex items-center gap-3"><span className="grid size-9 place-items-center border border-primary/50 text-xs font-bold text-primary">DT</span><span className="font-display text-[12px] font-semibold tracking-[0.12em]">DAVID TAIWO</span></a>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">{[{ label: "Home", href: "#home" }, ...navLinks, { label: "Contact", href: "#contact" }].map((link) => <a key={link.href} className="text-[11px] text-muted-foreground transition-colors hover:text-foreground" href={link.href}>{link.label}</a>)}</nav>
          </div>
          <div className="mt-7 flex flex-col gap-3 border-t border-border pt-5 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>Building smarter systems, creating compelling digital experiences and helping businesses use modern technology.</p><p>© 2026 David Taiwo. All rights reserved.</p></div>
        </div>
      </footer>

      {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return <div className="flex items-center gap-3"><span className="font-display text-[11px] text-primary">{num}</span><span className="h-px w-8 bg-border" /><p className="text-[10px] font-semibold tracking-[0.19em] text-muted-foreground">{label}</p></div>;
}

function ProjectCard({ project, index, onOpen }: { project: (typeof projects)[number]; index: number; onOpen: () => void }) {
  return (
    <button type="button" className="project-card group min-w-0 cursor-pointer text-left" onClick={onOpen} aria-label={`View ${project.title} concept`}>
      <div className="relative aspect-[1.72] overflow-hidden border border-border bg-surface">
        {project.visual === "image" && <img src={project.image} alt="Illustrative cinematic product film concept" width={1440} height={1008} loading="lazy" className="project-image size-full object-cover" />}
        {project.visual !== "image" && <ProjectVisual visual={project.visual} index={index} />}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4"><span className="border border-border/80 bg-background/90 px-2.5 py-1 text-[9px] font-medium text-foreground backdrop-blur-sm">{project.type}</span><span className="grid size-8 place-items-center border border-border/80 bg-background/85 text-foreground transition-colors group-hover:border-primary group-hover:text-primary"><ArrowUpRight className="size-3.5" /></span></div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent px-4 pb-4 pt-12"><p className="text-[9px] font-semibold tracking-[0.14em] text-primary">{project.category.toUpperCase()}</p></div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3"><div><h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-electric sm:text-xl">{project.title}</h3><p className="mt-2 line-clamp-2 max-w-[500px] text-[12px] leading-5 text-muted-foreground">{project.description}</p></div></div>
      <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">{project.tools.map((tool) => <span key={tool} className="text-[9px] text-muted-foreground">{tool}<span className="ml-2 text-border">/</span></span>)}</div>
    </button>
  );
}

function ProjectVisual({ visual, index }: { visual: string; index: number }) {
  if (visual === "website") return <div className="project-image size-full bg-background p-[7%]"><div className="size-full overflow-hidden border border-border bg-surface"><div className="flex h-[12%] items-center gap-3 border-b border-border px-4"><span className="size-2 rounded-full bg-primary" /><span className="h-1 w-12 bg-muted" /><span className="ml-auto h-1 w-8 bg-muted" /></div><div className="grid h-[88%] grid-cols-[1fr_0.75fr] items-center gap-4 p-[6%]"><div><div className="h-2 w-[72%] bg-foreground/70" /><div className="mt-2 h-2 w-[54%] bg-foreground/30" /><div className="mt-4 h-1.5 w-[85%] bg-muted" /><div className="mt-2 h-1.5 w-[64%] bg-muted" /><div className="mt-5 h-6 w-20 bg-primary/70" /></div><div className="aspect-[0.9] border border-border bg-gradient-to-br from-electric-soft to-surface-raised" /></div></div></div>;
  if (visual === "workflow") return <div className="project-image relative size-full overflow-hidden bg-surface p-[6%]"><div className="portfolio-gridlines absolute inset-0 opacity-30" /><div className="relative grid h-full grid-cols-3 grid-rows-2 items-center justify-items-center gap-3 sm:gap-5"><FlowNode icon={<MessageSquareText />} label="Form"/><FlowNode icon={<Workflow />} label="Workflow"/><FlowNode icon={<Layers3 />} label="Record"/><FlowNode icon={<Bot />} label="AI assist"/><FlowNode icon={<Mail />} label="Welcome"/><FlowNode icon={<Check />} label="Notify"/></div><div className="absolute left-[21%] top-[32%] h-px w-[20%] bg-primary/60"/><div className="absolute right-[21%] top-[32%] h-px w-[20%] bg-primary/60"/><div className="absolute left-[21%] bottom-[31%] h-px w-[20%] bg-primary/45"/><div className="absolute right-[21%] bottom-[31%] h-px w-[20%] bg-primary/45"/></div>;
  if (visual === "email") return <div className="project-image flex size-full items-center justify-center bg-surface-raised p-[7%]"><div className="grid h-full w-full grid-cols-[0.8fr_1.2fr] overflow-hidden border border-border bg-background"><div className="border-r border-border p-[9%]"><div className="h-1.5 w-1/2 bg-primary/70"/><div className="mt-5 space-y-3">{[0,1,2,3].map((n)=><div key={n} className="h-5 border border-border bg-surface"/>)}</div></div><div className="p-[7%]"><p className="text-[9px] tracking-[0.12em] text-muted-foreground">INBOX / SORTED</p><div className="mt-4 space-y-2.5">{["Customer request", "Booking enquiry", "Follow-up", "General update"].map((item,n)=><div key={item} className="flex items-center gap-2 border-b border-border pb-2"><span className={cn("size-1.5 rounded-full", n===0?"bg-primary":"bg-muted-foreground/50")}/><span className="text-[8px] text-foreground/80 sm:text-[10px]">{item}</span><span className="ml-auto text-[7px] text-muted-foreground">{n===0?"PRIORITY":"SORTED"}</span></div>)}</div></div></div></div>;
  if (visual === "voice") return <div className="project-image flex size-full items-center justify-center bg-surface p-[6%]"><div className="flex h-full w-full items-center justify-center gap-6 border border-border bg-background sm:gap-10"><div className="grid size-20 place-items-center border border-primary/40 bg-primary/10 sm:size-28"><AudioLines className="size-8 text-primary sm:size-10"/></div><div><p className="text-[9px] tracking-[0.15em] text-primary">VOICE ASSISTANT CONCEPT</p><p className="mt-2 font-display text-lg sm:text-2xl">Hello, how can<br/>I help you?</p><div className="mt-4 flex items-center gap-1">{Array.from({length:18},(_,i)=><span key={i} className="w-1 bg-primary/70" style={{height:`${8+((i*11)%18)}px`}}/>)}</div></div></div></div>;
  if (visual === "social") return <div className="project-image grid size-full grid-cols-3 items-center justify-items-center gap-2 bg-background px-[6%]"><SocialNode title="SOURCE" icon={<Layers3/>}/><SocialNode title="CREATE" icon={<Sparkles/>}/><SocialNode title="PUBLISH" icon={<ArrowUpRight/>}/><div className="absolute left-[26%] right-[26%] top-1/2 -z-0 h-px bg-primary/60"/></div>;
  if (visual === "animation") return <div className="project-image relative size-full overflow-hidden bg-gradient-to-br from-electric-soft via-surface-raised to-background"><div className="absolute inset-0 opacity-30 portfolio-gridlines"/><div className="absolute left-[12%] top-[22%] size-20 border border-primary/40 sm:size-28"/><div className="absolute left-[17%] top-[30%] size-20 border border-primary/50 sm:size-28"/><div className="absolute right-[16%] top-[23%] grid size-28 place-items-center border border-border bg-background/70 sm:size-40"><div className="size-16 border border-primary/60 bg-primary/15 sm:size-24"/></div><div className="absolute bottom-[16%] left-[12%] h-px w-[76%] bg-border"/></div>;
  return <div className="project-image size-full bg-gradient-to-br from-surface to-background p-[7%]"><div className="flex size-full items-center justify-center gap-[8%] border border-border bg-surface/50"><div className="max-w-[55%]"><p className="text-[8px] tracking-[0.15em] text-primary sm:text-[10px]">EXPLAIN IT CLEARLY</p><div className="mt-4 h-2 w-4/5 bg-foreground/65"/><div className="mt-2 h-2 w-3/5 bg-foreground/25"/><div className="mt-5 space-y-2"><span className="block h-1 w-[95%] bg-muted"/><span className="block h-1 w-[85%] bg-muted"/><span className="block h-1 w-[62%] bg-muted"/></div></div><div className="grid size-24 place-items-center border border-primary/40 bg-primary/10 sm:size-36"><Play className="size-7 text-primary sm:size-9"/></div></div></div>;
}

function FlowNode({ icon, label }: { icon: React.ReactNode; label: string }) { return <div className="relative z-10 flex w-full max-w-[116px] items-center gap-2 border border-border bg-background/95 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5"><span className="text-primary [&>svg]:size-3.5 sm:[&>svg]:size-4">{icon}</span><span className="truncate text-[8px] text-foreground sm:text-[10px]">{label}</span></div>; }

function SocialNode({title,icon}:{title:string;icon:React.ReactNode}){return <div className="relative z-10 grid aspect-square w-full max-w-36 place-items-center border border-border bg-surface"><span className="text-primary [&>svg]:size-5 sm:[&>svg]:size-7">{icon}</span><span className="absolute bottom-2 text-[8px] font-semibold tracking-[0.12em] text-muted-foreground">{title}</span></div>;}

function ProjectDialog({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="relative max-h-[90vh] w-full max-w-[760px] overflow-y-auto border border-border bg-surface p-5 sm:p-8">
      <Button type="button" variant="ghost" size="icon" className="absolute right-3 top-3" aria-label="Close project details" onClick={onClose}><X/></Button>
      <p className="text-[10px] font-semibold tracking-[0.16em] text-primary">{project.type.toUpperCase()} <span className="mx-1.5 text-border">/</span> {project.category.toUpperCase()}</p>
      <h2 id="project-dialog-title" className="mt-3 max-w-[620px] pr-8 font-display text-3xl font-medium sm:text-4xl">{project.title}</h2>
      <div className="mt-6 aspect-[1.8] overflow-hidden border border-border bg-background">{project.visual === "image" ? <img src={project.image} alt="Illustrative cinematic product film concept" width={1440} height={1008} className="size-full object-cover"/> : <ProjectVisual visual={project.visual} index={0}/>}</div>
      <p className="mt-6 max-w-[640px] text-sm leading-7 text-muted-foreground">{project.description}</p>
      <div className="mt-6"><p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">TOOLS IN THIS CONCEPT</p><div className="mt-3 flex flex-wrap gap-2">{project.tools.map((tool)=><span key={tool} className="border border-border px-3 py-1.5 text-[11px] text-foreground/80">{tool}</span>)}</div></div>
      <div className="mt-6 border-t border-border pt-4 text-[11px] leading-5 text-muted-foreground">An illustrative concept, not presented as completed client work.</div>
      <a href="#contact" onClick={onClose} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-primary">Discuss a similar project <ArrowUpRight className="size-4"/></a>
    </section>
  </div>;
}