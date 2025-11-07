'use client'
import React from 'react'
import Link from 'next/link'
import { Polaroid } from '@/components/ui/polaroid'
import galleryData from '@/data/gallery.json'

export default function GalleryPage() {
    // Map gallery data and alternate rotation
    const photos = galleryData.map((photo, index) => ({
        src: `/${photo.filename}`,
        alt: photo.caption,
        caption: photo.caption,
        rotation: (index % 2 === 0 ? 'left' : 'right') as 'left' | 'right'
    }));

    return (
        <>
            <header>
                <nav className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                    <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                        <div className="relative flex items-center justify-between py-3 lg:py-4">
                            <Link
                                href="/#home"
                                aria-label="home"
                                className="text-xl font-semibold"
                            >
                                Vasav Anandjiwala
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="pt-16 lg:pt-20">
                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <h1 className="text-4xl font-semibold mb-12 text-center">Gallery</h1>

                        {/* Masonry Grid */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
                            {photos.map((photo, index) => (
                                <Polaroid
                                    key={index}
                                    src={photo.src}
                                    alt={photo.alt}
                                    caption={photo.caption}
                                    rotation={photo.rotation}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
