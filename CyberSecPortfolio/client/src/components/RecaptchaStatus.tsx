import { Shield, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { useRecaptcha } from '../hooks/useRecaptcha'

const RecaptchaStatus = () => {
  const { isLoaded, isLoading, siteKey } = useRecaptcha()

  if (!siteKey) {
    return (
      <div className="cyber-card bg-red-500/10 border-red-500/30">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <div>
            <h4 className="text-red-400 font-semibold">reCAPTCHA Configuration Missing</h4>
            <p className="text-red-300 text-sm">Site key not found in environment variables</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`cyber-card ${
      isLoaded 
        ? 'bg-cyber-green/10 border-cyber-green/30' 
        : 'bg-yellow-500/10 border-yellow-500/30'
    }`}>
      <div className="flex items-center space-x-3">
        {isLoading ? (
          <Clock className="h-5 w-5 text-yellow-400 animate-pulse" />
        ) : isLoaded ? (
          <CheckCircle className="h-5 w-5 text-cyber-green" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        )}
        <div>
          <h4 className={`font-semibold ${
            isLoaded ? 'text-cyber-green' : 'text-yellow-400'
          }`}>
            reCAPTCHA v3 {isLoaded ? 'Ready' : isLoading ? 'Loading...' : 'Failed'}
          </h4>
          <p className="text-white/90 text-sm">
            {isLoaded 
              ? 'Security verification is active and ready'
              : isLoading 
                ? 'Initializing security verification...'
                : 'Security verification could not be loaded'
            }
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <Shield className="h-3 w-3 text-white/60" />
            <span className="text-xs text-white/60 font-mono">
              Site Key: {siteKey?.substring(0, 10)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecaptchaStatus 