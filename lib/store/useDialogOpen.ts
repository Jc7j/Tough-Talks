import { create } from 'zustand'
import { DialogOpen } from '../definitions'

export const useDialogOpen = create<DialogOpen>((set) => ({
  open: false,
  setOpen: (open: DialogOpen['open']) => set({ open }),
}))
