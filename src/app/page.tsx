"use client"

import type React from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import {
  ArrowRight,
  Award,
  Building,
  MapPin,
  Phone,
  Mail,
  Star,
  Target,
  Eye,
  Heart,
  Users,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

// Componente para blob orgânico animado
function OrganicBlob({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1.1, 1],
        rotate: [0, 120, 240, 360],
        borderRadius: ["50%", "60% 40%", "40% 60%", "50%"],
      }}
      transition={{
        duration: 25 + delay * 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  )
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true
          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function RefinedConstrutoraLanding() {
  const [selectedFilter, setSelectedFilter] = useState("todos")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Obrigado pelo contato! Retornaremos em até 24h úteis. ✨")
  }

  const portfolioItems = [
    {
      id: 1,
      name: "Residencial Jardim das Flores",
      location: "São Paulo, SP",
      type: "residencial",
      category: "Residencial",
      description: "Condomínio residencial com 120 unidades",
      image: "https://plus.unsplash.com/premium_photo-1676467492300-344de29e3161?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Centro Empresarial Alpha",
      location: "Rio de Janeiro, RJ",
      type: "comercial",
      category: "Comercial",
      description: "Complexo comercial de alto padrão",
      image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Hospital Regional Norte",
      location: "Brasília, DF",
      type: "publico",
      category: "Público",
      description: "Unidade hospitalar com 200 leitos",
      image: "https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Shopping Boulevard",
      location: "Belo Horizonte, MG",
      type: "comercial",
      category: "Comercial",
      description: "Centro comercial com 150 lojas",
      image: "https://images.unsplash.com/photo-1621406384199-f9ee619e3810?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Condomínio Sunset",
      location: "Florianópolis, SC",
      type: "residencial",
      category: "Residencial",
      description: "Residencial de luxo frente ao mar",
      image: "https://images.unsplash.com/photo-1638973140785-3b918e290682?q=80&w=778&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Escola Municipal Central",
      location: "Curitiba, PR",
      type: "publico",
      category: "Público",
      description: "Unidade educacional para 800 alunos",
      image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const filteredPortfolio =
    selectedFilter === "todos" ? portfolioItems : portfolioItems.filter((item) => item.type === selectedFilter)

  const teamMembers = [
    {
      name: "Carlos Eduardo Silva",
      position: "Diretor Geral",
      experience: "25 anos de experiência",
      image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Ana Paula Santos",
      position: "Engenheira Civil",
      experience: "15 anos de experiência",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Roberto Oliveira",
      position: "Gestor de Obras",
      experience: "20 anos de experiência",
      image: "https://images.unsplash.com/photo-1647088240248-0e3490b180de?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Marina Costa",
      position: "Atendimento ao Cliente",
      experience: "10 anos de experiência",
      image: "https://images.unsplash.com/photo-1507206130118-b5907f817163?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  const testimonials = [
    {
      name: "João Pereira",
      position: "Empresário",
      rating: 5,
      text: "Excelente qualidade e pontualidade na entrega. Superaram nossas expectativas em todos os aspectos do projeto.",
    },
    {
      name: "Maria Fernanda",
      position: "Arquiteta",
      rating: 5,
      text: "Profissionalismo exemplar e atenção aos detalhes. Uma parceria que resultou em um projeto excepcional.",
    },
    {
      name: "Ricardo Almeida",
      position: "Investidor",
      rating: 5,
      text: "Transparência total durante todo o processo. Cumpriram rigorosamente prazos e orçamento estabelecidos.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/30 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <OrganicBlob
          className="top-[-15%] right-[-10%] w-96 h-96 bg-gradient-to-br from-purple-400/15 to-blue-400/15"
          delay={0}
        />
        <OrganicBlob
          className="bottom-[-20%] left-[-15%] w-[500px] h-[500px] bg-gradient-to-tr from-emerald-400/10 to-teal-400/10"
          delay={3}
        />
        <OrganicBlob className="top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-coral-400/8 to-pink-400/8" delay={6} />
      </div>

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Sobre", "Equipe", "Portfólio", "Depoimentos", "Contato"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 hover:text-purple-600 transition-colors font-light"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-black/60 transition-colors duration-500" />

          <Image
            src="https://plus.unsplash.com/premium_photo-1681691912442-68c4179c530c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Obra em construção"
            className="w-full h-full object-cover"
            fill
          />
        </motion.div>

        <motion.div
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-30, 30]),
            y: useTransform(springY, [-0.5, 0.5], [-30, 30]),
          }}
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm"
        />
        <motion.div
          style={{
            x: useTransform(springX, [-0.5, 0.5], [20, -20]),
            y: useTransform(springY, [-0.5, 0.5], [20, -20]),
          }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full backdrop-blur-sm"
        />

        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Construindo com{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              excelência.
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl text-gray-200">Entregando confiança.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="relative mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Há mais de 25 anos, transformamos projetos em marcos duradouros.
              <br />
              <span className="text-purple-300 italic">Cada obra conta uma história de dedicação.</span>
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-8"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "backOut" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-6 px-12 rounded-full text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 group border-0"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="mr-3">Conheça nosso trabalho</span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="sobre" className="py-32 bg-gradient-to-b from-transparent to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl md:text-6xl font-light text-slate-700 mb-12"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Sobre
              </h2>

              <div className="space-y-10 text-slate-600 text-lg leading-relaxed font-light">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
                >
                  <h3 className="font-medium text-slate-700 mb-4 flex items-center text-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    Nossa Missão
                  </h3>
                  <p>
                    Construir com excelência, inovação e sustentabilidade, superando expectativas e criando valor
                    duradouro para nossos clientes e comunidades.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
                >
                  <h3 className="font-medium text-slate-700 mb-4 flex items-center text-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    Nossa Visão
                  </h3>
                  <p>
                    Ser reconhecida como a construtora de referência no mercado, pela qualidade, pontualidade e inovação
                    em nossos projetos arquitetônicos.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
                >
                  <h3 className="font-medium text-slate-700 mb-4 flex items-center text-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    Nossos Valores
                  </h3>
                  <p>
                    Integridade, qualidade, inovação, sustentabilidade e compromisso absoluto com prazos e orçamentos
                    estabelecidos.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="relative w-[600px] h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sede da empresa"
                  className="w-full rounded-3xl shadow-2xl"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-3xl" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: 25, suffix: "+", label: "Anos de Experiência", color: "from-purple-400 to-pink-400" },
                  { number: 150, suffix: "+", label: "Obras Entregues", color: "from-blue-400 to-indigo-400" },
                  { number: 98, suffix: "%", label: "Satisfação", color: "from-emerald-400 to-teal-400" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg text-center border border-white/20 hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                    >
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-slate-600 font-light">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="equipe" className="py-32 bg-gradient-to-b from-purple-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-6xl font-light text-slate-700 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Nossa Equipe de Liderança
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
              Profissionais experientes e comprometidos com a excelência em cada projeto que desenvolvemos
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-8"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ y: -15, rotateY: 5 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/20">
                  <div className="aspect-square overflow-hidden relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-slate-700 mb-2">{member.name}</h3>
                    <p className="text-purple-500 font-medium mb-3">{member.position}</p>
                    <p className="text-slate-500 text-sm font-light">{member.experience}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfólio de Obras */}
      <section id="portfolio" className="py-32 bg-gradient-to-b from-transparent to-blue-50/20">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-6xl font-light text-slate-700 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Nosso Portfólio
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Conheça alguns dos nossos principais projetos realizados com excelência e dedicação
            </p>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: "todos", label: "Todos", icon: Building },
                { key: "residencial", label: "Residencial", icon: Heart },
                { key: "comercial", label: "Comercial", icon: Briefcase },
                { key: "publico", label: "Público", icon: Users },
              ].map((filter) => (
                <motion.button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 ${selectedFilter === filter.key
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90 border border-white/20"
                    }`}
                >
                  <filter.icon className="w-4 h-4 mr-2" />
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/20">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-medium text-slate-700 mb-3">{item.name}</h3>
                    <p className="text-slate-500 mb-3 flex items-center font-light">
                      <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                      {item.location}
                    </p>
                    <p className="text-slate-600 font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="py-32 bg-gradient-to-b from-blue-50/20 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-6xl font-light text-slate-700 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light">
              Depoimentos de quem confia em nosso trabalho e dedicação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateX: 5 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 relative overflow-hidden min-h-[348px]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400" />

                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-slate-600 mb-8 italic font-light text-lg leading-relaxed">"{testimonial.text}"</p>

                  <div className="border-t border-slate-200/50 pt-6">
                    <p className="font-medium text-slate-700 text-lg">{testimonial.name}</p>
                    <p className="text-slate-500 text-sm font-light">{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificações e Parceiros */}
      <section className="py-32 bg-gradient-to-b from-purple-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-6xl font-light text-slate-700 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Certificações e Parceiros
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light">
              Reconhecimento e parcerias que garantem qualidade e confiabilidade em todos os nossos projetos
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {["PBQP-H", "ISO 9001", "CREA", "SINDUSCON", "CBIC", "ABNT"].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5, rotateY: 5 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center border border-white/20 aspect-square">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-medium text-slate-700 text-center text-sm">{cert}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="py-32 bg-gradient-to-br from-slate-900 via-purple-900/80 to-blue-900/80 relative overflow-hidden"
      >
        {/* Elementos orgânicos de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <OrganicBlob
            className="top-[-20%] right-[-15%] w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10"
            delay={0}
          />
          <OrganicBlob
            className="bottom-[-25%] left-[-20%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/8 to-indigo-400/8"
            delay={3}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-6xl font-light text-white mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Solicite um Orçamento
            </h2>
            <p className="text-xl text-gray-300 mb-4 font-light">Entre em contato conosco para seu próximo projeto</p>
            <p className="text-purple-300 font-medium">Retornamos em até 24h úteis</p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-8"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-light text-gray-300 mb-3">Nome completo</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 bg-white/10 border-white/20 text-white placeholder:text-white xrounded-2xl text-lg focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm transition-all duration-300"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-300 mb-3">E-mail</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-14 bg-white/10 border-white/20 text-white placeholder:text-white xrounded-2xl text-lg focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm transition-all duration-300"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-gray-300 mb-3">Telefone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-14 bg-white/10 border-white/20 text-white placeholder:text-white xrounded-2xl text-lg focus:border-purple-400 focus:ring-purple-400/20 backdrop-blur-sm transition-all duration-300"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-300 mb-3">Mensagem</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full min-h-[140px] bg-white/10 border-white/20 text-white placeholder:text-white xrounded-2xl text-lg focus:border-purple-400 focus:ring-purple-400/20 resize-none backdrop-blur-sm transition-all duration-300"
                  placeholder="Descreva seu projeto ou dúvida..."
                  required
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-500 group border-0"
                >
                  <span className="mr-3">Solicitar Contato</span>
                  <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="py-24 bg-gradient-to-t from-slate-100/50 to-transparent relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-slate-500 mb-6 font-light leading-relaxed">
                Construindo com excelência há mais de 25 anos.
              </p>
              <p className="text-sm text-slate-400">CNPJ: 12.345.678/0001-90</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-slate-700 mb-6">Contato</h3>
              <div className="space-y-4 text-slate-500 font-light">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-purple-400" />
                  (11) 3456-7890
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-purple-400" />
                  contato@construtorapro.com.br
                </p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-purple-400" />
                  São Paulo, SP
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-medium text-slate-700 mb-6">Serviços</h3>
              <ul className="space-y-3 text-slate-500 font-light">
                <li>Construção Residencial</li>
                <li>Construção Comercial</li>
                <li>Obras Públicas</li>
                <li>Reformas e Ampliações</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-slate-200/50 mt-16 pt-8 text-center"
          >
            <p className="text-slate-400 font-light">&copy; 2025 pedro.henrike2812@gmail.com. Todos os direitos reservados.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
