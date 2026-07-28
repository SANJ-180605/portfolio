import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaJava,
  FaPython,
  FaReact,
  FaAws,
} from "react-icons/fa";

const skillCategories = [
  {
    title: "Languages",
    icon: "⌨️",
    tags: ["Python", "Java", "C++", "JavaScript"],
  },
  {
    title: "Frontend",
    icon: "🌐",
    tags: ["React.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend & Stack",
    icon: "⚙️",
    tags: ["Node.js", "Express.js", "FastAPI", "MongoDB", "PostgreSQL"],
  },
  {
    title: "AI / ML",
    icon: "🤖",
    tags: ["Machine Learning", "Deep Learning", "KNN", "Naive Bayes", "GNN", "Pandas", "NumPy"],
  },
  {
    title: "Cloud & Tools",
    icon: "☁️",
    tags: ["AWS", "SQL", "Git", "GitHub", "Power BI", "Postman"],
  },
  {
    title: "Core CS",
    icon: "📐",
    tags: ["DSA", "DBMS", "OOP", "OS", "CN"],
  },
];

const projects = [
  {
    number: "01",
    title: "Medi-Link",
    desc: "A full-stack medical communication platform with role-based dashboards and integrated ML/DL analysis.",
    tags: ["React", "FastAPI", "PostgreSQL", "ML/DL"],
  },
  {
    number: "02",
    title: "EventHub",
    desc: "MERN event management platform with concurrent seat booking and payment verification.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    number: "03",
    title: "Student Performance Prediction",
    desc: "A machine learning model predicting student outcomes from academic and behavioral data.",
    tags: ["Python", "Pandas", "Scikit-Learn"],
  },
  {
    number: "04",
    title: "Weather App",
    desc: "React app that fetches live weather data and displays forecasts in a clean responsive interface.",
    tags: ["React", "REST API", "JavaScript"],
  },
];

const aboutCards = [
  {
    icon: "🎓",
    title: "SJB Institute of Technology",
    description: "B.E. ISE · 2023–2027 · CGPA 9.42",
  },
  {
    icon: "📍",
    title: "Bangalore, India",
    description: "+91 95353 46384",
  },
];

const contactCards = [
  {
    icon: "📧",
    label: "Email",
    value: "sanjanabasavachary2005@gmail.com",
    href: "mailto:sanjanabasavachary2005@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "sanjana-b-52185b313",
    href: "https://www.linkedin.com/in/sanjana-b-52185b313/",
  },
  {
    icon: "💻",
    label: "GitHub",
    value: "SANJ-180605",
    href: "https://github.com/SANJ-180605",
  },
  {
    icon: "⚡",
    label: "LeetCode",
    value: "sanjana_basavachary",
    href: "https://leetcode.com/u/sanjana_basavachary/",
  },
];

const resumeUrl = "https://drive.google.com/file/d/1_BYHPjhlsaY0B3o9-5hKuJHR0wqev_PG/view?usp=drive_link";

const heroStats = [
  { value: "9.42★", label: "CGPA · 5 semesters" },
  { value: "125+", label: "LeetCode Problems" },
  { value: "4+", label: "Full Stack Projects" },
];

export default function App() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let frameId;

    const onMouseMove = (event) => {
      mx = event.clientX;
      my = event.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      frameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    animateRing();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.006,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.a += star.da;

        if (star.a < 0.05) star.da = Math.abs(star.da);
        if (star.a > 1) star.da = -Math.abs(star.da);
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,160,255,${star.a * 0.7})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("on");
        });
      },
      { threshold: 0.18 }
    );
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      let current = "hero";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 140) {
          current = section.id;
        }
      });
      setActiveSection(current);
      links.forEach((link) => {
        link.classList.toggle("text-white", link.getAttribute("href") === `#${current}`);
        link.classList.toggle("text-zinc-400", link.getAttribute("href") !== `#${current}`);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init("549h6jgpfbadTIYqw");
    } catch (err) {
      // ignore init errors
    }
  }, []);

  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      await emailjs.send(
        "service_5sflinc",
        "template_c3yetm9",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          reply_to: formData.email,
        }
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      alert("Message sent — thanks! I will reply soon.");
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  

  return (
    <div id="home" className="relative min-h-screen overflow-x-hidden bg-[#08080e] text-white">
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
      <canvas ref={canvasRef} className="stars-canvas" />
      <div className="grid-lines" />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08080e]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#hero" className="text-xl font-black tracking-tight">
            Sanjana<em className="text-purple-400">.</em>
          </a>

          <div className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link text-sm transition ${activeSection === item.href.slice(1) ? "text-white" : "text-zinc-400"}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={resumeUrl}
              download
              className="nav-pill inline-flex items-center justify-center rounded-full border border-white/10 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20 hover:text-white"
            >
              Resume
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple-300/40 md:hidden"
          >
            <span className="text-2xl">{mobileMenuOpen ? "×" : "☰"}</span>
          </button>

          <a
            href="https://github.com/SANJ-180605"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-purple-300 transition hover:bg-white/10 md:inline-flex"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <div className={`mobile-menu fixed inset-0 z-40 flex items-center justify-center bg-[#08080e]/95 px-6 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,92,252,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(232,121,249,0.16),_transparent_40%)]" />
        <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 rounded-[34px] border border-white/10 bg-[#111120]/95 p-10 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute right-6 top-6 text-3xl text-white/80 hover:text-white"
          >
            ×
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-white transition hover:text-purple-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/SANJ-180605"
            target="_blank"
            rel="noreferrer"
            className="nav-pill inline-flex items-center justify-center rounded-full border border-white/10 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20 hover:text-white"
          >
            GitHub ↗
          </a>
          <a
            href={resumeUrl}
            download
            className="nav-pill inline-flex items-center justify-center rounded-full border border-white/10 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20 hover:text-white"
          >
            Resume
          </a>
        </div>
      </div>

      <main>
        <section id="hero" className="relative min-h-screen px-6 pt-28 pb-24 md:px-10">
          <div className="absolute right-[-120px] top-[-150px] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute left-[-80px] bottom-[-50px] h-[350px] w-[350px] rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute left-[40%] top-[40%] h-[200px] w-[200px] rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
            <span className="hero-badge mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-purple-200">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
              Open to opportunities · Bangalore, India
            </span>

            <h1 className="hero-title text-5xl font-black tracking-tight text-white md:text-7xl lg:text-[5rem]">
              <span className="block text-2xl font-light text-zinc-400">Hi, I&apos;m</span>
              <span className="mt-4 block">Sanjana <span className="shimmer bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">B.</span></span>
            </h1>

            <p className="hero-sub mx-auto mt-8 max-w-2xl text-lg text-zinc-400 leading-8">
              Information Science Engineering student passionate about Data Science, Machine Learning, and Full Stack Development.
            </p>

            <div className="hero-btns mt-12 flex flex-wrap justify-center gap-4">
              <a href="#projects" className="btn-glow inline-flex items-center justify-center rounded-full bg-purple-500 px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(124,92,252,0.25)]">
                View My Work →
              </a>
              <a href="#contact" className="btn-ghost inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm text-zinc-300 transition hover:border-purple-400 hover:text-white hover:-translate-y-1">
                Get In Touch
              </a>
            </div>

            <div className="hero-stats mt-16 grid gap-6 text-left sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="stat-n text-3xl font-black text-white">{stat.value}</div>
                  <p className="stat-l mt-3 text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-base bg-[#0e0e18] py-20 px-6 md:px-10">
          <div className="mx-auto w-full max-w-6xl xl:w-[80%]">
            <p className="s-tag text-sm uppercase tracking-[0.35em] text-purple-400">About Me</p>
            <h2 className="s-title mt-4 text-4xl font-black text-white md:text-5xl">Who I Am</h2>
            <p className="s-sub mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              I&apos;m an Information Science Engineering student at SJB Institute of Technology, Bangalore with a CGPA of 9.42. I code DSA in Java and build full-stack web apps using React and Python FastAPI.
            </p>

            <div className="about-wrap mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="about-text space-y-6 text-zinc-300">
                <p>
                  I&apos;ve integrated real <strong className="text-white">ML and DL models</strong> into production web applications — not just as concepts but as working features.
                </p>
                <p>
                  I also hold an <strong className="text-purple-300">AWS Cloud certification</strong> and completed a Data Analysis internship at <em className="text-white">Deloitte</em> on Forage.
                </p>
                <p>
                  I&apos;ve solved <strong className="text-white">125+ problems</strong> on LeetCode, won <strong className="text-purple-300">1st place</strong> at the InnoSpark Idea Pitching Competition, and led a MERN stack hackathon team.
                </p>
              </div>

              <div className="about-cards grid gap-4">
                {aboutCards.map((card, index) => (
                  <div key={index} className="acard reveal rounded-3xl border border-white/10 bg-[#111120] p-6 transition hover:border-purple-400/30 hover:-translate-x-1 hover:shadow-[0_18px_60px_rgba(124,92,252,0.08)]">
                    <div className="flex items-center gap-4">
                      <div className="acard-icon flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-xl text-purple-300">{card.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                        <p className="mt-1 text-sm text-zinc-400">
                          {card.description}
                          {card.links && (
                            <span className="mt-2 block space-x-3">
                              {card.links.map((link) => (
                                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="text-purple-300 hover:text-white">
                                  {link.label}
                                </a>
                              ))}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-base py-20 px-6 md:px-10">
          <div className="mx-auto w-full max-w-6xl xl:w-[80%]">
            <p className="s-tag text-sm uppercase tracking-[0.35em] text-purple-400">Skills</p>
            <h2 className="s-title mt-4 text-4xl font-black text-white md:text-5xl">What I Work With</h2>
            <p className="s-sub mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              Languages, frameworks and tools I use to build end-to-end solutions.
            </p>

            <div className="skills-wrap mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skillCategories.map((category) => (
                <div key={category.title} className="scat rounded-3xl border border-white/10 bg-[#111120] p-8 transition hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(124,92,252,0.08)]">
                  <div className="scat-head mb-6 flex items-center gap-4">
                    <div className="scat-icon flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-xl text-purple-300">{category.icon}</div>
                    <h3 className="scat-name text-lg font-semibold text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.tags.map((tag) => (
                      <span key={tag} className="pill rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-purple-400 hover:text-purple-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-base bg-[#0e0e18] py-20 px-6 md:px-10">
          <div className="mx-auto w-full max-w-6xl xl:w-[80%]">
            <p className="s-tag text-sm uppercase tracking-[0.35em] text-purple-400">Projects</p>
            <h2 className="s-title mt-4 text-4xl font-black text-white md:text-5xl">What I&apos;ve Built</h2>
            <p className="s-sub mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              Full-stack apps with real ML/DL integration — built and shipped end to end.
            </p>

            <div className="proj-grid mt-12 grid gap-8 xl:grid-cols-2">
              {projects.map((project) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={project.title}
                  className="flip-card pcard rounded-[28px] border border-white/10 bg-transparent overflow-hidden transition hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(124,92,252,0.12)]"
                >
                  <div className="flip-card-inner group relative h-full w-full min-h-[340px] rounded-[28px]">
                    <div className="flip-card-front absolute inset-0 rounded-[28px] border border-white/10 bg-[#111120] p-10">
                      <span className="pcard-num text-sm uppercase tracking-[0.35em] text-purple-400">{project.number}</span>
                      <h3 className="pcard-title mt-4 text-3xl font-black text-white">{project.title}</h3>
                      <div className="ptags mt-8 flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="ptag rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-2 text-sm text-purple-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-10 text-sm text-zinc-400">Hover to see the project description.</div>
                    </div>

                    <div className="flip-card-back absolute inset-0 rounded-[28px] border border-white/10 bg-[#111120] p-10">
                      <span className="pcard-num text-sm uppercase tracking-[0.35em] text-purple-400">{project.number}</span>
                      <h3 className="pcard-title mt-4 text-3xl font-black text-white">{project.title}</h3>
                      <p className="pcard-desc mt-6 text-zinc-400 leading-8">{project.desc}</p>
                      <div className="pcard-foot mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-purple-300">
                        <span>View on GitHub</span>
                        <a href="https://github.com/SANJ-180605" target="_blank" rel="noreferrer" className="plink font-semibold hover:text-white">
                          →
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-base py-20 px-6 md:px-10">
          <div className="mx-auto w-full max-w-6xl xl:w-[80%]">
            <p className="s-tag text-sm uppercase tracking-[0.35em] text-purple-400">Contact</p>
            <h2 className="s-title mt-4 text-4xl font-black text-white md:text-5xl">Reach Out Directly</h2>
            <p className="s-sub mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              Whether you are looking to hire a dedicated Software Engineer, explore AI patent architectures, or discuss hackathons — my inbox is always open.
            </p>

            <div className="contact-layout mt-12 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[32px] border border-white/10 bg-[#111120] p-8 shadow-[0_20px_60px_rgba(124,92,252,0.08)]">
                <p className="text-sm uppercase tracking-[0.35em] text-purple-400">Contact Box</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">Send a message or download my resume to get started.</h3>
                <p className="mt-3 text-zinc-400">Use the quick links below to reach me on email, LinkedIn, GitHub, or LeetCode. I’m happy to chat about internships, projects, and full-stack development.</p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {contactCards.map((card) => (
                    <a
                      key={card.label}
                      href={card.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ccard group rounded-3xl border border-white/10 bg-[#0f0f18] p-6 text-left transition hover:border-purple-400/30 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(124,92,252,0.08)]"
                    >
                      <div className="cicon mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-2xl text-purple-300 transition group-hover:rotate-6">
                        {card.icon}
                      </div>
                      <span className="clabel block text-xs uppercase tracking-[0.35em] text-zinc-500">{card.label}</span>
                      <p className="cval mt-3 text-base text-zinc-200">{card.value}</p>
                    </a>
                  ))}
                </div>

                <a
                  href={resumeUrl}
                  download
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-purple-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-purple-400"
                >
                  Download Full Resume
                </a>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[#111120] p-8 shadow-[0_20px_60px_rgba(124,92,252,0.08)]">
                <p className="text-sm uppercase tracking-[0.35em] text-purple-400">Message Form</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">Let’s catch up and discuss your next idea.</h3>
                <p className="mt-3 text-zinc-400">Share a quick note below and I’ll reply as soon as possible.</p>

                <form onSubmit={handleSend} className="mt-10 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-zinc-400">
                      <span className="text-zinc-300">Your Name</span>
                      <input name="name" value={formData.name} onChange={handleInput} type="text" placeholder="e.g. Alex Vance" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#0e0e18] px-4 py-3 text-white outline-none transition focus:border-purple-400" required />
                    </label>
                    <label className="block text-sm text-zinc-400">
                      <span className="text-zinc-300">Your Email</span>
                      <input name="email" value={formData.email} onChange={handleInput} type="email" placeholder="alex@company.com" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#0e0e18] px-4 py-3 text-white outline-none transition focus:border-purple-400" required />
                    </label>
                  </div>
                  <label className="block text-sm text-zinc-400">
                    <span className="text-zinc-300">Subject / Topic</span>
                    <input name="subject" value={formData.subject} onChange={handleInput} type="text" placeholder="Engineering Role / AI Discussion" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#0e0e18] px-4 py-3 text-white outline-none transition focus:border-purple-400" required />
                  </label>
                  <label className="block text-sm text-zinc-400">
                    <span className="text-zinc-300">Your Message</span>
                    <textarea name="message" value={formData.message} onChange={handleInput} placeholder="Share your thoughts or opportunity…" rows="5" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#0e0e18] px-4 py-3 text-white outline-none transition focus:border-purple-400" required />
                  </label>
                  <button type="submit" disabled={sending} className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-yellow-500 px-6 py-4 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:opacity-60">
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#08080e] py-10 text-center text-sm text-zinc-500">
        © 2026 Sanjana Basavachary. All Rights Reserved.
      </footer>
    </div>
  );
}
