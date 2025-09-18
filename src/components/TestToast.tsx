"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function TestToast() {
  return (
    <Button  
      className="mr-4"
      onClick={() => toast("Test toasts.")}
    >
      Show test toast
    </Button>
  )
}
