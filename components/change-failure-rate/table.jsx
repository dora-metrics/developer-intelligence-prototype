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
import { Orbit, CalendarCheck, Ticket } from "lucide-react"
import useChangeFailureRate from "./changeFailureRate";
import { dateFormatter, dayFormatter } from '@/lib/date-funcs';

export function ChangeFailureRateTable({ dateRange, appName }) {

  const { cfrData, loading } = useChangeFailureRate(appName, dateRange);
  console.log('Table cfrData: ', cfrData)

  if (loading) {
    return <div>Loading...</div>; // Render loading state while data is being fetched
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticket Reference</TableHead>
          <TableHead>App Name</TableHead>
          <TableHead>Date Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {cfrData.map (({ issue_id, timestamp }) => (
          <TableRow key={issue_id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />{issue_id}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Orbit className="w-4 h-4" />{appName}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" /> { dateFormatter(timestamp) }
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}