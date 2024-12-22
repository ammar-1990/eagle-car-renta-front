"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"



type Props = {items:{value:string,label:string}[],noItems?:string,placeholder?:string,param:string}

export function ComboBoxField({items,noItems="No Items Found",placeholder="Select Item",param}:Props) {
  const [open, setOpen] = React.useState(false)
  const searchParams = useSearchParams()

 const initialValue = searchParams.get(param)
 const initialLabel =  items.find((item) => item.value === initialValue)?.label || ""

 
  const [value, setValue] = React.useState(initialValue)
  const [label, setLabel] = React.useState(initialLabel)

  const router = useRouter()
  const [pending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (value) {
      startTransition(() => {
        router.push(`/cars?${param}=${value}`);
      });
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between capitalize"
        >
          {value
            ? items.find((item) => item.label === label)?.label
            : placeholder}
          {pending ? <Loader className="animate-spin ml-2 h-4 w-4 shrink-0 opacity-50" /> :<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{noItems}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                className="cursor-pointer capitalize"
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    setValue(item.value)
                    setLabel(item.label)
                    setOpen(false)
              
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBoxField
