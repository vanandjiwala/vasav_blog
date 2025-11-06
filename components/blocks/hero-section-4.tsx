'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, Linkedin, Github, Instagram, BookOpen } from 'lucide-react'
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
    SiOpenai
} from 'react-icons/si'

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section>
                    <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">Vasav A</h1>
                                <p className="mt-8 max-w-2xl text-pretty text-lg">Architecting high-performance data platforms for analytics and AI. Proven track record in building scalable data lakehouses, optimizing ETL pipelines, and delivering cost-effective solutions on modern data stacks.</p>

                                <div className="mt-12 flex items-center justify-center gap-6 lg:justify-start">
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
                                className="pointer-events-none order-first ml-auto h-56 w-56 rounded-full border-4 border-primary/10 object-cover shadow-xl sm:h-72 sm:w-72 lg:absolute lg:-right-10 lg:top-1/2 lg:-translate-y-1/2 lg:order-last lg:h-96 lg:w-96"
                                src="/image.png"
                                alt="Profile Photo"
                                height="384"
                                width="384"
                            />
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-16 md:pb-32">
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
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'About', href: '#link' },
    { name: 'Projects', href: '#link' },
    { name: 'Blog', href: '#link' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="text-xl font-semibold">
                                Vasav A
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

