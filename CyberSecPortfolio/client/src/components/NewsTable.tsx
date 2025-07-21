import { useState, useEffect } from 'react'
import { ExternalLink, AlertTriangle, Shield, Bug, Users, Loader2, RefreshCw } from 'lucide-react'

interface NewsItem {
  id: number
  title: string
  description: string
  category: string
  date: string
  link: string
  author: string
  publishedAt: string
}

const NewsTable = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  // Function to get icon based on category
  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase()
    if (categoryLower.includes('malware') || categoryLower.includes('threat')) {
      return { icon: Bug, color: 'text-cyber-red' }
    }
    if (categoryLower.includes('vulnerability') || categoryLower.includes('exploit')) {
      return { icon: AlertTriangle, color: 'text-cyber-yellow' }
    }
    if (categoryLower.includes('attack') || categoryLower.includes('breach')) {
      return { icon: Shield, color: 'text-cyber-red' }
    }
    if (categoryLower.includes('surveillance') || categoryLower.includes('espionage')) {
      return { icon: Users, color: 'text-cyber-blue' }
    }
    if (categoryLower.includes('cloud') || categoryLower.includes('ai')) {
      return { icon: Shield, color: 'text-cyber-green' }
    }
    if (categoryLower.includes('mobile')) {
      return { icon: Shield, color: 'text-cyber-blue' }
    }
    if (categoryLower.includes('network')) {
      return { icon: Shield, color: 'text-cyber-green' }
    }
    if (categoryLower.includes('compliance') || categoryLower.includes('regulation')) {
      return { icon: Shield, color: 'text-cyber-yellow' }
    }
    return { icon: Shield, color: 'text-cyber-green' }
  }

  // Function to fetch news data
  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/news')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setNewsItems(result.data)
        setLastUpdated(result.lastUpdated)
      } else {
        throw new Error(result.message || 'Failed to fetch news')
      }
    } catch (err) {
      console.error('Error fetching news:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch news')
    } finally {
      setLoading(false)
    }
  }

  // Fetch news on component mount
  useEffect(() => {
    fetchNews()
  }, [])

  // Auto-refresh every 6 hours
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews()
    }, 6 * 60 * 60 * 1000) // 6 hours

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-cyber font-bold text-white drop-shadow flex items-center">
          <Shield className="mr-2 h-5 w-5 text-cyber-green" />
          Latest <span className="text-cyber-green">Security News</span>
        </h3>
        <div className="flex items-center space-x-3">
          {lastUpdated && (
            <span className="text-xs text-white/60">
              Updated: {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchNews}
            disabled={loading}
            className="text-cyber-green hover:text-cyber-blue transition-colors flex items-center text-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="ml-1 h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="ml-1 h-3 w-3" />
            )}
          </button>
          <a 
            href="https://thehackernews.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyber-green hover:text-cyber-blue transition-colors flex items-center text-sm"
          >
            View All <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>

      {loading && newsItems.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 text-cyber-green animate-spin" />
          <span className="ml-2 text-white/90">Loading latest security news...</span>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <AlertTriangle className="h-8 w-8 text-cyber-red mx-auto mb-2" />
          <p className="text-white/90 mb-4">{error}</p>
          <button
            onClick={fetchNews}
            className="bg-cyber-green text-black px-4 py-2 rounded hover:bg-cyber-green/80 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {newsItems.map((item) => {
              const { icon: IconComponent, color } = getCategoryIcon(item.category)
              return (
                <div 
                  key={item.id} 
                  className="border border-cyber-green/20 rounded-md p-3 hover:bg-cyber-green/5 transition-colors cursor-pointer"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className={`h-4 w-4 mt-1 ${color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white drop-shadow mb-1 line-clamp-2 hover:text-cyber-green transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span className="bg-cyber-green/20 text-cyber-green px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-cyber-green/20">
            <p className="text-xs text-white/60 text-center">
              News source: <a 
                href="https://thehackernews.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyber-green hover:text-cyber-blue transition-colors"
              >
                The Hacker News
              </a>
              {lastUpdated && (
                <span className="ml-2">
                  • Last updated: {new Date(lastUpdated).toLocaleString()}
                </span>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default NewsTable 