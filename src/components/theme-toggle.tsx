"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Waves } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { setTheme, theme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xl border-white/10 hover:bg-white/5">
          {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'midnight' && <Waves className="h-[1.2rem] w-[1.2rem] text-primary" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-white/10">
        <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer">
          <Sun className="h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer">
          <Moon className="h-4 w-4" /> Executive Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("midnight")} className="gap-2 cursor-pointer">
          <Waves className="h-4 w-4 text-primary" /> Midnight Slate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}