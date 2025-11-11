import { useState, useEffect } from 'react'

export function useSidebarState() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('sidebarCollapsed') : null
    return saved !== null ? saved === 'true' : false
  })

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('leftSidebarOpen') : null
    return saved !== null ? saved === 'true' : false
  })

  useEffect(() => {
    try {
      localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed))
    } catch {}
  }, [sidebarCollapsed])

  useEffect(() => {
    try {
      localStorage.setItem('leftSidebarOpen', String(leftSidebarOpen))
    } catch {}
  }, [leftSidebarOpen])

  const toggleCollapsed = () => setSidebarCollapsed(v => !v)
  const openLeft = () => setLeftSidebarOpen(true)
  const closeLeft = () => setLeftSidebarOpen(false)
  const toggleLeft = () => setLeftSidebarOpen(v => !v)

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
    leftSidebarOpen,
    setLeftSidebarOpen,
    toggleCollapsed,
    openLeft,
    closeLeft,
    toggleLeft,
  }
}


