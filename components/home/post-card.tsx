'use client'

import { calculateValuesFromUUID } from '../../lib/utils'
import { Card } from '../ui/card'
import { useEffect } from 'react'

export default function PostCard({
  id,
  content,
}: {
  id: string
  content: string
}) {
  const keyframeRanges = calculateValuesFromUUID(id)

  // Generate four random positions for the animation
  const positions = Array.from({ length: 4 }, () => ({
    x: Math.floor(Math.random() * 100), // Between 5% and 95%
    y: Math.floor(Math.random() * 100), // Between 5% and 95%
  }))

  useEffect(() => {
    const styleId = 'dynamic-keyframes-style-' + id // Unique ID for each PostCard
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)

      const keyframes = `
      @keyframes dynamicMove${id} {
        0% { transform: translate(-200%, -200%); }
        20% { transform: translate(${positions[1].x}%, ${positions[1].y}%); }
        40% { transform: translate(-100%, 100%); }
        60% { transform: translate(${positions[3].x}%, ${positions[3].y}%); }
        80% { transform: translate(${positions[0].x}%, ${positions[0].y}%); }
        100% { transform: translate(-200%, -200%); }
      }
    `

      style.innerHTML = keyframes
    }
  }, [id, keyframeRanges, positions])

  const animationStyle = {
    animation: `dynamicMove${id} 10s infinite linear`,
  }

  return (
    <Card
      className={'flex justify-center items-center absolute lg:w-1/6 p-3'}
      style={animationStyle}
    >
      <p className="text-xs">{content}</p>
    </Card>
  )
}
