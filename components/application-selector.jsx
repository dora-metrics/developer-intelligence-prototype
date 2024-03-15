"use client"

import { useState, useContext } from 'react'
import { Check, ChevronsUpDown, Github, Gitlab, Box } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

export function ApplicationSelector({ applications, activeApplication, changeActiveApplication }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-80 justify-between rounded-full">
          <div className="flex items-center">
            <Box className="mr-2 w-4 h-4" />
            {activeApplication && applications.find((application) => application.id === activeApplication)?.name}
            {!activeApplication && 'Select application...'}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'left'} className="w-[320px] p-0 rounded-2xl overflow-hidden">
        <Command>
          <CommandInput placeholder="Search application..." />
          <CommandEmpty>No application found.</CommandEmpty>
          <CommandGroup>
            {applications.map((application) => (
              <CommandItem className="flex items-center justify-between" key={application.id} onSelect={(currentValue) => {
                changeActiveApplication(currentValue)
                setOpen(false)
              }}>
                <div className="flex items-center">
                  <Box className={cn("mr-2 w-4 h-4", application.id === activeApplication ? "opacity-100" : "opacity-40")} />
                  <span className={`${activeApplication === application.id ? 'font-semibold' : 'font-base'}`}>{application.name}</span>
                </div>
                <Check className={cn("mr-2 h-4 w-4", activeApplication === application.id ? "opacity-100" : "opacity-0")} />
              </CommandItem>
            ))}
            <CommandItem className="flex items-center justify-between opacity-40" key={'04'} disabled>
              <div className="flex items-center">
                <Box className="mr-2 w-4 h-4 opacity-40" />
                Alchemy/QuantaShift
              </div>
              <Check className="mr-2 h-4 w-4 opacity-0" />
            </CommandItem>
            <CommandItem className="flex items-center justify-betwee opacity-40" key={'05'} disabled>
              <div className="flex items-center">
                <Box className="mr-2 w-4 h-4 opacity-40" />
                SatelliteSynapse
              </div>
              <Check className="mr-2 h-4 w-4 opacity-0" />
            </CommandItem>
          </CommandGroup>
        </Command>
        <div className="p-2">
          <Button variant="secondary" className="w-full rounded-full" disabled>Customize</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}