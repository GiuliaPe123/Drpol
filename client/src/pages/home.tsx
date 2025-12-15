import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Award, 
  BookOpen, 
  Brain,
  MessageCircle,
  GraduationCap,
  Menu,
  X,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import assets
import doctorImage from "@assets/doctor_profile.png";

// --- Schemas ---
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(10, "Please provide more details"),
});

// --- Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="bg-primary p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-primary leading-none">Dr. Polena</h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Psychiatry</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Experience", "Education", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <Button onClick={() => scrollToSection("contact")}>Book Consultation</Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg p-4 flex flex-col gap-4"
        >
          {["Experience", "Education", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-left font-medium py-2 border-b border-gray-100 last:border-0"
            >
              {item}
            </button>
          ))}
          <Button className="w-full" onClick={() => scrollToSection("contact")}>Book Consultation</Button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6 mb-12"
          >
            <div className="relative shrink-0">
              <div className="absolute -inset-2 bg-primary/5 rounded-full blur-xl -z-10"></div>
              <img 
                src={doctorImage} 
                alt="Dr. Luis Polena" 
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-xl border-4 border-white"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-3 leading-tight font-serif">
                Dr. Luis Polena
              </h1>
              <div className="text-primary">
                <h2 className="text-xl md:text-2xl font-medium mb-2">Medical Doctor</h2>
                <h3 className="text-3xl md:text-4xl font-light">Psychiatrist & Psychotherapist</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full text-center"
          >
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              A Consultant Psychiatrist committed to rigorous clinical practice and a therapeutic approach tailored to each individual’s needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10 text-lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Schedule Appointment
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg bg-white hover:bg-gray-50" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
                My Experience
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Private Practitioner",
      place: "Genoa",
      years: "Present",
      desc: "Based in Genoa, I run a private psychiatric practice where I offer comprehensive diagnostic evaluations, evidence-based treatment plans, and longitudinal care. Services are provided both in person and through secure online consultations, ensuring continuity and accessibility for a diverse patient population."
    },
    {
      role: "Consultant Psychiatrist",
      place: "Novi Ligure Hospital & Acqui Terme CMHC",
      years: "Present",
      desc: "My clinical work takes place at the Psychiatric Diagnosis and Care Service (SPDC) of Novi Ligure Hospital and at the Community Mental Health Center (CMHC) in Acqui Terme, where I provide specialist psychiatric care, acute management, and multidisciplinary collaboration."
    },
    {
      role: "Psychiatry Resident",
      place: "Ospedale Policlinico San Martino, Genoa",
      years: "2021 - 2025",
      desc: "During my residency training (2021–2025) at Ospedale Policlinico San Martino in Genoa, I worked across the SPDC, the Psychiatric Clinic, the Emergency Department, the Marassi Correctional Facility, the Community Mental Health Center (CSM), and the Addiction Service (SerD). My work involved patient assessment, diagnosis, and treatment under supervision, as well as participation in research and educational activities. I also contributed to multidisciplinary care and provided guidance to families regarding treatment options."
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Award className="h-6 w-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">Professional Experience</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-12 py-2">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-sm group-hover:bg-primary transition-colors"></div>
                
                {/* Content */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                   <h3 className="font-serif text-xl font-bold text-gray-900">{exp.role}</h3>
                   <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-secondary text-primary-foreground w-fit">
                     {exp.years}
                   </span>
                </div>
                
                <div className="text-primary font-medium mb-4 flex items-center gap-2 text-sm">
                   <MapPin className="w-4 h-4" /> {exp.place}
                </div>
                
                <p className="text-gray-600 leading-relaxed text-base">
                   {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const education = [
    {
      degree: "Psychiatry Residency",
      school: "Università degli Studi di Genova",
      year: "Completed on 02/06/2025",
      icon: Brain
    },
    {
      degree: "Master’s Degree in Medicine and Surgery",
      school: "Università degli Studi di Chieti (Italy)",
      year: "2014–2020 (Graduated on 03/26/2020)",
      icon: GraduationCap
    },
    {
      degree: "Bachelor’s Degree in Psychology",
      school: "Università degli Studi di Torino (Italy)",
      year: "2008–2012",
      note: "Completed all required coursework and examinations.",
      icon: BookOpen
    },
    {
      degree: "CAARMS Practitioner Training",
      school: "Maudsley Learning",
      year: "20/05/2024 – 21/05/2024",
      note: "Comprehensive Assessment of At-Risk Mental States for Psychosis",
      icon: Award
    }
  ];

  return (
    <section id="education" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 font-serif">Education & Training</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              My practice is grounded in rigorous psychiatric training and ongoing professional development. I prioritise evidence-based assessment and treatment, integrating selected therapeutic approaches while maintaining a solid foundation in established clinical principles.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl font-bold mb-4 text-primary">Core Competencies</h3>
              <ul className="space-y-3">
                {[
                  "Psychopharmacology",
                  "Acute Care Management",
                  "Multidisciplinary Collaboration"
                ].map((cert, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <div key={i} className="flex flex-col p-6 bg-white rounded-xl border border-transparent hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 group">
                   <div className="flex justify-between items-start mb-4">
                     <div className="bg-secondary/30 p-3 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <edu.icon className="h-6 w-6" />
                     </div>
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-md">{edu.year.includes("Completed") ? "2025" : edu.year.split('–')[0]}</span>
                   </div>
                   
                   <h4 className="font-serif text-lg font-bold text-gray-900 mb-2 leading-snug min-h-[3.5rem] flex items-end pb-1 border-b border-gray-50">{edu.degree}</h4>
                   <p className="text-primary font-medium text-sm mb-1">{edu.school}</p>
                   <p className="text-gray-400 text-xs mb-2">{edu.year}</p>
                   
                   {/* @ts-ignore */}
                   {edu.note && <p className="text-gray-500 text-xs mt-auto pt-3 italic border-t border-gray-50">{edu.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { ContactSection } from "@/components/contact_section";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
            <Brain className="h-8 w-8 text-primary" />
            <span className="font-serif text-2xl font-bold">Dr. Polena</span>
        </div>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
          Expert psychiatrist tailored to your individual needs.
        </p>
        <div className="flex justify-center gap-8 mb-8 text-sm text-gray-400">
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#education" className="hover:text-white transition-colors">Education</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <a href="https://www.linkedin.com/in/luis-polena-a74b30342/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <div className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Dr. Luis Polena. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Education />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
