import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Lock } from 'lucide-react'
import { useRecaptcha } from '../hooks/useRecaptcha'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { executeRecaptcha, isLoaded: recaptchaLoaded } = useRecaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Execute reCAPTCHA v3 for login action
      let captchaToken = null
      if (recaptchaLoaded && executeRecaptcha) {
        captchaToken = await executeRecaptcha('login')
        if (!captchaToken) {
          setError('Security verification failed. Please try again.')
          setIsLoading(false)
          return
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simple validation for demo
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Store token in localStorage
        localStorage.setItem('authToken', 'demo-token-123')
        localStorage.setItem('user', JSON.stringify({ username: formData.username, role: 'admin' }))
        
        // Redirect to admin panel
        navigate('/admin')
      } else {
        setError('Invalid credentials. Try admin/admin123')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background liquid-metal-glow">
      <div className="container max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-12 w-12 text-cyber-green" />
            <h1 className="text-3xl font-cyber font-bold">
              Admin <span className="text-cyber-green">Login</span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            Access the security dashboard and management panel
          </p>
        </div>

        {/* Login Form */}
        <div className="cyber-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white drop-shadow mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white drop-shadow mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pr-12 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !recaptchaLoaded}
              className="cyber-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Authenticating...
                </div>
              ) : !recaptchaLoaded ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Loading Security...
                </div>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4 glow-text" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-md">
            <h4 className="text-sm font-medium text-white drop-shadow mb-2">Demo Credentials</h4>
            <div className="text-xs text-white/90 drop-shadow space-y-1">
              <div><strong>Username:</strong> admin</div>
              <div><strong>Password:</strong> admin123</div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
                <Shield className="h-3 w-3 text-cyber-green" />
                <span>Protected by reCAPTCHA v3</span>
                <span className={`inline-block w-2 h-2 rounded-full ${recaptchaLoaded ? 'bg-cyber-green' : 'bg-yellow-500'}`}></span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="cyber-card-magnetic text-center target-lock">
            <Shield className="h-12 w-12 mx-auto mb-4 text-cyber-primary glow-text" />
            <h3 className="text-lg font-bold mb-2 text-white drop-shadow">Secure Access</h3>
            <p className="text-sm text-white drop-shadow">
              This is a demo environment. In production, use strong authentication 
              and enable 2FA for enhanced security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 