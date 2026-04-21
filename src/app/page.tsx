'use client'

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/components/Logo"
import { Mail, Phone, Globe, ChevronDown, X, ExternalLink } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('gov')
  const [imageLoadingStates, setImageLoadingStates] = useState<{[key: string]: boolean}>({})
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleImageLoad = (imageSrc: string) => {
    setImageLoadingStates(prev => ({ ...prev, [imageSrc]: true }))
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-x-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Interactive Cursor Effect */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-75"></div>
      </motion.div>

      {/* Enhanced Aurora Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[-20%] left-[-30%] w-[800px] h-[800px] bg-gradient-radial from-blue-500/8 via-blue-500/3 to-transparent rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[-30%] right-[-40%] w-[1000px] h-[1000px] bg-gradient-radial from-cyan-500/8 via-cyan-500/3 to-transparent rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [-50, 50, -50],
            y: [50, -100, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-500/6 via-purple-500/2 to-transparent rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
        />
      </div>

      {/* Enhanced Navigation */}
      <motion.nav 
        className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 sticky top-0"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Logo size="lg" />
            <motion.div 
              className="h-8 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent hidden sm:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <span className="text-sm text-gray-400 hidden sm:inline font-medium tracking-wide">Creative Agency</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="#contact" className="text-gray-400 hover:text-white transition-colors hidden md:inline-flex items-center space-x-1 hover:scale-105 transition-transform">
              <span>Contact</span>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth/login">
                <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
                  Login
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  Sign Up
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Revolutionary Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: backgroundY }}
        >
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
        </motion.div>

        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="space-y-8"
          >
            {/* Minimalist Title */}
            <motion.div className="relative">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-tight tracking-wide"
                variants={fadeInUp}
              >
                <span className="text-white">
                  ANYA SEGEN
                </span>
              </motion.h1>
              
              {/* Simple Subtitle */}
              <motion.div 
                className="mt-4 mb-8"
                variants={fadeInUp}
              >
                <motion.p 
                  className="text-lg md:text-xl text-gray-400 font-light tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Creative Agency
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Simple Description */}
            <motion.p 
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
              variants={fadeInUp}
            >
              Building brands, stories, and campaigns that resonate since 2014
            </motion.p>

            {/* Minimal Stats */}
            <motion.div 
              className="grid grid-cols-4 gap-6 max-w-3xl mx-auto my-16"
              variants={staggerChildren}
            >
              {[
                { label: "Years", value: "10+" },
                { label: "Projects", value: "200+" },
                { label: "Clients", value: "150+" },
                { label: "Success", value: "98%" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={scaleIn}
                  whileHover={{ y: -2 }}
                >
                  <motion.div 
                    className="text-xl md:text-2xl font-extralight text-white mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-gray-500 font-light tracking-wide uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Minimal Contact Links */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mb-16"
              variants={staggerChildren}
            >
              {[
                { href: "http://www.anyasegen.com", label: "anyasegen.com", external: true },
                { href: "mailto:admin@anyasegen.com", label: "admin@anyasegen.com" },
                { href: "tel:+918383036073", label: "+91 8383036073" },
              ].map((contact) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="text-gray-500 hover:text-white transition-colors duration-300 font-light text-sm"
                  variants={fadeInUp}
                  whileHover={{ y: -1 }}
                >
                  {contact.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Simple Scroll Indicator */}
            <motion.div 
              className="flex flex-col items-center space-y-2"
              variants={fadeInUp}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <motion.section 
        className="relative z-10 py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center relative"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />

            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl font-extralight leading-relaxed text-gray-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Anya Segen is a creative agency building{" "}
              <span className="text-white font-light">
                brands, stories, and campaigns
              </span>{" "}
              that resonate. Since{" "}
              <span className="text-blue-400 font-light">
                2014
              </span>
              , we&apos;ve worked at the intersection of strategy, design, and technology—helping{" "}
              <span className="text-white font-light">
                leaders and brands
              </span>{" "}
              shape their narratives and drive meaningful impact.
            </motion.p>

            {/* Achievement Badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { label: "Trusted by Government", value: "Ministries" },
                { label: "Award-Winning", value: "Campaigns" },
                { label: "Multi-Sector", value: "Expertise" },
              ].map((badge) => (
                <motion.div
                  key={badge.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-blue-400 font-bold text-lg">{badge.value}</div>
                  <div className="text-gray-400 text-sm">{badge.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Expertise Section */}
      <motion.section 
        className="relative z-10 py-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-extralight text-center mb-20 text-gray-300"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-white font-light">Expertise</span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { title: "Branding", subtitle: "& Identity", color: "blue", description: "Crafting memorable logos, comprehensive brand systems, messaging, and packaging that capture your essence." },
              { title: "Digital Marketing", subtitle: "& Amplification", color: "cyan", description: "Executing targeted social media strategies, paid advertising campaigns, and influencer marketing to grow your audience." },
              { title: "Films", subtitle: "& Storytelling", color: "green", description: "Producing compelling motion graphics, short films, and animated explainers that transform complex ideas into elegant narratives." },
              { title: "Public Sector", subtitle: "& Advocacy", color: "purple", description: "Designing high-impact election campaigns, public health messaging (SBCC), and grassroots outreach interventions." },
              { title: "Brand", subtitle: "& Product Launch", color: "orange", description: "Developing end-to-end launch strategies, from initial positioning and identity to e-commerce platforms and market entry." },
              { title: "Corporate", subtitle: "& Editorial Design", color: "pink", description: "Creating premium communication assets like annual reports, coffee table books, and e-books with original illustration and design." },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Card className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:border-${service.color}-500/50 h-full relative overflow-hidden`}>
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  <CardHeader className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                      className={`w-12 h-12 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-2xl mb-4 flex items-center justify-center`}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 bg-white rounded-full"
                      />
                    </motion.div>
                    
                    <CardTitle className="text-white text-lg mb-2 font-light">
                      <span className={`text-${service.color}-400 font-extralight`}>{service.title}</span> {service.subtitle}
                    </CardTitle>
                    <CardDescription className="text-gray-400 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  {/* Hover Effect Particles */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`w-2 h-2 bg-${service.color}-400 rounded-full`} />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <h2 className="text-2xl md:text-3xl font-extralight text-center mb-20 text-gray-300">
          Impact <span className="text-white font-light">Stories</span>
        </h2>
        
        {/* Enhanced Tabs */}
        <div className="flex justify-center gap-2 mb-20 flex-wrap">
          <button
            onClick={() => setActiveTab('gov')}
            className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
              activeTab === 'gov'
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            Government & Policy
          </button>
          <button
            onClick={() => setActiveTab('pol')}
            className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
              activeTab === 'pol'
                ? 'bg-pink-600/20 border-pink-500/50 text-pink-400 shadow-lg shadow-pink-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            Political Campaigns
          </button>
          <button
            onClick={() => setActiveTab('corp')}
            className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
              activeTab === 'corp'
                ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            Corporate & FMCG
          </button>
          <button
            onClick={() => setActiveTab('dev')}
            className={`px-8 py-4 rounded-full font-light transition-all duration-300 backdrop-blur-sm border ${
              activeTab === 'dev'
                ? 'bg-green-600/20 border-green-500/50 text-green-400 shadow-lg shadow-green-500/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            Development & Health
          </button>
        </div>

        {/* Portfolio Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'gov' && (
            <div className="space-y-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                    {!imageLoadingStates['/images/gov-gullak-event.jpg'] && (
                      <div className="w-full h-[300px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl animate-pulse flex items-center justify-center">
                        <div className="text-gray-500">Loading...</div>
                      </div>
                    )}
                    <Image 
                      src="/images/gov-gullak-event.jpg" 
                      alt="Gullak Event - Ministry of Rural Development campaign" 
                      width={600} 
                      height={400}
                      className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
                      onLoad={() => handleImageLoad('/images/gov-gullak-event.jpg')}
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                      Government
                    </span>
                    <h3 className="text-3xl font-bold text-white">Gullak Event</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    For the <span className="text-blue-400 font-semibold">Ministry of Rural Development</span>, Uttarakhand, we developed a <span className="text-blue-400 font-semibold">Shark Tank-style</span> platform for <span className="text-blue-400 font-semibold">rural entrepreneurs</span>, delivering brand identity, campaign collaterals, and success story films.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Brand Identity</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Campaign Strategy</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Video Production</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="lg:order-2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                    <Image 
                      src="/images/gov-rbi-rebrand.jpg" 
                      alt="RBI Rebrand - Rural Business Incubator identity redesign" 
                      width={600} 
                      height={400}
                      className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
                    />
                  </div>
                </div>
                <div className="lg:order-1 space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                      Rebranding
                    </span>
                    <h3 className="text-3xl font-bold text-white">RBI Rebrand</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    We proposed a complete <span className="text-blue-400 font-semibold">identity revamp</span> for the Rural Business Incubator to clearly <span className="text-blue-400 font-semibold">differentiate it</span> from the Reserve Bank of India, covering name strategy to brand architecture.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Identity Design</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Brand Strategy</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Architecture</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                    <Image 
                      src="/images/gov-bihan-chhattisgarh.jpg" 
                      alt="BIHAN Chhattisgarh - SHG product packaging and branding" 
                      width={600} 
                      height={400}
                      className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                      Rural Development
                    </span>
                    <h3 className="text-3xl font-bold text-white">BIHAN, Chhattisgarh</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    We partnered with the <span className="text-blue-400 font-semibold">Dept. of Rural Development</span> to build <span className="text-blue-400 font-semibold">packaging SOPs</span> and branding for 25 SHG products, impacting over <span className="text-blue-400 font-semibold">7,500 households</span> and positioning them on national platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">Packaging Design</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">SOP Development</span>
                    <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">7,500+ Impact</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pol' && (
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <Image 
                    src="/images/pol-bjym.jpg" 
                    alt="BJYM Campaign" 
                    width={600} 
                    height={400}
                    className="rounded-xl shadow-2xl hover:scale-[1.02] transition-all duration-500 w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">BJYM</h3>
                  <p className="text-gray-400 leading-relaxed">
                    As an ongoing partner, we manage social media narratives, <span className="text-pink-400 font-semibold">milestone campaigns</span>, and <span className="text-pink-400 font-semibold">digital amplification</span> for the Bharatiya Janata Yuva Morcha, strengthening <span className="text-pink-400 font-semibold">youth engagement</span> nationwide.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2 relative">
                  <Image 
                    src="/images/pol-ram-rajya.jpg" 
                    alt="Ram Rajya Campaign" 
                    width={600} 
                    height={400}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="lg:order-1 space-y-4">
                  <h3 className="text-2xl font-bold text-white">Ram Rajya Campaign</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We designed a campaign to position a BJYM leader in Ayodhya via a <span className="text-pink-400 font-semibold">Say No to Plastic</span> narrative, developing a complete <span className="text-pink-400 font-semibold">campaign identity</span> and leading all social media execution.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <Image 
                    src="/images/pol-modi-hai-naa.jpg" 
                    alt="Modi Hai Naa Campaign" 
                    width={600} 
                    height={400}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Modi Hai Naa</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We crafted a digital campaign for Neha Joshi (VP BJYM) with the message &quot;If PM Modi is there, everything is possible,&quot; delivering an <span className="text-pink-400 font-semibold">end-to-end campaign</span> from concept to content.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'corp' && (
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  <Image 
                    src="/images/corp-d2c-gogrin.jpg" 
                    alt="Go Grin" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/corp-d2c-pentagonia.jpg" 
                    alt="Pentagonia" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/corp-d2c-phirkcraft.jpg" 
                    alt="Phirk Craft" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/corp-d2c-lisabona.jpg" 
                    alt="Lisabona" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">D2C E-Commerce Brands</h3>
                  <p className="text-gray-400 leading-relaxed">
                    For brands like <span className="text-cyan-400 font-semibold">Go Grin</span>, <span className="text-cyan-400 font-semibold">Pentagonia</span>, Phirk Craft, and <span className="text-cyan-400 font-semibold">Lisabona</span>, we developed complete brand identities, launch strategies, and end-to-end <span className="text-cyan-400 font-semibold">e-commerce platforms</span>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2 relative">
                  <Image 
                    src="/images/corp-philips-foundation.jpg" 
                    alt="Philips Foundation" 
                    width={600} 
                    height={400}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="lg:order-1 space-y-4">
                  <h3 className="text-2xl font-bold text-white">Philips Foundation</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We produced a premium <span className="text-cyan-400 font-semibold">coffee table book</span>, managing the entire process from on-ground photography and interviews to the <span className="text-cyan-400 font-semibold">elegant final design</span> and printing.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  <Image 
                    src="/images/corp-itc-infographic-1.jpg" 
                    alt="ITC Infographic 1" 
                    width={300} 
                    height={300}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/corp-itc-infographic-2.jpg" 
                    alt="ITC Infographic 2" 
                    width={300} 
                    height={300}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/corp-itc-infographic-3.jpg" 
                    alt="ITC Infographic 3" 
                    width={300} 
                    height={300}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/corp-itc-infographic-4.jpg" 
                    alt="ITC Infographic 4" 
                    width={300} 
                    height={300}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">ITC Limited</h3>
                  <p className="text-gray-400 leading-relaxed">
                    For the launch of their new corporate website, we partnered with ITC to design four distinct <span className="text-cyan-400 font-semibold">infographics</span>. Each visual narrative was meticulously crafted to articulate the <span className="text-cyan-400 font-semibold">vast scale</span> of the ITC conglomerate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dev' && (
            <div className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  <Image 
                    src="/images/dev-pfi-sbcc.jpg" 
                    alt="PFI SBCC Tools" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/dev-pfi-saathiya.jpg" 
                    alt="Saathiya Program" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Population Foundation of India</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We developed a rich suite of <span className="text-green-400 font-semibold">SBCC tools</span> for <span className="text-green-400 font-semibold">adolescent health</span>, including 3D comics and interactive games. We also <span className="text-green-400 font-semibold">rebranded their Saathiya program</span> with a new logo, leaflets, and app promos.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2 relative">
                  <Image 
                    src="/images/dev-bbc-kilkari.jpg" 
                    alt="BBC Kilkari Campaign" 
                    width={600} 
                    height={400}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="lg:order-1 space-y-4">
                  <h3 className="text-2xl font-bold text-white">BBC Media Action</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We produced the <span className="text-green-400 font-semibold">Kilkari campaign</span> on maternal health, a nationwide initiative to raise awareness and promote healthier practices among <span className="text-green-400 font-semibold">rural women</span>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  <Image 
                    src="/images/dev-path-je.jpg" 
                    alt="PATH Japanese Encephalitis" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                  <Image 
                    src="/images/dev-pathfinder-fp.jpg" 
                    alt="Pathfinder Family Planning" 
                    width={300} 
                    height={200}
                    className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">PATH & Pathfinder</h3>
                  <p className="text-gray-400 leading-relaxed">
                    This partnership involved creating animated films on <span className="text-green-400 font-semibold">Japanese Encephalitis</span> and developing 24 video modules on <span className="text-green-400 font-semibold">family planning</span> for an LMS serving over 1,500 health workers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="relative z-10 py-32">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Founder Quote */}
            <div className="mb-20">
              <blockquote className="text-3xl md:text-5xl font-medium text-white mb-8 leading-tight">
                <span className="text-blue-400">&quot;</span>We don&apos;t sell designs. We build emotional algorithms.<span className="text-blue-400">&quot;</span>
              </blockquote>
              <div className="space-y-2">
                <p className="text-xl text-gray-300 font-medium">
                  Prashant Chaudhary — Founder & Creative Director
                </p>
                <p className="text-gray-500 italic">
                  Supported by our agile team of brand strategists, designers, motion artists, video editors, illustrators & content specialists.
                </p>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Let&apos;s Build Together
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Whether launching a product, shaping a health story, or driving a political narrative — we turn your vision into a living, breathing brand experience.
              </p>
              
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <a href="mailto:admin@anyasegen.com" 
                   className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium mb-2">Email Us</p>
                  <p className="text-gray-400 text-sm">admin@anyasegen.com</p>
                </a>
                
                <a href="tel:+918383036073" 
                   className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <Phone className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium mb-2">Call Us</p>
                  <p className="text-gray-400 text-sm">+91 8383036073</p>
                </a>
                
                <a href="http://www.anyasegen.com" target="_blank" rel="noopener noreferrer"
                   className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium mb-2">Visit Website</p>
                  <p className="text-gray-400 text-sm">www.anyasegen.com</p>
                </a>
              </div>
              
              {/* Address */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-gray-500 text-sm leading-relaxed">
                  H-187, Lohia Road, Sector 63, Noida-201301, Uttar Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Anya Segen. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gray-900/90 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button
                  className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors"
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                <div className="aspect-video relative overflow-hidden rounded-t-3xl">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>

                <div className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                        {selectedProject.category}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">{selectedProject.description}</p>
                    
                    {selectedProject.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">2024</div>
                        <div className="text-sm text-gray-400">Year</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-cyan-400 mb-1">6 Mo</div>
                        <div className="text-sm text-gray-400">Duration</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400 mb-1">5</div>
                        <div className="text-sm text-gray-400">Team Size</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}