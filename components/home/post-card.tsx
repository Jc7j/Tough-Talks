'use client'

import { Card } from '../ui/card'
import CountdownTimer from './countdown-timer'

const onHover = `transition duration-800 ease hover:bg-transparent hover:scale-105`

export default function PostCard({
  id,
  content,
  timeTillExpire,
}: {
  id: string
  content: string
  timeTillExpire: Date
}) {
  return (
    <Card className={`flex flex-col justify-around items-center p-2 bg-red-50 ${onHover}`}>
      <p className="text-xs text-center break-words w-full">{content}</p>
      <CountdownTimer targetDate={timeTillExpire} />
    </Card>
  )
}
