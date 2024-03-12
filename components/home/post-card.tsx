'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const MotionCard = motion(Card)

export default function PostCard({ post }: { post: string }) {
  return <MotionCard className='flex justify-center items-center w-1/6 h-1/6'>{post}</MotionCard>
}
