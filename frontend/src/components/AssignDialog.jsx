import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function AssignDialog({ open, onClose, onSave }) {
  const [technician, setTechnician] = useState("")
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("")
const technicians = ["John D.", "Sarah M.", "Mike R.", "Lisa K.", "Alex P."];
const [team, setTeam] = useState("")

const teams = [
  "Internal Maintenance Team A",
  "Internal Maintenance Team B",
  "Electrical Team",
  "Mechanical Team",
  "External Vendor – Alpha",
  "External Vendor – Beta"
]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] z-[9999] text-white">
        <DialogHeader>
          <DialogTitle>Assign Maintenance</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
  <Label>Team</Label>
  <select
    value={team}
    onChange={(e) => setTeam(e.target.value)}
    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer"
  >
    <option value="">Select team...</option>
    {teams.map(t => (
      <option key={t} value={t} className="bg-slate-800 text-white">
        {t}
      </option>
    ))}
  </select>
</div>

          <div>
            <Label>Technician</Label>
            <select
  value={technician}
  onChange={(e) => setTechnician(e.target.value)}
  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-blue-400/50 focus:outline-none transition-all cursor-pointer"
>
  <option value="">Assign to...</option>
  {technicians.map(tech => (
    <option key={tech} value={tech} className="bg-slate-800 text-white">
      {tech}
    </option>
  ))}
</select>

          </div>
  
          <div>
            <Label>Scheduled Date</Label>
            <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <Label>Duration (hours)</Label>
            <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() =>
              onSave({ technician, date, duration })
            }
          >
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
