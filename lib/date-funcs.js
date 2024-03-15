import { format } from 'date-fns'

export const dateFormatter = epoch => {
    const date = new Date(epoch * 1000)
    return format(new Date(date), "MMM d")
  }
  
export const dayFormatter = seconds => {
    const days = parseFloat(seconds / 86400).toFixed(2)
    return days + "d"
}