"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { frameworks } from "@/app/data/stacks"

type AddStackProps = {
  onValueChange: (value: string) => void,
}

export function AddStack({ onValueChange }: AddStackProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] h-[45px] justify-between bg-[#e8e8fd0d] border border-[#2a2a2a] hover:bg-[#eeeef61c] border-0 cursor-pointer"
        >
          <div className="flex gap-2 items-center">
            <i className={`${frameworks.find((framework) => framework.value === value)?.icon} colored`}></i>
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-[#e8e8fd0d] border-0">
        <Command>
          <CommandInput placeholder="Search framework..."/>
          <CommandList className="overflow-y-scroll scrollbar-hide">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    onValueChange(currentValue)
                    setOpen(false)
                  }}
                  className={cn(
                      "hover:bg-neutral-900 cursor-pointer h-[40px] mb-1",
                      value === framework.value ? "bg-neutral-900" : ""
                    )}
                >
                  <i className={`${framework.icon} colored`}></i>
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}