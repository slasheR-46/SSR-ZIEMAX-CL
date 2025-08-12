"use client";

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink } from "flowbite-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  const steps = [
    {
      title: "1. Registra tu colegio",
      desc: "Agrega cursos, profesores y estudiantes en segundos.",
      img: "/img/register.svg",
    },
    {
      title: "2. Crea pruebas online",
      desc: "Diseña evaluaciones personalizadas y corrígelas automáticamente.",
      img: "/img/exam.svg",
    },
    {
      title: "3. Analiza resultados",
      desc: "Obtén reportes visuales para mejorar el aprendizaje.",
      img: "/img/report.svg",
    },
  ];

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Navbar */}
      {/* <Navbar fluid rounded>
        <NavbarBrand href='#'>
          <span className='self-center whitespace-nowrap text-2xl font-bold text-blue-600'>EduSys</span>
        </NavbarBrand>
        <NavbarCollapse>
          <NavbarLink href='#features'>Características</NavbarLink>
          <NavbarLink href='#benefits'>Beneficios</NavbarLink>
          <NavbarLink href='#contact'>Contacto</NavbarLink>
        </NavbarCollapse>
      </Navbar> */}

      {/* Hero */}
      <section className='text-center py-20 px-5 bg-gradient-to-r from-purple-600 to-orange-600 text-white'>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-4xl font-extrabold mb-4'>
          Gestión Educativa Inteligente
        </motion.h1>
        <p className='max-w-xl mx-auto mb-6'>
          Simplifica la administración escolar, conecta profesores, estudiantes y apoderados en un solo lugar.
        </p>
        <Button size='lg' color='light' className='mx-auto block'>
          Solicitar Demostración
        </Button>
      </section>

      {/* Características */}
      <section id='features' className='py-16 px-5 relative overflow-hidden'>
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          viewport={{ once: true }}
          className='text-3xl text-purple-500 font-bold text-center mb-12 drop-shadow-lg'>
          Características del Sistema
        </motion.h2>
        <div className='absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-30 blur-2xl'></div>
        <div className='absolute -bottom-10 -right-10 w-32 h-32 bg-orange-300 rounded-full opacity-30 blur-2xl'></div>
        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10'>
          {[
            {
              title: "Administración de usuarios",
              desc: "Gestiona roles como administrador, profesor, estudiante y apoderado.",
            },
            { title: "Pruebas Online", desc: "Crea y corrige exámenes desde cualquier dispositivo." },
            { title: "Reportes y Estadísticas", desc: "Obtén métricas de desempeño en tiempo real." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className='bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.07, y: -10, boxShadow: "0 8px 32px rgba(128,0,128,0.15)" }}
              transition={{ duration: 0.1, type: "spring" }}
              viewport={{ once: true }}
              data-aos='fade-up'
              data-aos-delay={i * 100}>
              <h3 className='text-xl font-semibold mb-3 text-purple-500'>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section id='benefits' className='py-16 bg-gray-100 px-5'>
        <h2 className='text-3xl text-purple-500 font-bold text-center mb-12' data-aos='fade-up'>
          Beneficios para tu Institución
        </h2>
        <ul className='max-w-4xl mx-auto space-y-4'>
          {[
            "Ahorro de tiempo en tareas administrativas.",
            "Mejora en la comunicación entre la comunidad educativa.",
            "Mayor control y trazabilidad de la información.",
          ].map((benefit, i) => (
            <li key={i} className='flex items-start gap-3' data-aos='fade-right' data-aos-delay={i * 150}>
              ✅ <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section id='contact' className='py-20 text-center bg-purple-600 text-white'>
        <h2 className='text-3xl font-bold mb-6' data-aos='zoom-in'>
          ¿Listo para transformar la educación?
        </h2>
        <Button size='lg' color='light' className='mx-auto block'>
          Contáctanos
        </Button>
      </section>
    </div>
  );
}
