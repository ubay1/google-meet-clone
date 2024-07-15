import { Text } from '@radix-ui/themes'
import React, { useState, useEffect } from 'react'

const Clock = () => {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  const formatDateTime = (date: Date) => {
    // const year = date.getFullYear()
    // const month = String(date.getMonth() + 1).padStart(2, '0')
    // const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    // const seconds = String(date.getSeconds()).padStart(2, '0')

    // const formattedDate = `${year}-${month}-${day}`
    const formattedTime = `${hours}:${minutes}`

    return `${formattedTime}`
  }

  return <Text size="4">{formatDateTime(dateTime)}</Text>
}

export default Clock
