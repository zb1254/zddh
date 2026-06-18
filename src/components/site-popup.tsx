'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSiteInfo } from './site-provider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog"
import { Button } from "@/registry/new-york/ui/button"

export function SitePopup() {
  const { siteInfo } = useSiteInfo()
  const [open, setOpen] = useState(false)

  const popup = siteInfo?.popup

  useEffect(() => {
    if (popup?.enabled) {
      const dismissed = sessionStorage.getItem('popup_dismissed')
      if (!dismissed) {
        setOpen(true)
      }
    }
  }, [popup?.enabled])

  if (!popup?.enabled) return null

  const handleDismiss = () => {
    setOpen(false)
    sessionStorage.setItem('popup_dismissed', 'true')
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) handleDismiss() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{popup.title || '提示'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {popup.imageUrl && (
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <Image
                src={popup.imageUrl}
                alt={popup.title || ''}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          {popup.content && (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{popup.content}</p>
          )}
          {popup.linkUrl && (
            <Link href={popup.linkUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">{popup.linkText || '了解更多'}</Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
