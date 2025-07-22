import { Shield, Code, Target, Zap, Award, Users, Cloud, Database, Server, Lock } from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Cloud Infrastructure (Azure/AWS)', level: 95, color: 'bg-cyber-secondary' },
    { name: 'Cybersecurity & Threat Detection', level: 92, color: 'bg-cyber-primary' },
    { name: 'System Administration (Linux/Windows)', level: 90, color: 'bg-cyber-warning' },
    { name: 'DevOps & CI/CD', level: 88, color: 'bg-cyber-danger' },
    { name: 'Full Stack Development', level: 85, color: 'bg-cyber-accent' },
    { name: 'AI Security & Containerization', level: 87, color: 'bg-cyber-success' },
  ]

  const certifications = [
    { name: 'Microsoft Certified: Azure Administrator Associate', issuer: 'Microsoft', year: '2024' },
    { name: 'Microsoft Certified: Azure Security Engineer Associate', issuer: 'Microsoft', year: '2025' },
    { name: 'Microsoft Certified: Cybersecurity Architect Expert', issuer: 'Microsoft', year: '2025' },
    { name: 'Microsoft Certified: Security Operations Analyst Associate', issuer: 'Microsoft', year: '2025' },
    { name: 'Microsoft 365 Certified: Fundamentals', issuer: 'Microsoft', year: '2023' },
    { name: 'Cisco: Python Essentials, JavaScript Essentials, Cyber Threat Management', issuer: 'Cisco', year: '2023' },
    { name: 'Safetica NXT Certification', issuer: 'Safetica', year: '2024' },
    { name: 'Acronis Certified Engineer', issuer: 'Acronis', year: '2022' },
    { name: 'EC-Council: Ethical Hacking Essentials (EHE)', issuer: 'EC-Council', year: '2023' },
    { name: 'EC-Council: Digital Forensics Essentials (DFE)', issuer: 'EC-Council', year: '2023' },
    { name: 'MITRE ATT&CK Security Stack Mappings: Azure', issuer: 'MITRE', year: '2024' },
    { name: 'Foundations of AI Security', issuer: 'MITRE', year: '2024' },
  ]

  return (
    <div className="min-h-screen bg-background liquid-metal-glow">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16 about-hero">
          <h1 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
            JOHN <span className="text-cyber-secondary">KATSIMPRIS</span>
          </h1>
          <p className="text-2xl text-cyber-primary font-cyber mb-4">
            SYSTEMS AND CLOUD ENGINEER
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Seasoned cybersecurity specialist and cloud infrastructure expert with over a decade of experience 
            in Azure/AWS environments, advanced threat detection, enterprise system administration, and AI-powered 
            security solutions. Committed to safeguarding critical digital assets while architecting scalable, 
            secure cloud ecosystems for mission-critical enterprise operations.
          </p>
          <div className="flex justify-center items-center space-x-6 mt-6 text-sm text-muted-foreground about-contact-info">
            <span>📍 Athens, Attica 15773</span>
            <span>📞 +30 6970657830</span>
            <span>✉️ gianniskatsibris@gmail.com</span>
          </div>
        </div>

        {/* Experience Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Experience */}
          <div className="space-y-8">
            <h2 className="text-3xl font-cyber font-bold mb-6">
              <span className="text-cyber-secondary">WORK HISTORY</span>
            </h2>
            
            <div className="space-y-6">
              <div className="cyber-card-magnetic target-lock">
                <div className="flex items-start space-x-4">
                  <Cloud className="h-8 w-8 text-cyber-secondary mt-1 glow-text" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white drop-shadow">Senior Systems and Cloud Engineer</h3>
                    <p className="text-cyber-secondary font-mono text-sm mb-2">05/2024 - Current</p>
                    <ul className="text-white/90 drop-shadow text-sm space-y-1">
                      <li>• Monitor system and cloud infrastructure health using Azure Monitor, AWS CloudWatch</li>
                      <li>• Optimized secure data storage with scalable cloud storage solutions</li>
                      <li>• Troubleshot complex networking, systemd service failures, and kernel-level issues</li>
                      <li>• Deployed and managed Linux-based servers (Ubuntu, RHEL, CentOS) for AI-ready environments</li>
                      <li>• Managed AI workloads using containerized environments (Docker, Kubernetes)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cyber-card-magnetic target-lock">
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 text-cyber-primary mt-1 glow-text" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white drop-shadow">Senior Cyber Security Engineer</h3>
                    <p className="text-cyber-primary font-mono text-sm mb-2">01/2023 - 05/2024</p>
                    <ul className="text-white/90 drop-shadow text-sm space-y-1">
                      <li>• Led strategic collaboration with SIEM providers to enhance threat detection</li>
                      <li>• Developed comprehensive security standards, reducing vulnerabilities by 30%</li>
                      <li>• Deployed and maintained commercial firewall solutions with 99.9% uptime</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cyber-card-magnetic target-lock">
                <div className="flex items-start space-x-4">
                  <Lock className="h-8 w-8 text-cyber-warning mt-1 glow-text" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white drop-shadow">Cyber Security Engineer</h3>
                    <p className="text-cyber-warning font-mono text-sm mb-2">07/2021 - 01/2023</p>
                    <ul className="text-white/90 drop-shadow text-sm space-y-1">
                      <li>• Conducting regular vulnerability assessments and security architecture design</li>
                      <li>• Monitoring network and systems for suspicious activity and security breaches</li>
                      <li>• Provision of remote support to shipping company with 15 vessels</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cyber-card-magnetic target-lock">
                <div className="flex items-start space-x-4">
                  <Code className="h-8 w-8 text-cyber-accent mt-1 glow-text" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white drop-shadow">Software Engineer</h3>
                    <p className="text-cyber-accent font-mono text-sm mb-2">01/2021 - 07/2021</p>
                    <ul className="text-white/90 drop-shadow text-sm space-y-1">
                      <li>• Designed and implemented backend services using Python</li>
                      <li>• Collaborated with cross-functional teams for technical requirements</li>
                      <li>• Performed unit and integration testing for reliability</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="cyber-card-magnetic target-lock">
                <div className="flex items-start space-x-4">
                  <Server className="h-8 w-8 text-cyber-danger mt-1 glow-text" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white drop-shadow">Full Stack Developer</h3>
                    <p className="text-cyber-danger font-mono text-sm mb-2">02/2013 - 01/2021</p>
                    <ul className="text-white/90 drop-shadow text-sm space-y-1">
                      <li>• Managed IT infrastructure, servers, and cloud environments (Azure, AWS)</li>
                      <li>• Developed web applications using React, Angular, Vue.js, Node.js, .NET, Python</li>
                      <li>• Implemented CI/CD pipelines for automated deployment</li>
                      <li>• Configured and optimized databases (SQL Server, MySQL, PostgreSQL)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <h2 className="text-3xl font-cyber font-bold mb-6">
              <span className="text-cyber-secondary">TECHNICAL SKILLS</span>
            </h2>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white drop-shadow text-sm skill-bar-text">{skill.name}</span>
                    <span className="text-sm text-cyber-primary font-mono font-bold skill-bar-text">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-cyber-primary skill-bar">
                    <div 
                      className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out shadow-lg skill-bar`}
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${index * 200}ms`,
                        animation: 'skillBarFill 1.5s ease-out forwards'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="cyber-card-magnetic target-lock">
              <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Technologies & Tools</h3>
              <div className="grid grid-cols-2 gap-2 text-sm tech-grid">
                <div>
                  <h4 className="font-bold text-cyber-primary mb-2">Cloud & Infrastructure</h4>
                  <p className="text-white/90 drop-shadow">Azure, AWS, Docker, Kubernetes, Linux (Ubuntu, RHEL, CentOS)</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyber-primary mb-2">Programming</h4>
                  <p className="text-white/90 drop-shadow">Python, Java, C#, JavaScript, TypeScript, PHP, C++</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyber-primary mb-2">Frameworks</h4>
                  <p className="text-white/90 drop-shadow">React, Angular, Vue.js, .NET Core, Node.js</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyber-primary mb-2">Databases</h4>
                  <p className="text-white/90 drop-shadow">SQL Server, MySQL, PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-20">
          <h2 className="text-3xl font-cyber font-bold mb-8 text-center">
            <span className="text-cyber-secondary">EDUCATION</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 education-grid">
            <div className="cyber-card-magnetic text-center target-lock education-card">
              <Award className="h-12 w-12 mx-auto mb-4 text-cyber-secondary glow-text" />
              <h3 className="text-lg font-bold mb-2 text-white drop-shadow">BSc (Hons) Cyber Security and Networks</h3>
              <p className="text-sm text-white/90 mb-1 drop-shadow">University of East London</p>
            </div>
            <div className="cyber-card-magnetic text-center target-lock education-card">
              <Award className="h-12 w-12 mx-auto mb-4 text-cyber-primary glow-text" />
              <h3 className="text-lg font-bold mb-2 text-white drop-shadow">Coding Factory</h3>
              <p className="text-sm text-white/90 mb-1 drop-shadow">University of Economics and Business - Athens</p>
            </div>
            <div className="cyber-card-magnetic text-center target-lock education-card">
              <Award className="h-12 w-12 mx-auto mb-4 text-cyber-warning glow-text" />
              <h3 className="text-lg font-bold mb-2 text-white drop-shadow">E-learning Certification: Web Development</h3>
              <p className="text-sm text-white/90 mb-1 drop-shadow">National And Kapodistrian University of Athens</p>
            </div>
            <div className="cyber-card-magnetic text-center target-lock education-card">
              <Award className="h-12 w-12 mx-auto mb-4 text-cyber-accent glow-text" />
              <h3 className="text-lg font-bold mb-2 text-white drop-shadow">Programming Languages</h3>
              <p className="text-sm text-white/90 mb-1 drop-shadow">University of Kent</p>
              <p className="text-xs text-cyber-accent font-mono drop-shadow">Specialized in PHP, C++, HTML, CSS, and JavaScript</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h2 className="text-3xl font-cyber font-bold mb-8 text-center">
            <span className="text-cyber-secondary">CERTIFICATIONS</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 certifications-grid">
            {certifications.map((cert) => (
              <div key={cert.name} className="cyber-card-magnetic text-center target-lock certification-card">
                <Award className="h-12 w-12 mx-auto mb-4 text-cyber-secondary glow-text" />
                <h3 className="text-lg font-bold mb-2 text-white drop-shadow">{cert.name}</h3>
                <p className="text-sm text-white/90 mb-1 drop-shadow">{cert.issuer}</p>
                <p className="text-sm text-cyber-secondary font-bold drop-shadow">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-cyber font-bold mb-8 text-center">
            <span className="text-cyber-secondary">PROFESSIONAL TIMELINE</span>
          </h2>
          
          {/* Desktop Timeline */}
          <div className="hidden md:block relative timeline-container">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyber-primary via-cyber-secondary to-cyber-accent h-full glow-text timeline-line"></div>
            
            <div className="space-y-12">
              {/* 2013 - Full Stack Developer */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-danger rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-danger mb-2">Full Stack Developer</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">02/2013 - 01/2021</p>
                    <p className="text-xs text-cyber-danger font-mono">8 Years of Development Experience</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">Programming Languages</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">University of Kent</p>
                    <p className="text-xs text-cyber-secondary font-mono">PHP, C++, HTML, CSS, JavaScript</p>
                  </div>
                </div>
              </div>

              {/* 2019-2020 - Web Development */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-warning rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-warning mb-2">E-learning Certification: Web Development</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">National And Kapodistrian University of Athens</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right"></div>
              </div>

              {/* 2021 - Software Engineer */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-accent rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-accent mb-2">Software Engineer</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">01/2021 - 07/2021</p>
                    <p className="text-xs text-cyber-accent font-mono">Python Backend Development</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right"></div>
              </div>

              {/* 2021-2023 - Cyber Security Engineer */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-warning rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-warning mb-2">Cyber Security Engineer</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">07/2021 - 01/2023</p>
                    <p className="text-xs text-cyber-warning font-mono">Vulnerability Assessment & Security Architecture</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">Acronis Certified Engineer</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">Acronis</p>
                  </div>
                </div>
              </div>

              {/* 2022-2023 - Early Certifications */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-secondary rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">Microsoft 365 Certified: Fundamentals</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">Microsoft</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-primary mb-2">Cisco Certifications</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">Python Essentials, JavaScript Essentials, Cyber Threat Management</p>
                  </div>
                </div>
              </div>

              {/* 2023 - Senior Cyber Security Engineer */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-primary rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-primary mb-2">Senior Cyber Security Engineer</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">01/2023 - 05/2024</p>
                    <p className="text-xs text-cyber-primary font-mono">SIEM Integration & Security Standards</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">EC-Council Certifications</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">Ethical Hacking Essentials (EHE), Digital Forensics Essentials (DFE)</p>
                  </div>
                </div>
              </div>

              {/* 2024 - Current Certifications & Senior Systems Engineer */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-secondary rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">Senior Systems and Cloud Engineer</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">05/2024 - Current</p>
                    <p className="text-xs text-cyber-secondary font-mono">Azure/AWS Infrastructure & AI Workloads</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-primary mb-2">Microsoft Azure Certifications</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">Administrator, Security Engineer, Cybersecurity Architect Expert</p>
                  </div>
                </div>
              </div>

              {/* 2024-2025 - Advanced Certifications */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-accent rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-accent mb-2">MITRE Certifications</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">ATT&CK Security Stack Mappings: Azure, Foundations of AI Security</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">Safetica NXT Certification</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">Safetica</p>
                  </div>
                </div>
              </div>

              {/* 2024-2025 - Current Education */}
              <div className="relative flex items-center timeline-item">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyber-primary rounded-full border-4 border-background shadow-lg glow-text timeline-node"></div>
                <div className="w-5/12 pr-8 text-right timeline-left">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-primary mb-2">Coding Factory</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">University of Economics and Business - Athens</p>
                  </div>
                </div>
                <div className="w-5/12 pl-8 timeline-right">
                  <div className="cyber-card-magnetic target-lock timeline-card">
                    <h3 className="text-lg font-bold text-cyber-secondary mb-2">BSc (Hons) Cyber Security and Networks</h3>
                    <p className="text-sm text-white/90 mb-1 drop-shadow">University of East London</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6 mobile-timeline">
            {/* 2013 - Full Stack Developer */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-danger rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-danger">Full Stack Developer</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">02/2013 - 01/2021</p>
              <p className="text-xs text-cyber-danger font-mono mb-3">8 Years of Development Experience</p>
              <div className="border-t border-cyber-primary/20 pt-3">
                <h4 className="text-sm font-bold text-cyber-secondary mb-1">Programming Languages</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">University of Kent</p>
                <p className="text-xs text-cyber-secondary font-mono">PHP, C++, HTML, CSS, JavaScript</p>
              </div>
            </div>

            {/* 2019-2020 - Web Development */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-warning rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-warning">E-learning Certification: Web Development</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">National And Kapodistrian University of Athens</p>
            </div>

            {/* 2021 - Software Engineer */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-accent rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-accent">Software Engineer</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">01/2021 - 07/2021</p>
              <p className="text-xs text-cyber-accent font-mono">Python Backend Development</p>
            </div>

            {/* 2021-2023 - Cyber Security Engineer */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-warning rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-warning">Cyber Security Engineer</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">07/2021 - 01/2023</p>
              <p className="text-xs text-cyber-warning font-mono mb-3">Vulnerability Assessment & Security Architecture</p>
              <div className="border-t border-cyber-primary/20 pt-3">
                <h4 className="text-sm font-bold text-cyber-secondary mb-1">Acronis Certified Engineer</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">Acronis</p>
              </div>
            </div>

            {/* 2022-2023 - Early Certifications */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-secondary rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-secondary">Microsoft 365 Certified: Fundamentals</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">Microsoft</p>
              <div className="border-t border-cyber-primary/20 pt-3 mt-3">
                <h4 className="text-sm font-bold text-cyber-primary mb-1">Cisco Certifications</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">Python Essentials, JavaScript Essentials, Cyber Threat Management</p>
              </div>
            </div>

            {/* 2023 - Senior Cyber Security Engineer */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-primary rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-primary">Senior Cyber Security Engineer</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">01/2023 - 05/2024</p>
              <p className="text-xs text-cyber-primary font-mono mb-3">SIEM Integration & Security Standards</p>
              <div className="border-t border-cyber-primary/20 pt-3">
                <h4 className="text-sm font-bold text-cyber-secondary mb-1">EC-Council Certifications</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">Ethical Hacking Essentials (EHE), Digital Forensics Essentials (DFE)</p>
              </div>
            </div>

            {/* 2024 - Current Certifications & Senior Systems Engineer */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-secondary rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-secondary">Senior Systems and Cloud Engineer</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">05/2024 - Current</p>
              <p className="text-xs text-cyber-secondary font-mono mb-3">Azure/AWS Infrastructure & AI Workloads</p>
              <div className="border-t border-cyber-primary/20 pt-3">
                <h4 className="text-sm font-bold text-cyber-primary mb-1">Microsoft Azure Certifications</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">Administrator, Security Engineer, Cybersecurity Architect Expert</p>
              </div>
            </div>

            {/* 2024-2025 - Advanced Certifications */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-accent rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-accent">MITRE Certifications</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">ATT&CK Security Stack Mappings: Azure, Foundations of AI Security</p>
              <div className="border-t border-cyber-primary/20 pt-3 mt-3">
                <h4 className="text-sm font-bold text-cyber-secondary mb-1">Safetica NXT Certification</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">Safetica</p>
              </div>
            </div>

            {/* 2024-2025 - Current Education */}
            <div className="cyber-card-magnetic target-lock mobile-timeline-card">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-cyber-primary rounded-full border-2 border-background shadow-lg glow-text mr-3"></div>
                <h3 className="text-lg font-bold text-cyber-primary">Coding Factory</h3>
              </div>
              <p className="text-sm text-white/90 mb-1 drop-shadow">University of Economics and Business - Athens</p>
              <div className="border-t border-cyber-primary/20 pt-3 mt-3">
                <h4 className="text-sm font-bold text-cyber-secondary mb-1">BSc (Hons) Cyber Security and Networks</h4>
                <p className="text-xs text-white/90 mb-1 drop-shadow">University of East London</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="cyber-card-magnetic text-center target-lock mission-statement">
          <Zap className="h-16 w-16 mx-auto mb-6 text-cyber-secondary glow-text" />
          <h2 className="text-2xl font-cyber font-bold mb-4">
            Mission <span className="text-cyber-secondary">Statement</span>
          </h2>
          <p className="text-lg text-white drop-shadow max-w-3xl mx-auto">
            To leverage cutting-edge cloud infrastructure expertise and cybersecurity knowledge to protect 
            organizations from evolving digital threats, while optimizing AI-ready environments and 
            implementing scalable, secure solutions for enterprise workloads.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About 