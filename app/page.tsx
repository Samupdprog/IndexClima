"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Snowflake,
  ThermometerSun,
  Zap,
  Fan,
  Building2,
  Factory,
  Clock,
  CheckCircle,
  Wrench,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Componente BrandSlider con animaciones
function BrandSlider({ images }: { images: string[] }) {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    const slider = sliderRef.current
    if (slider) {
      let scrollAmount = 0
      interval = setInterval(() => {
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: "smooth" })
          scrollAmount = 0
        } else {
          scrollAmount += 200
          slider.scrollTo({ left: scrollAmount, behavior: "smooth" })
        }
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      ref={sliderRef}
      className="flex overflow-x-auto no-scrollbar space-x-8 py-4 transition-all"
      style={{ scrollBehavior: "smooth" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          className="flex-shrink-0 flex items-center justify-center h-24 w-40"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Marca ${idx + 1}`}
            width={160}
            height={80}
            className="object-contain h-20 w-auto grayscale hover:grayscale-0 transition-all duration-300"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

// Componente Hamburger animado
const HamburgerMenu = ({
  isOpen,
  toggleMenu,
  effectiveNav,
}: { isOpen: boolean; toggleMenu: () => void; effectiveNav: boolean }) => {
  return (
    <button
      onClick={toggleMenu}
      className="relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none md:hidden"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-orange-500 ring-0 hover:ring-2 ring-orange-300 ring-opacity-30 hover:ring-offset-1">
        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300">
          <div
            className={`bg-white h-[2px] w-7 transform transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
          />
          <div
            className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <div
            className={`bg-white h-[2px] w-7 transform transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          />
        </div>
      </div>
    </button>
  )
}

// Componente contador animado
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, hasAnimated])

  return (
    <motion.div
      className="text-3xl font-bold"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasAnimated(true)}
    >
      {count}
    </motion.div>
  )
}

export default function IndexClimaPage() {
  const [navBlack, setNavBlack] = useState(false)
  const [servicesActive, setServicesActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const brandImages = [
    "/marcas/158453039812-daikin-01.png",
    "/marcas/1658375735329162473.png",
    "/marcas/CONCEPT-FUJITSU-GENERAL-Authorised-Service-Provider.jpg",
    "/marcas/LG-Logo.png",
    "/marcas/mitsubishi-electric-valencia1.png",
    "/marcas/Recambios-Aire-Acondicionado-General-Fujitsu-Precios-y-venta.jpg",
    "/marcas/samsung-logo-wordmark-rgb.png",
  ]

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Cerrar menú al hacer clic en un enlace
  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Observador para el Hero Section (con IntersectionObserver)
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setNavBlack(!entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-30px 0px 0px 0px",
      },
    )
    if (heroRef.current) {
      observer.observe(heroRef.current)
    }
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current)
    }
  }, [])

  // Listener de scroll para la Services Section
  useEffect(() => {
    function handleScroll() {
      if (servicesRef.current && headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect()
        const serviceRect = servicesRef.current.getBoundingClientRect()

        const isActive = headerRect.bottom > serviceRect.top && headerRect.bottom < serviceRect.bottom
        setServicesActive(isActive)
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Estado efectivo: si la Services Section está activa, invertimos el valor de navBlack
  const effectiveNav = servicesActive ? !navBlack : navBlack

  // Variantes para animaciones del menú
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        ref={headerRef}
        className="bg-transparent backdrop-blur-xl border-white border-b-2 shadow-lg fixed top-0 z-50 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#inicio">
              <Image
                src={effectiveNav ? "/logohorizontalcolor.png" : "/logohorizontalblanco.png"}
                alt="logo de la empresa"
                width={200}
                height={200}
              />
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <nav
            className={`hidden md:flex items-center space-x-8 text-sm font-bold transition-colors duration-300 ${
              effectiveNav ? "text-black" : "text-white"
            }`}
          >
            {[
              { href: "#inicio", text: "Inicio" },
              { href: "#empresa", text: "Empresa" },
              { href: "#servicios", text: "Servicios" },
              { href: "#contacto", text: "Contacto" },
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="relative py-2 hover:text-orange-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.text}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} effectiveNav={effectiveNav} />
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav
                className="w-full px-4 py-8"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <motion.div className="flex flex-col space-y-6 items-center text-white text-2xl font-bold">
                  {[
                    { href: "#inicio", text: "Inicio" },
                    { href: "#empresa", text: "Empresa" },
                    { href: "#servicios", text: "Servicios" },
                    { href: "#contacto", text: "Contacto" },
                  ].map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      variants={itemVariants}
                      className="relative py-2 px-4 hover:text-orange-500 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.text}
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}

                  <motion.div className="pt-8 flex space-x-6" variants={itemVariants}>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2, color: "#4267B2" }}
                      className="text-white hover:text-orange-500"
                    >
                      <Facebook size={24} />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2, color: "#E1306C" }}
                      className="text-white hover:text-orange-500"
                    >
                      <Instagram size={24} />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2, color: "#1DA1F2" }}
                      className="text-white hover:text-orange-500"
                    >
                      <Twitter size={24} />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative h-[500px] md:h-[600px] bg-center bg-size-mobile"
        style={{
          backgroundImage: "url(/industrial.jpeg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center md:gap-32">
          <motion.div
            className="text-white text-center md:text-left space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.p
              className="text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Proporcionamos los mejores instalaciones para su futuro
            </motion.p>
            <motion.h2
              className="text-3xl md:text-6xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Superando los límites
              <br />
              De lo posible.
            </motion.h2>
          </motion.div>
          <motion.div
            className="mt-4 md:mt-0 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="/index2fondo.png"
              alt="Trabajadores de construcción"
              width={400}
              height={300}
              className="rounded-lg max-w-xs"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="empresa" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/aires.jpeg"
                alt="Trabajadores de construcción"
                width={600}
                height={400}
                className="rounded-lg"
              />
              <motion.div
                className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <ThermometerSun className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <AnimatedCounter end={27} />
                  <div className="text-sm">Años de experiencia</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Creando ambientes perfectamente climatizados</h3>
              <p className="text-gray-600 mb-6">
                En Index Clima, somos apasionados por crear ambientes perfectamente climatizados que te brinden
                comodidad y bienestar en cualquier época del año. Con una profunda dedicación a la excelencia y años de
                experiencia en el campo, nos hemos convertido en líderes en el sector de instalaciones de aire
                acondicionado.
              </p>
              <p className="text-gray-600 mb-8">
                Con un legado de 27 años de experiencia, hemos perfeccionado nuestros servicios de climatización para
                brindarte soluciones completas. Desde la instalación personalizada de sistemas de aire acondicionado que
                se adaptan a cada rincón de tu espacio, hasta la implementación de instalaciones eléctricas de
                vanguardia.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Conocer más</Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        ref={servicesRef}
        className="py-16 bg-center bg-size-mobile relative"
        style={{
          backgroundImage: "url(cuadro_2.jpeg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange-500 text-sm mb-2">Nuestros servicios especializados</p>
            <h3 className="text-4xl font-bold mb-6">
              Soluciones completas
              <br />
              de climatización para
              <br />
              su comodidad.
            </h3>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-white hover:border-[#0e5898] text-black hover:bg-[#0e5898] hover:text-white"
              >
                Ver todos los servicios
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Snowflake className="w-12 h-12 mx-auto mb-4" />,
                title: "Climatización de Viviendas",
                description:
                  "Instalaciones de aire acondicionado, climatización, calefacción y ventilación, estudiando cada proyecto desde el diseño hasta su ejecución.",
              },
              {
                icon: <Fan className="w-12 h-12 mx-auto mb-4" />,
                title: "Extracción de Humos",
                description:
                  "Soluciones para instalaciones de extracción de humos, renovación de aire y conducción de aire, adaptándonos a sus necesidades.",
              },
              {
                icon: <Zap className="w-12 h-12 mx-auto mb-4" />,
                title: "Instalaciones Eléctricas",
                description:
                  "Proyectos eléctricos completos con sistemas de eficiencia energética para la reducción de costes y gasto energético.",
              },
              {
                icon: <Building2 className="w-12 h-12 mx-auto mb-4" />,
                title: "Locales Comerciales",
                description:
                  "Instalaciones adaptadas a las necesidades concretas de cada local, buscando siempre la máxima eficiencia energética y económica.",
              },
              {
                icon: <Factory className="w-12 h-12 mx-auto mb-4" />,
                title: "Instalaciones Industriales",
                description:
                  "Soluciones de climatización industrial y frío industrial para todo tipo de instalaciones y necesidades específicas.",
              },
              {
                icon: <Wrench className="w-12 h-12 mx-auto mb-4" />,
                title: "Mantenimiento",
                description:
                  "Servicios de mantenimiento preventivo y correctivo para garantizar el óptimo funcionamiento de sus sistemas.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="text-white text-center p-6 rounded-lg hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              >
                {service.icon}
                <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                <p className="text-sm text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 pb-2 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange-500 text-sm mb-2">¿Por qué elegirnos?</p>
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              En INDEXCLIMA SL, nos enorgullece ser
              <br />
              tu socio confiable en climatización
            </h3>
            <p className="max-w-3xl mx-auto text-gray-600">
              Nuestro compromiso es proporcionar comodidad y bienestar a nuestros clientes. Ya sea que necesites un
              nuevo sistema de aire acondicionado, mantenimiento preventivo o reparaciones rápidas y eficientes, estamos
              aquí para cubrir todas tus necesidades.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />,
                title: "Experiencia y profesionalidad",
                description:
                  "Con 25 años en el sector, nuestro equipo de profesionales garantiza instalaciones de la más alta calidad y eficiencia.",
              },
              {
                icon: <ThermometerSun className="w-12 h-12 text-orange-500 mb-4" />,
                title: "Soluciones personalizadas",
                description:
                  "Estudiamos cada proyecto de forma individual para ofrecer la solución que mejor se adapte a sus necesidades y presupuesto.",
              },
              {
                icon: <Clock className="w-12 h-12 text-orange-500 mb-4" />,
                title: "Servicio rápido y eficiente",
                description:
                  "Respondemos con rapidez a sus necesidades, ofreciendo un servicio puntual y eficiente en todas nuestras intervenciones.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                {feature.icon}
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Slider Section */}
      <section className="pb-16 pt-1 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Marcas con las que trabajamos
          </motion.h3>
          <BrandSlider images={brandImages} />
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Formulario de Contacto</h3>
              <p className="text-gray-600 mb-8">
                Lo que nos distingue es nuestra pasión por la excelencia y la satisfacción del cliente. Trabajamos con
                las principales marcas y tecnologías de climatización para garantizar que tu espacio esté siempre a la
                temperatura ideal.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Nombre" className="border-gray-300" />
                  <Input placeholder="Apellido" className="border-gray-300" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Email" type="email" className="border-gray-300" />
                  <Input placeholder="Teléfono" className="border-gray-300" />
                </div>
                <Textarea placeholder="Notas adicionales" className="border-gray-300 min-h-[120px]" />

                <div className="flex items-center justify-between">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Enviar</Button>
                  </motion.div>
                  <div className="ml-5 mb:ml-0 flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Acepto los términos y condiciones
                    </label>
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div
              className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold">Correo electrónico</p>
                    <p className="text-gray-300">info@indexclima.com</p>
                    <p className="text-gray-300">indexclima@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold">Teléfonos</p>
                    <p className="text-gray-300">619 803 771</p>
                    <p className="text-gray-300">822 615 069</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-gray-300">Lunes - Viernes: 8:00 a 16:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-gray-300">Canarias, España</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: "Sobre IndexClima",
                content: (
                  <p className="text-gray-400 mb-6">
                    En INDEXCLIMA SL, nos especializamos en ofrecer soluciones de aire acondicionado para viviendas,
                    oficinas y locales que marcan la diferencia. Desde nuestra fundación, hemos crecido gracias a la
                    confianza de nuestros clientes.
                  </p>
                ),
              },
              {
                title: "Servicios",
                content: (
                  <ul className="space-y-3 text-gray-400">
                    <li>Climatización de Viviendas</li>
                    <li>Extracción de Humos</li>
                    <li>Instalaciones Eléctricas</li>
                    <li>Locales Comerciales</li>
                    <li>Instalaciones Industriales</li>
                    <li>Mantenimiento</li>
                  </ul>
                ),
              },
              {
                title: "Enlaces rápidos",
                content: (
                  <ul className="space-y-3 text-gray-400">
                    <li>
                      <a href="#inicio" className="hover:text-orange-500 transition-colors">
                        Inicio
                      </a>
                    </li>
                    <li>
                      <a href="#empresa" className="hover:text-orange-500 transition-colors">
                        Sobre nosotros
                      </a>
                    </li>
                    <li>
                      <a href="#servicios" className="hover:text-orange-500 transition-colors">
                        Servicios
                      </a>
                    </li>
                    <li>
                      <a href="#contacto" className="hover:text-orange-500 transition-colors">
                        Contacto
                      </a>
                    </li>
                  </ul>
                ),
              },
              {
                title: "Contacto",
                content: (
                  <div className="space-y-3 text-gray-400">
                    <p>Email: info@indexclima.com</p>
                    <p>Teléfono: 619 803 771</p>
                    <p>Horario: Lunes - Viernes, 8:00 a 16:00</p>
                  </div>
                ),
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="text-xl font-bold mb-6">{section.title}</h4>
                {section.content}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-gray-800 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p>© 2025 IndexClima. Todos los derechos reservados.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
