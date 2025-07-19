import { ExternalLink, AlertTriangle, Shield, Bug, Users } from 'lucide-react'

const NewsTable = () => {
  // Sample news data based on The Hacker News content
  const newsItems = [
    {
      id: 1,
      title: "China's Massistant Tool Secretly Extracts SMS, GPS Data, and Images From Confiscated Phones",
      category: "Surveillance / Mobile Security",
      date: "Jul 18, 2025",
      icon: Shield,
      color: "text-cyber-red"
    },
    {
      id: 2,
      title: "UNG0002 Group Hits China, Hong Kong, Pakistan Using LNK Files and RATs in Twin Campaigns",
      category: "Cyber Espionage / Malware",
      date: "Jul 18, 2025",
      icon: Bug,
      color: "text-cyber-yellow"
    },
    {
      id: 3,
      title: "Ivanti Zero-Days Exploited to Drop MDifyLoader and Launch In-Memory Cobalt Strike Attacks",
      category: "Malware / Vulnerability",
      date: "Jul 18, 2025",
      icon: AlertTriangle,
      color: "text-cyber-green"
    },
    {
      id: 4,
      title: "Critical NVIDIA Container Toolkit Flaw Allows Privilege Escalation on AI Cloud Services",
      category: "Cloud Security / AI Security",
      date: "Jul 18, 2025",
      icon: Shield,
      color: "text-cyber-blue"
    },
    {
      id: 5,
      title: "CERT-UA Discovers LAMEHUG Malware Linked to APT28, Using LLM for Phishing Campaign",
      category: "Cyber Attack / Malware",
      date: "Jul 18, 2025",
      icon: Users,
      color: "text-cyber-red"
    }
  ]

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-cyber font-bold text-white drop-shadow flex items-center">
          <Shield className="mr-2 h-5 w-5 text-cyber-green" />
          Latest <span className="text-cyber-green">Security News</span>
        </h3>
        <a 
          href="https://thehackernews.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyber-green hover:text-cyber-blue transition-colors flex items-center text-sm"
        >
          View All <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>

      <div className="space-y-3">
        {newsItems.map((item) => (
          <div 
            key={item.id} 
            className="border border-cyber-green/20 rounded-md p-3 hover:bg-cyber-green/5 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <item.icon className={`h-4 w-4 mt-1 ${item.color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white drop-shadow mb-1 line-clamp-2">
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
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-cyber-green/20">
        <p className="text-xs text-white/60 text-center">
          News source: <a 
            href="https://thehackernews.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyber-green hover:text-cyber-blue transition-colors"
          >
            The Hacker News
          </a>
        </p>
      </div>
    </div>
  )
}

export default NewsTable 