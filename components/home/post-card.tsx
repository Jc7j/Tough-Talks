'use client'

import { motion } from 'framer-motion'

export default function PostCard({ content }: { content: string }) {
  return (
    <div className="flex justify-center items-center w-1/6 h-1/6">
      {content}
    </div>
  )
}
