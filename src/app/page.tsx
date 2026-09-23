"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const phone = "+918882731685";
const email = "preciselearning0014@gmail.com";
const locationUrl =
  "https://www.google.com/maps/dir//Precise+learning+Burari,+House+No+18+Street+Number+7,+Tomar+Colony,+Block+D,+D+84,+Burari,+Delhi,+110084/@28.6818304,77.2538368,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390cff4acb488daf:0x217eb5f1165e19e0!2m2!1d77.1952503!2d28.7512427?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D";
const gallery = [
  ["A focused classroom session", "/gallery-classroom.jpg"],
  ["Learning together", "/gallery-learning.jpg"],
  ["A space to do your best", "/about-teacher.jpg"],
  ["Curious minds at work", "/gallery-curious.jpg"],
];
const journeyGallery = [
  ["The classroom that started it all", "/journey-2014-1.jpg"],
  ["A teacher, always learning", "/journey-2014-2.jpg"],
  ["Growing together", "/journey-2014-3.jpg"],
  ["The people behind the journey", "/journey-2014-4.jpg"],
];
const subjects = [
  [
    "Mathematics",
    "Build problem-solving instincts.",
    <Atom key="mathematics" size={22} />,
  ],
  [
    "Science",
    "Make the world make sense.",
    <FlaskConical key="science" size={22} />,
  ],
  [
    "Physics",
    "Think in principles, not formulas.",
    <Lightbulb key="physics" size={22} />,
  ],
  [
    "Chemistry",
    "Connect reactions to reality.",
    <Microscope key="chemistry" size={22} />,
  ],
  [
    "English",
    "Write with clarity and confidence.",
    <BookOpen key="english" size={22} />,
  ],
  [
    "Social Science",
    "Learn the stories behind facts.",
    <GraduationCap key="social-science" size={22} />,
  ],
];

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Precise Learning home">
      <Image
        className="logo-image"
        src="/precise-learning-logo.png"
        alt="Precise Learning eagle logo"
        width={44}
        height={44}
        priority
      />
      <span className="logo-copy">
        PRECISE <b>LEARNING</b>
        <small>BURARI · NEW DELHI</small>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get("name") || !form.get("phone")) {
      setFormError("Please add your name and phone number.");
      return;
    }
    const name = String(form.get("name"));
    const phoneNumber = String(form.get("phone"));
    const classLookingFor = String(form.get("class") || "Not specified");
    const message = String(form.get("message") || "No additional message");
    const whatsappMessage = [
      "New enquiry from Precise Learning website",
      `Name: ${name}`,
      `Phone: ${phoneNumber}`,
      `Class: ${classLookingFor}`,
      `Message: ${message}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;
    setFormError("");
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
    event.currentTarget.reset();
  }
  return (
    <main id="top">
      <div className="announcement">
        <span>Admissions open for the 2026-27 academic year</span>
        <a href="#enquire">
          Book a free counselling call <ArrowRight size={14} />
        </a>
      </div>
      <nav className="navbar">
        <div className="container nav-inner">
          <Logo />
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#courses" onClick={() => setMenuOpen(false)}>
              Courses
            </a>
            <a href="#approach" onClick={() => setMenuOpen(false)}>
              Our approach
            </a>
            <a href="/notes" onClick={() => setMenuOpen(false)}>
              Notes portal
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </div>
          <div className="nav-actions">
            <a className="phone-link" href={`tel:${phone}`}>
              <Phone size={16} /> <span>+91 88827 31685</span>
            </a>
            <a href="/notes" className="button button-notes button-small">
              Get Notes <ArrowRight size={15} />
            </a>
            <a href="#enquire" className="button button-dark button-small">
              Enquire now <ArrowRight size={15} />
            </a>
            <button
              className="menu-button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="eyebrow"
            >
              <span className="eyebrow-dot" /> Intentional learning. Measurable
              growth.
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Where better
              <br />
              <em>thinking</em> begins.
            </motion.h1>
            <p className="hero-text">
              A focused learning space in Burari where students build strong
              fundamentals, genuine confidence and the habits to go further.
            </p>
            <div className="hero-ctas">
              <a className="button button-accent" href="#enquire">
                Start your journey <ArrowRight size={17} />
              </a>
              <a className="hero-call" href={`tel:${phone}`}>
                <Phone size={17} />
                <span>
                  <small>Call us directly</small>
                  +91 88827 31685
                </span>
              </a>
              <a className="button button-notes" href="/notes">
                Get Notes <BookOpen size={16} />
              </a>
              <a className="text-link" href="#about">
                <span className="play-icon">
                  <Play size={12} fill="currentColor" />
                </span>{" "}
                See how we teach
              </a>
            </div>
            <div className="trust-row">
              <span>
                <ShieldCheck size={16} /> Parent-trusted
              </span>
              <span>
                <Award size={16} /> Result-focused
              </span>
              <span>
                <Users size={16} /> Small batches
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div
              className="hero-image"
              role="img"
              aria-label="Students studying together in a classroom"
            />
            <div className="hero-sticker">
              <span className="sticker-number">
                9<span>+</span>
              </span>
              <span>
                years of
                <br />
                shaping futures
              </span>
            </div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>Trusted by families across Burari</span>
          <div className="line" />
          <span className="scroll-hint">
            Scroll to explore <ChevronDown size={15} />
          </span>
        </div>
      </section>
      <section id="about" className="section about-section">
        <div className="container about-grid">
          <div className="section-label">
            01 <span>About us</span>
          </div>
          <div className="about-content">
            <div className="about-heading">
              <h2>
                Clarity in teaching.
                <br />
                <span>Confidence in every student.</span>
              </h2>
              <p>
                We are more than a tuition centre. We are a close-knit academic
                community built around one belief: when a student understands
                the why, the marks follow.
              </p>
            </div>
            <div className="about-body">
              <div
                className="about-image"
                role="img"
                aria-label="Teacher guiding students in a modern classroom"
              />
              <div className="about-details">
                <p>
                  Precise Learning brings thoughtful teaching, consistent
                  practice and personal attention to Classes 6–12. Our
                  classrooms are designed for questions, not just answers.
                </p>
                <a className="text-link dark-link" href="#approach">
                  Discover our approach <ArrowRight size={16} />
                </a>
                <div className="stat-row">
                  <div>
                    <strong>
                      500<span>+</span>
                    </strong>
                    <small>students guided</small>
                  </div>
                  <div>
                    <strong>
                      94<span>%</span>
                    </strong>
                    <small>parent referrals</small>
                  </div>
                  <div>
                    <strong>9</strong>
                    <small>years of care</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="courses" className="section courses-section">
        <div className="container">
          <div className="section-intro">
            <div className="section-label">
              02 <span>Learning paths</span>
            </div>
            <div>
              <h2>
                The right rhythm
                <br />
                <span>for every stage.</span>
              </h2>
            </div>
            <p>
              Focused programmes that meet students where they are and move them
              forward with purpose.
            </p>
          </div>
          <div className="course-grid">
            <CourseCard
              number="01"
              title="Foundation"
              classes="Classes 6–8"
              text="Build the curiosity, core concepts and study habits that make future learning easier."
              tone="mint"
            />
            <CourseCard
              number="02"
              title="Momentum"
              classes="Classes 9–10"
              text="Turn fundamentals into exam confidence with structured practice and feedback."
              tone="yellow"
            />
            <CourseCard
              number="03"
              title="Direction"
              classes="Classes 11–12"
              text="Go deeper, think sharper and prepare for board exams with a clear plan."
              tone="coral"
            />
          </div>
        </div>
      </section>
      <section className="section subjects-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">
                03 <span>What we teach</span>
              </div>
              <h2>
                Strong subjects.
                <br />
                <span>Stronger foundations.</span>
              </h2>
            </div>
            <p>
              Our teachers make each subject feel less like a hurdle and more
              like a skill worth owning.
            </p>
          </div>
          <div className="subject-grid">
            {subjects.map(([title, text, icon]) => (
              <div className="subject-card" key={title as string}>
                <div className="subject-icon">{icon}</div>
                <h3>{title as string}</h3>
                <p>{text as string}</p>
                <ArrowRight size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="approach" className="section approach-section">
        <div className="container">
          <div className="approach-head">
            <div className="section-label">
              04 <span>Our approach</span>
            </div>
            <h2>
              Progress is a process.
              <br />
              <em>We make it visible.</em>
            </h2>
            <p>
              Good learning is not a single breakthrough. It is a sequence of
              small, supported wins.
            </p>
          </div>
          <div className="timeline">
            <Step
              number="01"
              icon={<Lightbulb />}
              title="Understand"
              text="We start with the why, using simple explanations and real-world connections."
            />
            <Step
              number="02"
              icon={<BookOpen />}
              title="Practice"
              text="Guided examples become independent attempts, at exactly the right pace."
            />
            <Step
              number="03"
              icon={<Target />}
              title="Test"
              text="Regular, low-pressure checks reveal what is clear and what needs attention."
            />
            <Step
              number="04"
              icon={<Sparkles />}
              title="Improve"
              text="Feedback turns mistakes into a smarter plan for the next attempt."
            />
          </div>
        </div>
      </section>
      <section className="section gallery-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">
                05 <span>Inside Precise</span>
              </div>
              <h2>
                A place where
                <br />
                <span>focus feels natural.</span>
              </h2>
            </div>
            <p>
              Take a peek at the warm, focused spaces where our students learn
              every day.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map(([caption, image], index) => (
              <button
                className={`gallery-tile gallery-${index + 1}`}
                key={image}
                onClick={() => setSelectedImage(image)}
                aria-label={`Open image: ${caption}`}
                style={{ backgroundImage: `url(${image})` }}
              >
                <span>{caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section journey-section">
        <div className="container">
          <div className="journey-heading">
            <div>
              <div className="section-label">
                06 <span>Since 2014</span>
              </div>
              <h2>
                Our journey,
                <br />
                <em>through the years.</em>
              </h2>
            </div>
            <p>Where every photograph tells a story of our journey.</p>
          </div>
          <div className="journey-grid">
            {journeyGallery.map(([caption, image]) => (
              <button
                className="journey-tile"
                key={image}
                onClick={() => setSelectedImage(image)}
                aria-label={`Open image: ${caption}`}
                style={{ backgroundImage: `url(${image})` }}
              >
                <span>{caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-label">
            07 <span>Words from families</span>
          </div>
          <div className="testimonial-layout">
            <div>
              <h2>
                Progress worth
                <br />
                <em>talking about.</em>
              </h2>
              <div className="rating">
                <span>★★★★★</span> <b>4.9 / 5</b>
                <small>from our parent community</small>
              </div>
            </div>
            <div className="quote-card">
              <Quote size={38} />
              <p>
                “The biggest change was not just in my daughter’s marks. She
                started raising her hand, asking questions and believing she
                could solve difficult problems.”
              </p>
              <div className="quote-person">
                <div className="avatar">A</div>
                <span>
                  <b>Mrs. Ananya Sharma</b>
                  <small>Parent of a Class 10 student</small>
                </span>
              </div>
              <div className="quote-dots">
                <span className="active" />
                <span />
                <span />
              </div>
              <a
                className="google-reviews-link"
                href="https://share.google/6PNtQzLEaapsoxnjp"
                target="_blank"
                rel="noreferrer"
              >
                More reviews on Google <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="enquire" className="enquiry-section">
        <div className="container enquiry-grid">
          <div className="enquiry-copy">
            <div className="section-label">
              08 <span>Start a conversation</span>
            </div>
            <h2>
              Let’s find the
              <br />
              <em>right next step.</em>
            </h2>
            <p>
              Tell us a little about your child and we’ll get back to you with a
              clear, no-pressure recommendation.
            </p>
            <div className="enquiry-contact">
              <a href={`tel:${phone}`}>
                <Phone size={17} /> +91 88827 31685
              </a>
              <a
                href={`https://wa.me/${phone}?text=Hello%20Precise%20Learning%2C%20I%20would%20like%20to%20know%20more.`}
              >
                <MessageCircle size={17} /> WhatsApp us
              </a>
            </div>
          </div>
          <form className="enquiry-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">
                  <Check />
                </div>
                <h3>Thank you. We’ve got this.</h3>
                <p>
                  Your enquiry is ready in WhatsApp. Our academic counsellor
                  will call you shortly.
                </p>
                <button
                  type="button"
                  className="text-link dark-link"
                  onClick={() => setSubmitted(false)}
                >
                  Send another enquiry <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <label>
                    Parent / student name
                    <input name="name" placeholder="Your name" />
                  </label>
                  <label>
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                    />
                  </label>
                </div>
                <label>
                  Class looking for
                  <select name="class">
                    <option>Choose a class</option>
                    <option>Classes 6–8</option>
                    <option>Classes 9–10</option>
                    <option>Classes 11–12</option>
                  </select>
                </label>
                <label>
                  Anything you’d like us to know?{" "}
                  <textarea
                    name="message"
                    placeholder="Optional message"
                    rows={3}
                  />
                </label>
                {formError && <p className="form-error">{formError}</p>}
                <button className="button button-dark form-submit">
                  Request a callback <ArrowRight size={16} />
                </button>
                <small>
                  By submitting, you agree to receive a call from our team.
                </small>
              </>
            )}
          </form>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div>
            <Logo />
            <p className="contact-intro">
              Thoughtful teaching for curious minds, right here in Burari.
            </p>
            <a
              className="map-link"
              href={locationUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={17} /> Find us in Burari, Delhi{" "}
              <ArrowRight size={15} />
            </a>
          </div>
          <div className="contact-links">
            <div>
              <small>Talk to us</small>
              <a href={`tel:${phone}`}>+91 88827 31685</a>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div>
              <small>Explore</small>
              <a href="#about">About us</a>
              <a href="#courses">Courses</a>
              <a href="/notes">Study notes</a>
              <a href="/admin">Admin login</a>
            </div>
            <div>
              <small>Follow along</small>
              <a
                href="https://www.instagram.com/preciselearning2014?stkn=eTc1aTczMjE1NjFq"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://m.youtube.com/%40preciselearning-2014?fbclid=PAb21jcAUeitxwZG9mAmV4dG4DYWVtAjExAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp1ioI1kykeh1Y21juPdVOeg8-_ksSqdRvEw259ELHd7PVQLJDd8fC36G-kaY_aem_yQPFbXt8vJ-rplCaiv03Xg"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>
          <div className="contact-map-wrap">
            <div className="contact-map-heading">
              <small>Visit us</small>
              <MapPin size={16} />
            </div>
            <a
              className="contact-map-link"
              href={locationUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Precise Learning Burari in Google Maps"
            >
              <iframe
                className="contact-map"
                title="Precise Learning Burari location map"
                src="https://www.google.com/maps?q=Precise%20Learning%20Burari%2C%20Delhi&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                tabIndex={-1}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        <footer className="container footer">
          <span>© 2026 Precise Learning Burari. All rights reserved.</span>
          <span>Made with care for better learning.</span>
        </footer>
      </section>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${phone}?text=Hello%20Precise%20Learning%2C%20I%20would%20like%20to%20enquire%20about%20classes.`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Precise Learning on WhatsApp"
      >
        <MessageCircle size={23} />
      </a>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery"
            >
              <X />
            </button>
            <div
              className="lightbox-image"
              style={{ backgroundImage: `url(${selectedImage})` }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
function CourseCard({
  number,
  title,
  classes,
  text,
  tone,
}: {
  number: string;
  title: string;
  classes: string;
  text: string;
  tone: string;
}) {
  return (
    <article className={`course-card ${tone}`}>
      <span className="card-number">{number}</span>
      <span className="card-icon">
        <GraduationCap size={23} />
      </span>
      <p>{classes}</p>
      <h3>{title}</h3>
      <div className="card-rule" />
      <span>{text}</span>
      <a href="#enquire" aria-label={`Enquire about ${title}`}>
        <ArrowRight size={18} />
      </a>
    </article>
  );
}
function Step({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="step">
      <div className="step-top">
        <span>{number}</span>
        <div>{icon}</div>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
