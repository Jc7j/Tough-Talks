'use client'

import { memo } from 'react'
import { Card } from '../ui/card'
import CountdownTimer from './countdown-timer'

const onHover = `transition duration-800 ease hover:scale-105`

// Maybe let user choose a color for the background and text??
// Maybe allow user to separate by \n then itll add a new line as a break

export default memo(function PostCard({
  content,
  timeTillExpire,
}: {
  id: string
  content: string
  timeTillExpire: Date
}) {
  return (
    <Card
      className={`relative flex flex-coljustify-center items-center px-16 py-20  ${onHover}`}
    >
      <p className="text-center w-full break-words">{content}</p>
      <CountdownTimer targetDate={timeTillExpire} />
    </Card>
  )
})
