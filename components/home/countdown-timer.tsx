import React, { useState, useEffect, useRef } from 'react'

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const targetTime = targetDate.getTime()
  const timeLeftRef = useRef(targetTime - Date.now())
  const referenceTimeRef = useRef(Date.now())
  const [formattedTime, setFormattedTime] = useState('')
  const [animate, setAnimate] = useState(false) // State to control animation trigger

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const interval = now - referenceTimeRef.current
      referenceTimeRef.current = now
      timeLeftRef.current = timeLeftRef.current - interval

      if (timeLeftRef.current <= 0) {
        timeLeftRef.current = 0
        clearInterval(timerId)
      }

      const previousTime = formattedTime // Capture previous formatted time
      const totalSeconds = Math.round(timeLeftRef.current / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      let timeString = ''
      if (hours > 0) {
        timeString = `${hours.toString().padStart(2, '0')}hrs`
      } else if (minutes > 0) {
        timeString = `${minutes.toString().padStart(2, '0')}mins`
      } else {
        timeString = `${seconds.toString().padStart(2, '0')}s`
      }

      // Only trigger animation if time changes
      if (timeString !== previousTime) {
        setAnimate(true)
        // Remove the animation class after it completes
        setTimeout(() => setAnimate(false), 1000) // Match the duration of your CSS animation
      }

      setFormattedTime(timeString)
    }

    const timerId = setInterval(updateTimer, 100)
    updateTimer()

    return () => clearInterval(timerId)
  }, [formattedTime])

  return (
    <div
      className={`absolute text-xs bottom-3 right-3 ${animate ? 'flash-animation' : ''}`}
    >
      {formattedTime}
    </div>
  )
}

export default CountdownTimer
