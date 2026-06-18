'use client'

import { useEffect, useRef } from 'react'
import type { VideoConfig } from '@/types/navigation'

interface VideoPlayerProps {
    videoConfig: VideoConfig
    title?: string
    className?: string
}

function isAudioUrl(url: string): boolean {
    const audioExts = ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a', '.opus']
    try {
        const pathname = new URL(url).pathname.toLowerCase()
        return audioExts.some(ext => pathname.endsWith(ext))
    } catch {
        return false
    }
}

function isStreamUrl(url: string): boolean {
    return url.includes('.m3u8')
}

function UrlPlayer({ url, title, className }: { url: string; title?: string; className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        let hls: any = null
        let destroyed = false
        const video = videoRef.current
        if (!video) return

        if (isStreamUrl(url)) {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js'
            script.onload = () => {
                if (destroyed) return
                const Hls = (window as any).Hls
                if (Hls && Hls.isSupported()) {
                    hls = new Hls()
                    hls.loadSource(url)
                    hls.attachMedia(video)
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = url
                }
            }
            document.head.appendChild(script)
        } else {
            video.src = url
        }

        return () => {
            destroyed = true
            if (hls) {
                hls.destroy()
            }
        }
    }, [url])

    if (isAudioUrl(url)) {
        return (
            <div className={`w-full bg-black rounded-xl overflow-hidden ${className || ''}`}>
                <div className="aspect-video flex items-center justify-center bg-zinc-900">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                            </svg>
                        </div>
                        {title && <p className="text-sm text-muted-foreground mt-3">{title}</p>}
                    </div>
                </div>
                <audio ref={videoRef as any} controls className="w-full" />
            </div>
        )
    }

    return (
        <div className={`w-full aspect-video bg-black rounded-xl overflow-hidden ${className || ''}`}>
            <video
                ref={videoRef}
                controls
                className="w-full h-full"
                playsInline
            />
        </div>
    )
}

export function VideoPlayer({ videoConfig, title, className }: VideoPlayerProps) {
    if (videoConfig.type === 'bilibili') {
        const { bvid, aid, cid, p = 1 } = videoConfig
        const params = new URLSearchParams({ autoplay: '1' })
        if (bvid) params.set('bvid', bvid)
        if (aid) params.set('aid', aid)
        if (cid) params.set('cid', cid)
        if (p) params.set('p', String(p))
        const src = `//player.bilibili.com/player.html?${params.toString()}`

        return (
            <div className={`w-full aspect-video ${className || ''}`}>
                <iframe
                    src={src}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full rounded-lg border-0"
                ></iframe>
            </div>
        )
    }

    if (videoConfig.type === 'youtube') {
        return (
            <div className={`w-full aspect-video ${className || ''}`}>
                <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoConfig.videoId}?autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        )
    }

    if (videoConfig.type === 'url' && videoConfig.url) {
        return <UrlPlayer url={videoConfig.url} title={title} className={className} />
    }

    return null
}
