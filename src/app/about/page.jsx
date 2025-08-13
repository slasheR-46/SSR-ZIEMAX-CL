"use client";
import React, { useEffect, useState } from "react";
import GuiBackdrop from "../components/about/GuiBackdrop";
import { useTypewriter } from "../components/about/useTypewriter";
import SectionNav from "../components/about/SectionNav";
import { HeroSection } from "../components/about/HeroSection";
import { OfferSection } from "../components/about/OfferSection";
import { TimelineSection } from "../components/about/TimelineSection";
import { CtaSection } from "../components/about/CtaSection";
import Lenis from "lenis";

const timelineItems = [
  { year: "2023", title: "Inicio del proyecto", text: "Validamos la necesidad de una plataforma educativa integral." },
  { year: "2024", title: "Módulos clave", text: "Lanzamos gestión de usuarios, pruebas online y reportes básicos." },
  { year: "2025", title: "Analítica avanzada", text: "Integramos dashboards de desempeño y motor de insights." },
];

export default function AboutPage() {
  const typed = useTypewriter(["Plataforma Educativa Inteligente", "Gestión Centralizada", "Evaluaciones Dinámicas"]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const sectionIds = ["hero", "ofrecemos", "timeline", "cta"];
  const [activeAnchor, setActiveAnchor] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveAnchor(e.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className='relative min-h-screen bg-black text-white overflow-x-hidden'>
      <GuiBackdrop />
      <SectionNav sectionIds={sectionIds} active={activeAnchor} />
      <HeroSection typed={typed} />
      <OfferSection />
      <TimelineSection items={timelineItems} />
      <CtaSection />
    </main>
  );
}
