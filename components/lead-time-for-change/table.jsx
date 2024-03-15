'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar, GitCommit, GitGraph, Timer } from "lucide-react"
import {dateFormatter, dayFormatter} from '@/lib/date-funcs';
import fetchLeadTimeForChangeData from './leadTimeForChange'

export function LeadTimeForChangeTable({ dateRange, appName }) {
  
  const { ltfcData, loading } = fetchLeadTimeForChangeData(appName, dateRange);
  console.log('Chart ltfcData: ', ltfcData)

  if (loading) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Commit SHA</TableHead>
          <TableHead>Commit Date</TableHead>
          <TableHead>Lead time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ltfcData.map (({ commit, timestamp, lead_time }) => (
          <TableRow key={commit}>
            <TableCell>
              <div className="flex items-center gap-2">
                <GitGraph className="w-4 h-4" /> {commit}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> { dateFormatter(timestamp) }
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" /> {dayFormatter(lead_time)} days
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}