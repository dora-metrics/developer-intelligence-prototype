'use client'

import { Rocket, ArrowUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { InfoTooltip } from '@/components/info-tooltip'
import { DeploymentFrequencyRating } from '@/components/deployment-frequency/rating'
import { useState, useEffect } from "react"
import { getDaysBetweenDates } from '@/components/date-range-selector'
import { fetchDeploymentFrequency } from './deploymentFrequency'

export function DeploymentFrequencyTabTrigger({ dateRange, data, appName }) {

  // Calculate the mean
  const calculateMean = data => {
    if (data.length < 1) {
      return
    }
    return data.reduce((prev, current) => prev + current) / data.length
  }

  const averages = data.map(element => {
    return element.rollingAverage
  })

  const { response, loading } = fetchDeploymentFrequency(appName, dateRange);
  console.log('DF Tab: ', response)

  if (loading) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

  const chartMean = response.df / getDaysBetweenDates(dateRange)
  const percentChange = Math.round((response.df / response.last) * 100)

  // Anomaly detection
  const showAnomalyWarning = data.some((day) => {
    if (day.rollingAverage < day.expectedRange[0] || day.rollingAverage > day.expectedRange[1]) { return true }
    return false
  })

  return (
    <>
      <div className="flex items-center justify-between w-full mb-2">
        <Rocket className="w-6 h-6 stroke-blue-500" />
        {showAnomalyWarning && <Badge className="text-orange-700 bg-orange-50 border-orange-700 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-400" variant="outline">Anomaly detected</Badge>}
      </div>
      <h2 className="flex items-center gap-2">
        <span className="font-semibold text-base dark:text-white">Deployment frequency</span>
        <InfoTooltip label={'How often an organization successfully releases to production'} />
      </h2>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <strong className="text-black text-2xl font-semibold tracking-tight dark:text-white">{parseFloat(chartMean).toFixed(2)} per day</strong>
          <Badge variant="outline" className="px-1.5 bg-emerald-50 border-0 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><ArrowUp className="h-4 w-4 mr-1 stroke-emerald-700 dark:stroke-emerald-300" /> {percentChange}%</Badge>
        </div>
        {/* <DeploymentFrequencyRating chartMean={chartMean} /> */}
      </div>
    </>
  )
}