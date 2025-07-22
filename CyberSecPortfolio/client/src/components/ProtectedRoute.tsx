import { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken')
      const user = localStorage.getItem('user')

      if (token && user) {
        try {
          JSON.parse(user) // Validate JSON
          setIsAuthenticated(true)
        } catch (error) {
          // Invalid user data
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-cyber-green" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login
    navigate('/login')
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 mx-auto mb-4 text-cyber-red" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute 