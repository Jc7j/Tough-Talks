'use client'

import { Card } from '../ui/card'
import CountdownTimer from './countdown-timer'

export default function PostCard({
  id,
  content,
  timeTillExpire
}: {
  id: string
  content: string
  timeTillExpire: Date 
}) {

  return (
    <Card className="flex flex-col justify-around items-center p-4">
      <p className="text-xs">{content}</p>
      <CountdownTimer targetDate={timeTillExpire}/>
    </Card>
  )
}
