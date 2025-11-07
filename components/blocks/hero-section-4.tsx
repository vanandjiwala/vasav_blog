'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import ExperienceTimeline from '@/components/ui/experience-timeline'
import { Feature } from '@/components/ui/feature-section-with-grid'
import { cn } from '@/lib/utils'
import { Menu, X, Linkedin, Github, Instagram, BookOpen, Mail, MapPin } from 'lucide-react'
import {
    SiPython,
    SiApachespark,
    SiAmazonwebservices,
    SiDatabricks,
    SiPostgresql,
    SiDocker,
    SiNextdotjs,
    SiApacheairflow,
    SiAnthropic,
    SiLangchain,
    SiOpenai,
    SiSinglestore,
    SiMariadb,
    SiClickhouse,
    SiDuckdb,
    SiJupyter,
    SiPandas,
    SiFastapi,
    SiSqlalchemy
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import { FaAws } from 'react-icons/fa'
import { DiMsqlServer } from 'react-icons/di'
import { GrMysql } from 'react-icons/gr'
import { TbSql } from 'react-icons/tb'

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section id="home" className="min-h-screen flex flex-col justify-between pt-16 lg:pt-20 pb-8">
                    <div className="w-full flex-1 flex items-center">
                        <div className="w-full py-8">
                            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                                <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                    <h1 className="mt-4 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-8 xl:text-7xl">Vasav Anandjiwala</h1>
                                    <p className="mt-6 max-w-2xl text-pretty text-lg">Architecting high-performance data platforms for analytics and AI. Proven track record in building scalable data lakehouses, optimizing ETL pipelines, and delivering cost-effective solutions on modern data stacks.</p>

                                    <div className="mt-8 flex items-center justify-center gap-6 lg:justify-start">
                                        <Link
                                            href="https://linkedin.com/in/vasav-anandjiwala"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                            aria-label="LinkedIn Profile">
                                            <Linkedin className="h-7 w-7" />
                                        </Link>
                                        <Link
                                            href="https://github.com/vanandjiwala"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                            aria-label="GitHub Profile">
                                            <Github className="h-7 w-7" />
                                        </Link>
                                        <Link
                                            href="https://www.instagram.com/vasav2203/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                            aria-label="Instagram Profile">
                                            <Instagram className="h-7 w-7" />
                                        </Link>
                                        <Link
                                            href="https://dataloader.substack.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                            aria-label="Substack Newsletter">
                                            <BookOpen className="h-7 w-7" />
                                        </Link>
                                    </div>
                                </div>
                                <img
                                    className="pointer-events-none order-first ml-auto h-48 w-48 rounded-full border-4 border-primary/10 object-cover shadow-xl sm:h-64 sm:w-64 lg:absolute lg:-right-10 lg:top-1/2 lg:-translate-y-1/2 lg:order-last lg:h-80 lg:w-80 xl:h-96 xl:w-96"
                                    src="/image.png"
                                    alt="Profile Photo"
                                    height="384"
                                    width="384"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Technologies Section - Now part of hero */}
                    <div className="w-full pb-4">
                        <div className="group relative m-auto max-w-6xl px-6">
                            <div className="flex flex-col items-center md:flex-row">
                                <div className="md:max-w-44 md:border-r md:pr-6">
                                    <p className="text-end text-sm">Technologies I use</p>
                                </div>
                                <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                    <InfiniteSlider
                                        speedOnHover={20}
                                        speed={40}
                                        gap={112}>
                                        <div className="flex">
                                            <SiPython className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiApachespark className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiAmazonwebservices className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiDatabricks className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiPostgresql className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiDocker className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiNextdotjs className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiApacheairflow className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiAnthropic className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiLangchain className="mx-auto h-6 w-6" />
                                        </div>

                                        <div className="flex">
                                            <SiOpenai className="mx-auto h-6 w-6" />
                                        </div>
                                    </InfiniteSlider>

                                    <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                    <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                    <ProgressiveBlur
                                        className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                        direction="left"
                                        blurIntensity={1}
                                    />
                                    <ProgressiveBlur
                                        className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                        direction="right"
                                        blurIntensity={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Me Section */}
                <section id="about" className="bg-muted/30 py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Professional Background */}
                            <div>
                                <h2 className="text-3xl font-semibold mb-6">About Me</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        I'm a Senior Data Engineer with extensive experience in designing and building high-performance data platforms that power analytics and AI initiatives. My expertise spans across modern data stack technologies, cloud infrastructure, and scalable data architectures.
                                    </p>
                                    <p>
                                        Throughout my career, I've specialized in developing robust data lakehouses, optimizing complex ETL pipelines, and implementing cost-effective solutions that deliver measurable business value. I'm passionate about leveraging cutting-edge technologies to solve challenging data problems at scale.
                                    </p>
                                    <p>
                                        When I'm not architecting data solutions, I enjoy sharing insights about data engineering, analytics, and AI through my writing and contributing to the tech community.
                                    </p>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="text-3xl font-semibold mb-6">Skills</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">Data Engineering</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiApachespark className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiDatabricks className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiPython className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiJupyter className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiPandas className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <TbSql className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">Cloud & Databases</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiSinglestore className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <VscAzure className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiMariadb className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiClickhouse className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <FaAws className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiDuckdb className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <DiMsqlServer className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <GrMysql className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">Generative AI</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiOpenai className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiAnthropic className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiLangchain className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">Web Development</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiNextdotjs className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiFastapi className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                <SiSqlalchemy className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <div id="experience">
                    <ExperienceTimeline />
                </div>

                {/* Projects Section */}
                <section id="projects">
                    <Feature />
                </section>

                {/* Certificates Section */}
                <section id="certificates" className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <h2 className="text-3xl font-semibold mb-12 text-center">Certificates</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                            <div className="flex items-center justify-center h-48">
                                <a
                                    href="https://credentials.databricks.com/e671ef07-51bf-48ef-ae80-970243d7d8d2#acc.xTD9kVNC"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-full transition-transform hover:scale-105"
                                >
                                    <img
                                        src="/ai-agent-fundamentals.png"
                                        alt="AI Agent Fundamentals"
                                        className="h-full w-auto object-contain"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center justify-center h-48">
                                <a
                                    href="https://credentials.databricks.com/ef635082-0f1d-419f-9f19-b99ae5bc1df3#acc.f4plKRZT"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-full transition-transform hover:scale-105"
                                >
                                    <img
                                        src="/genai-fundamentals.png"
                                        alt="Generative AI Fundamentals"
                                        className="h-full w-auto object-contain"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center justify-center h-48">
                                <a
                                    href="https://credentials.databricks.com/22392f72-7c6b-4130-b979-2c9638468741#acc.x6Zdy1Ao"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-full transition-transform hover:scale-105"
                                >
                                    <img
                                        src="/lakehouse-fundamentals.png"
                                        alt="Lakehouse Fundamentals"
                                        className="h-full w-auto object-contain"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center justify-center h-48">
                                <a
                                    href="https://credentials.databricks.com/5129be43-7cdb-41af-b6f9-464ef6885c38"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-full transition-transform hover:scale-105"
                                >
                                    <img
                                        src="/spark.png"
                                        alt="Spark Developer Associate"
                                        className="h-full w-auto object-contain"
                                    />
                                </a>
                            </div>
                            <div className="flex items-center justify-center h-48">
                                <a
                                    href="https://credentials.databricks.com/37064aa7-73bc-4570-9e74-db95d1796dfd#acc.DS4fT68z"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-full transition-transform hover:scale-105"
                                >
                                    <img
                                        src="/databricks-fundamentals.png"
                                        alt="Databricks Fundamentals"
                                        className="h-full w-auto object-contain"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Us Section */}
                <section id="contact" className="bg-muted/30 py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-6">
                        <h2 className="text-3xl font-semibold mb-12 text-center">Contact Us</h2>
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div className="flex items-center justify-center lg:justify-start">
                                <iframe
                                    src="https://dataloader.substack.com/embed"
                                    width="480"
                                    height="320"
                                    style={{border: "1px solid #EEE", background: "white"}}
                                    frameBorder="0"
                                    scrolling="no"
                                    title="Subscribe to Dataloader Newsletter"
                                ></iframe>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Available for consulting and collaboration opportunities.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-primary" />
                                            <a
                                                href="mailto:vasav.anandjiwala@gmail.com?subject=Consulting%20Inquiry&body=Hi%20Vasav,%0A%0AI%20would%20like%20to%20discuss..."
                                                className="text-foreground hover:text-primary transition-colors"
                                            >
                                                vasav.anandjiwala@gmail.com
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            <span className="text-foreground">India</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-sm text-muted-foreground mb-3">Connect with me:</p>
                                        <div className="flex gap-4">
                                            <Link
                                                href="https://linkedin.com/in/vasav-anandjiwala"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                                aria-label="LinkedIn Profile">
                                                <Linkedin className="h-6 w-6" />
                                            </Link>
                                            <Link
                                                href="https://www.instagram.com/vasav2203/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                                aria-label="Instagram Profile">
                                                <Instagram className="h-6 w-6" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Blog', href: 'https://dataloader.substack.com/', external: true },
    { name: 'Gallery', href: '/gallery', external: true },
    { name: 'Contact', href: '#contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)

    const handleLinkClick = () => {
        setMenuState(false)
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between lg:w-auto">
                            <Link
                                href="#home"
                                aria-label="home"
                                className="text-xl font-semibold">
                                Vasav Anandjiwala
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="hidden lg:block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:hidden lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

