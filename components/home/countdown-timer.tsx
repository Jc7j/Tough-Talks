'use client'

import React, { useState, useEffect, useRef } from 'react'

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const targetTime = targetDate.getTime()
  // Use useRef for values that change over time without causing re-renders
  const timeLeftRef = useRef(targetTime - Date.now())
  const referenceTimeRef = useRef(Date.now())

  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now()
      const interval = now - referenceTimeRef.current
      referenceTimeRef.current = now
      timeLeftRef.current = timeLeftRef.current - interval

      // Update timeLeft without causing re-renders
      if (timeLeftRef.current <= 0) {
        timeLeftRef.current = 0
        clearInterval(timerId)
      }

      // Calculate display value and update state to re-render
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

      setFormattedTime(timeString)
    }

    const timerId = setInterval(updateTimer, 100)

    // Initial setup
    updateTimer()

    return () => clearInterval(timerId)
  }, [])

  return <div className="text-xs">{formattedTime}</div>
}

export default CountdownTimer
