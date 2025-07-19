import { useState } from 'react'
import { 
  Calendar, 
  Award, 
  Shield, 
  Code, 
  BookOpen, 
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  Zap
} from 'lucide-react'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'certification' | 'project' | 'achievement' | 'education' | 'experience'
  icon: any
  color: string
  details?: string[]
  tags?: string[]
  link?: string
}

const PortfolioTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '2024',
      title: 'Senior Cybersecurity Engineer',
      description: 'Lead security initiatives and threat hunting operations',
      type: 'experience',
      icon: Shield,
      color: 'text-cyber-green',
      details: [
        'Led incident response team for 50+ security events',
        'Implemented zero-trust architecture across enterprise',
        'Reduced security incidents by 75% through proactive measures',
        'Mentored 5 junior security analysts'
      ],
      tags: ['Incident Response', 'Zero Trust', 'Threat Hunting', 'Leadership']
    },
    {
      id: '2',
      date: '2023',
      title: 'OSCP Certification',
      description: 'Offensive Security Certified Professional',
      type: 'certification',
      icon: Award,
      color: 'text-cyber-red',
      details: [
        'Passed with 100% on all machines',
        'Completed 24-hour practical exam',
        'Demonstrated advanced penetration testing skills',
        'Earned 40 CPE credits'
      ],
      tags: ['Penetration Testing', 'OSCP', 'Offensive Security', 'Advanced']
    },
    {
      id: '3',
      date: '2023',
      title: 'Malware Analysis Platform',
      description: 'Built automated malware analysis and detection system',
      type: 'project',
      icon: Code,
      color: 'text-cyber-blue',
      details: [
        'Developed sandbox environment for malware analysis',
        'Implemented machine learning-based detection',
        'Processed 10,000+ samples with 95% accuracy',
        'Reduced analysis time from hours to minutes'
      ],
      tags: ['Malware Analysis', 'Machine Learning', 'Automation', 'Python']
    },
    {
      id: '4',
      date: '2022',
      title: 'CISSP Certification',
      description: 'Certified Information Systems Security Professional',
      type: 'certification',
      icon: Award,
      color: 'text-cyber-purple',
      details: [
        'Passed on first attempt with 800/1000 score',
        'Covered all 8 CISSP domains comprehensively',
        'Demonstrated 5+ years of security experience',
        'Earned 40 CPE credits annually'
      ],
      tags: ['CISSP', 'Security Management', 'Risk Assessment', 'Professional']
    },
    {
      id: '5',
      date: '2022',
      title: 'Network Security Monitoring',
      description: 'Implemented enterprise-wide security monitoring solution',
      type: 'project',
      icon: TrendingUp,
      color: 'text-cyber-yellow',
      details: [
        'Deployed SIEM across 500+ endpoints',
        'Created 50+ custom detection rules',
        'Achieved 99.9% uptime for monitoring systems',
        'Reduced false positives by 60%'
      ],
      tags: ['SIEM', 'Network Security', 'Monitoring', 'Enterprise']
    },
    {
      id: '6',
      date: '2021',
      title: 'Security Operations Center',
      description: 'Established 24/7 SOC for threat detection and response',
      type: 'experience',
      icon: Users,
      color: 'text-cyber-green',
      details: [
        'Built team of 8 security analysts',
        'Implemented playbooks for 20+ incident types',
        'Reduced MTTR from 4 hours to 30 minutes',
        'Achieved 99.5% SLA compliance'
      ],
      tags: ['SOC', 'Incident Response', 'Team Leadership', 'Operations']
    },
    {
      id: '7',
      date: '2020',
      title: 'Master\'s in Cybersecurity',
      description: 'Advanced degree in Information Security',
      type: 'education',
      icon: BookOpen,
      color: 'text-cyber-orange',
      details: [
        'GPA: 3.9/4.0',
        'Thesis: "Advanced Persistent Threat Detection"',
        'Published 3 research papers',
        'Graduated with honors'
      ],
      tags: ['Education', 'Research', 'Advanced Degree', 'Academic Excellence']
    },
    {
      id: '8',
      date: '2019',
      title: 'Bug Bounty Success',
      description: 'Discovered critical vulnerabilities in major platforms',
      type: 'achievement',
      icon: Star,
      color: 'text-cyber-red',
      details: [
        'Earned $50,000+ in bug bounties',
        'Reported 25+ critical vulnerabilities',
        'Featured in security hall of fame',
        'Collaborated with 10+ security teams'
      ],
      tags: ['Bug Bounty', 'Vulnerability Research', 'Responsible Disclosure', 'Recognition']
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certification': return 'bg-cyber-red/20 border-cyber-red/30'
      case 'project': return 'bg-cyber-blue/20 border-cyber-blue/30'
      case 'achievement': return 'bg-cyber-yellow/20 border-cyber-yellow/30'
      case 'education': return 'bg-cyber-orange/20 border-cyber-orange/30'
      case 'experience': return 'bg-cyber-green/20 border-cyber-green/30'
      default: return 'bg-muted border-border'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certification': return <Award className="h-4 w-4" />
      case 'project': return <Code className="h-4 w-4" />
      case 'achievement': return <Star className="h-4 w-4" />
      case 'education': return <BookOpen className="h-4 w-4" />
      case 'experience': return <Shield className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-cyber font-bold mb-4">
          Professional <span className="text-cyber-green">Timeline</span>
        </h2>
        <p className="text-muted-foreground">
          My journey in cybersecurity - from education to professional achievements
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-green via-cyber-blue to-cyber-purple"></div>

        {/* Timeline Events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-background border-4 border-cyber-green rounded-full transform -translate-x-1/2 z-10"></div>

              {/* Event Card */}
              <div className={`ml-16 cyber-card transition-all duration-300 ${
                selectedEvent === event.id ? 'scale-105 shadow-lg' : ''
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                      <event.icon className={`h-5 w-5 ${event.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-mono text-cyber-green">{event.date}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">
                          {event.type.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xl font-cyber font-bold">{event.title}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {selectedEvent === event.id ? '−' : '+'}
                  </button>
                </div>

                <p className="text-muted-foreground mb-4">{event.description}</p>

                {/* Tags */}
                {event.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-cyber-dark border border-cyber-green/30 rounded-full text-cyber-green"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Expanded Details */}
                {selectedEvent === event.id && event.details && (
                  <div className="mt-6 p-4 bg-muted rounded-lg border-l-4 border-cyber-green">
                    <h4 className="font-bold mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-cyber-green" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {event.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2">
                          <Zap className="h-3 w-3 mt-1 text-cyber-yellow flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mt-12">
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-cyber-green mb-2">8+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-cyber-blue mb-2">+30</div>
          <div className="text-sm text-muted-foreground">Certifications</div>
        </div>
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-cyber-yellow mb-2">50+</div>
          <div className="text-sm text-muted-foreground">Projects Completed</div>
        </div>
        <div className="cyber-card text-center">
          <div className="text-3xl font-bold text-cyber-red mb-2">100%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioTimeline 