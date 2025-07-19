import { Shield, Code, Target, Zap } from 'lucide-react'
import { useState } from 'react'

const Projects = () => {
  const projects = [
    {
      title: 'Network Security Scanner',
      description: 'Advanced network vulnerability scanner with automated reporting and remediation suggestions.',
      technologies: ['Python', 'Nmap', 'SQLite', 'Flask'],
      category: 'Security Tools',
      icon: Shield,
      color: 'text-cyber-green',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      title: 'Web Application Firewall',
      description: 'Custom WAF implementation with real-time threat detection and blocking capabilities.',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker'],
      category: 'Security Tools',
      icon: Shield,
      color: 'text-cyber-red',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      title: 'Threat Intelligence Platform',
      description: 'Centralized platform for collecting, analyzing, and sharing threat intelligence data.',
      technologies: ['React', 'Python', 'PostgreSQL', 'Elasticsearch'],
      category: 'Intelligence',
      icon: Target,
      color: 'text-cyber-blue',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      title: 'Security Automation Framework',
      description: 'Framework for automating security tasks and incident response procedures.',
      technologies: ['Python', 'Ansible', 'Jenkins', 'Slack API'],
      category: 'Automation',
      icon: Zap,
      color: 'text-cyber-yellow',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      title: 'Penetration Testing Toolkit',
      description: 'Comprehensive toolkit for conducting penetration tests and security assessments.',
      technologies: ['Bash', 'Python', 'Metasploit', 'Burp Suite'],
      category: 'Security Tools',
      icon: Code,
      color: 'text-cyber-purple',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      title: 'Incident Response Dashboard',
      description: 'Real-time dashboard for monitoring and responding to security incidents.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      category: 'Monitoring',
      icon: Target,
      color: 'text-cyber-orange',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className="min-h-screen bg-background liquid-metal-glow">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
            Security <span className="text-cyber-green">Projects</span>
          </h1>
          <p className="text-xl text-white/90 drop-shadow max-w-3xl mx-auto">
            A collection of cybersecurity tools, frameworks, and solutions designed to enhance 
            security posture and automate defense mechanisms.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h2 className="text-3xl font-cyber font-bold mb-8 text-center">
            <span className="text-cyber-green">Featured</span> Projects
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.title} className="cyber-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <project.icon className={`h-8 w-8 ${project.color} glow-text`} />
                    <div>
                      <h3 className="text-xl font-bold text-white drop-shadow">{project.title}</h3>
                      <span className="text-sm text-white/90 drop-shadow">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/90 drop-shadow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-xs font-mono rounded-full text-white/90 border border-cyber-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-3xl font-cyber font-bold mb-8 text-center">
            All <span className="text-cyber-green">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="cyber-card group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <project.icon className={`h-6 w-6 ${project.color} glow-text`} />
                    <div>
                      <h3 className="text-lg font-bold text-white drop-shadow">{project.title}</h3>
                      <span className="text-xs text-cyber-green font-mono">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-white/90 drop-shadow mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-muted text-xs font-mono rounded text-white/90 border border-cyber-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-xs font-mono rounded text-white/90 border border-cyber-primary/20">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="cyber-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-cyber font-bold mb-4">
              Want to <span className="text-cyber-green">Collaborate</span>?
            </h2>
            <p className="text-white/90 drop-shadow mb-6">
              I'm always interested in new security challenges and collaborative projects. 
              Let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="cyber-button"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects 