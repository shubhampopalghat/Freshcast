import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      // Check if the device has touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Check if the viewport width is less than the breakpoint
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT
      
      // Check if the device is in portrait mode
      const isPortrait = window.matchMedia('(orientation: portrait)').matches
      
      // Consider it mobile if it's a small screen with touch capability
      // or if it's a small screen in portrait mode
      setIsMobile((hasTouch && isSmallScreen) || (isSmallScreen && isPortrait))
    }

    // Initial check
    checkMobile()

    // Add event listeners
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const orientationQuery = window.matchMedia('(orientation: portrait)')

    const handleChange = () => checkMobile()

    mediaQuery.addEventListener('change', handleChange)
    orientationQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      orientationQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return isMobile
}
