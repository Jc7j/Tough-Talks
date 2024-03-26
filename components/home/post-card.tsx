'use client'

import { memo } from 'react'
import { Card } from '../ui/card'

const onHover = `transition duration-800 ease hover:scale-105`

export default memo(function PostCard({
  content,
}: {
  id: string
  content: string
}) {
  return (
    <Card
      className={`relative flex flex-coljustify-center items-center px-16 py-20  ${onHover}`}
    >
      <p className="text-center w-full break-words">{content}</p>
    </Card>
  )
})
