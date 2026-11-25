import React from 'react'
import Navbar from './Navbar'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import Skills from '../sections/Skills'
import Blogs from '../sections/Blogs'
import Contact from '../sections/Contact'

const Portfolio: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Projects />
        <Experience />
        <Skills />
        <Blogs />
        <Contact />
      </main>
    </div>
  )
}

export default Portfolio
