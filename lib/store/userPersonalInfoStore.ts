import { create } from 'zustand'

import { User, userPersonalInfo } from '../definitions'

export const useUserPersonalInfoStore = create<userPersonalInfo>((set) => ({
  name: '',
  email: '',
  setUserPersonalInfo: (
    name: userPersonalInfo['name'],
    email: userPersonalInfo['email']
  ) => set({ name, email }),
  fetchUserPersonalInfo: async () => {
    try {
      const res = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        console.error('Network response not ok. Unable to fetch user info')
      }

      const data: User = await res.json()
      set({ name: data.name, email: data.email })
    } catch (err) {
      console.error('Network response not ok. Unable to fetch user info', err)
    }
  },
}))
