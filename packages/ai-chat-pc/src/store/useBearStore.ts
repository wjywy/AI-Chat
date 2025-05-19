import { create } from 'zustand'

// import { create } from 'zustand'

// if you need middleware
// import { devtools, persist } from 'zustand/middleware'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>((set) => {
  return {
    bears: 0,
    increase: (by: number) => set((state) => ({ bears: state.bears + by }))
  }
})

export default useBearStore
