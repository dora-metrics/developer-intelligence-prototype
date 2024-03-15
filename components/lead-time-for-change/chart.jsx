'use client'

import { useTheme } from "next-themes"
import { format } from 'date-fns'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Area, Line, ReferenceLine } from 'recharts'
import { LeadTimeForChangeTooltip } from './tooltip'
import fetchLeadTimeForChangeData from './leadTimeForChange'


const dateFormatter = epoch => {
  const date = new Date(epoch * 1000)
  return format(new Date(date), "MMM d")
}

const dayFormatter = seconds => {
  const days = parseFloat(seconds / 86400).toFixed(2)
  return days + "d"
}

export function LeadTimeForChangeChart( { dateRange, appName } ) {

  const { resolvedTheme } = useTheme()
  const animationDuration = 1000

  // Chart colors
  const strokeGrid = '#d4d4d4'            // Neutral 300
  const strokeGridDark = '#404040'        // Neutral 700
  const strokeCursor = '#8b5cf6'          // Violet 500
  const strokeActiveDot = '#ffffff'       // White
  const strokeActiveDotDark = '#171717'   // Neutral 900
  const strokeAnomaly = '#f97316'         // Orange 500

  const fillRange = '#ddd6fe'             // Violet 200
  const fillRangeDark = '#4c1d95'         // Violet 900
  const strokeRange = '#8b5cf6'           // Violet 500
  const strokeRollingAverage = '#8b5cf6'  // Violet 500
  const strokeGoal = '#f59e0b'            // Amber 500

  const { ltfcData, loading } = fetchLeadTimeForChangeData(appName, dateRange);
  console.log('Chart ltfcData: ', ltfcData)

  if (loading) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

  // // Reports
  // const [reportLeadTimeForChangeData, setReportLeadTimeForChangeData] = useState(null)
  // const [showReportLeadTimeForChangeData, setShowReportLeadTimeForChangeData] = useState(false)

  // function handleChartClick(event) {
  //   setReportLeadTimeForChangeData(event)
  //   setShowReportLeadTimeForChangeData(true)
  // }

  const customAnomalyLabel = props => {
    return (
      <g className="w-[32px] h-[32px] fill-none" transform={`translate(${props.viewBox.x - 16}, ${props.viewBox.y + 1})`}>
        <rect className="fill-orange-50 dark:fill-orange-950 stroke-orange-600 dark:stroke-orange-400 stroke-2" width="32" height="32" rx="16" />
        <path className="fill-orange-600 dark:fill-orange-400" d="M23.799 21.026 17.482 9.38a1.668 1.668 0 0 0-.683-.68 1.693 1.693 0 0 0-2.284.68L8.199 21.026A1.678 1.678 0 0 0 9.685 23.5h12.628a1.7 1.7 0 0 0 1.308-.615 1.671 1.671 0 0 0 .178-1.859Zm-7.8.474a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-3.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4Z" />
      </g>
    )
  }

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={ltfcData} margin={{ top: 0, left: 0, right: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={resolvedTheme === 'dark' ? strokeGridDark : strokeGrid} />
          <XAxis style={{ fontSize: '0.75rem' }} dataKey="timestamp" axisLine={false} tickLine={false} tickFormatter={dateFormatter} />
          <YAxis style={{ fontSize: '0.75rem' }} axisLine={false} tickLine={false} tickFormatter={dayFormatter} />
          <Tooltip content={<LeadTimeForChangeTooltip />} cursor={{ stroke: strokeCursor }} />
          <Line type="monotone" dataKey="lead_time" dot={false} activeDot={resolvedTheme === 'dark' ? { stroke: strokeActiveDotDark } : { stroke: strokeActiveDot }} stroke={strokeRollingAverage} strokeWidth={3} strokeLinecap="round" animationDuration={animationDuration} />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  )
}