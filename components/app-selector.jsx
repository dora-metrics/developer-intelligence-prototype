"use client"

import { useState, useContext } from 'react'
import { Check, ChevronsUpDown, Github, Gitlab, Box } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

export function AppSelector({ appList, activeApp, setActiveApp }) {

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-80 justify-between rounded-full">
          <div className="flex items-center">
            <Box className="mr-2 w-4 h-4" />
            {activeApp && appList.find((application) => application.app === activeApp)?.app}
            {!activeApp && 'Select application...'}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={'left'} className="w-[320px] p-0 rounded-2xl overflow-hidden">
        <Command>
          <CommandInput placeholder="Search application..." />
          <CommandEmpty>No application found.</CommandEmpty>
          <CommandGroup>
            {appList.map((application) => (
              <CommandItem className="flex items-center justify-between" key={application.app} onSelect={(currentValue) => {
                setActiveApp(currentValue)
                setOpen(false)
              }}>
                <div className="flex items-center">
                  <Box className={cn("mr-2 w-4 h-4", application.app === activeApp ? "opacity-100" : "opacity-40")} />
                  <span className={`${activeApp === application.app ? 'font-semibold' : 'font-base'}`}>{application.app}</span>
                </div>
                <Check className={cn("mr-2 h-4 w-4", activeApp === application.app ? "opacity-100" : "opacity-0")} />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <div className="p-2">
          <Button variant="secondary" className="w-full rounded-full" disabled>Customize</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
