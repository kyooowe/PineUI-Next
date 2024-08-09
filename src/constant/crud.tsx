import type { ReactNode } from "react"

import {
   BadgeCheck,
   BadgeHelp,
   BadgeMinus,
   BadgeX
} from "lucide-react"

export interface ICRUDStatus {
   value: string
   label: string
   icon: ReactNode
}

export const crudStatus: ICRUDStatus[] = [
   {
      value: "regular",
      label: "Regular",
      icon: <BadgeCheck className="w-4 h-4 gap-2 text-muted-foreground" />
   },
   {
      value: "probationary",
      label: "Probationary",
      icon: <BadgeHelp className="w-4 h-4 gap-2 text-muted-foreground" />
   },
   {
      value: "resigned",
      label: "Resigned",
      icon: <BadgeMinus className="w-4 h-4 gap-2 text-muted-foreground" />
   },
   {
      value: "terminated",
      label: "Terminated",
      icon: <BadgeX className="w-4 h-4 gap-2 text-muted-foreground" />
   },
]