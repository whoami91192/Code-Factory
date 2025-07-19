import { useState, useEffect } from 'react'
import { 
  Trophy, 
  Target, 
  Shield, 
  Zap, 
  Lock, 
  Unlock,
  Star,
  Award,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Flag,
  Code,
  Database,
  Network,
  Eye,
  Key
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  category: 'web' | 'crypto' | 'forensics' | 'reverse' | 'pwn' | 'misc'
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  points: number
  solved: boolean
  attempts: number
  hints: string[]
  flag: string
  solvedBy: number
  timeLimit?: number
  tags: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
  points: number
}

interface SkillTree {
  id: string
  name: string
  description: string
  level: number
  maxLevel: number
  unlocked: boolean
  requirements: string[]
  skills: string[]
}

const SecurityChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [skillTree, setSkillTree] = useState<SkillTree[]>([])
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [userFlag, setUserFlag] = useState('')
  const [userPoints, setUserPoints] = useState(1250)
  const [userLevel, setUserLevel] = useState(8)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'challenges' | 'achievements' | 'skills' | 'leaderboard'>('challenges')

  // Generate sample challenges
  const generateChallenges = (): Challenge[] => [
    {
      id: 'web-001',
      title: 'SQL Injection Master',
      description: 'Find and exploit SQL injection vulnerabilities in the web application. Look for user input validation weaknesses.',
      category: 'web',
      difficulty: 'easy',
      points: 100,
      solved: false,
      attempts: 3,
      hints: ['Check the login form', 'Try single quotes', 'Look for error messages'],
      flag: 'flag{sql_injection_success}',
      solvedBy: 45,
      tags: ['SQL', 'Web', 'Injection']
    },
    {
      id: 'crypto-001',
      title: 'Caesar Cipher',
      description: 'Decrypt the message using Caesar cipher. The key is hidden in the challenge description.',
      category: 'crypto',
      difficulty: 'easy',
      points: 50,
      solved: true,
      attempts: 1,
      hints: ['Shift by 3 positions', 'Look for patterns'],
      flag: 'flag{caesar_shift_3}',
      solvedBy: 89,
      tags: ['Cryptography', 'Classical']
    },
    {
      id: 'forensics-001',
      title: 'Hidden in Plain Sight',
      description: 'Analyze the image file and find the hidden data. Use steganography tools.',
      category: 'forensics',
      difficulty: 'medium',
      points: 200,
      solved: false,
      attempts: 2,
      hints: ['Check LSB', 'Try different tools', 'Look for metadata'],
      flag: 'flag{steganography_found}',
      solvedBy: 23,
      tags: ['Steganography', 'Image Analysis']
    },
    {
      id: 'reverse-001',
      title: 'Crack the Binary',
      description: 'Reverse engineer the binary file and find the secret function.',
      category: 'reverse',
      difficulty: 'hard',
      points: 300,
      solved: false,
      attempts: 5,
      hints: ['Use IDA Pro', 'Look for strings', 'Check function calls'],
      flag: 'flag{reverse_engineering_success}',
      solvedBy: 12,
      tags: ['Reverse Engineering', 'Binary Analysis']
    },
    {
      id: 'pwn-001',
      title: 'Buffer Overflow',
      description: 'Exploit the buffer overflow vulnerability in the vulnerable program.',
      category: 'pwn',
      difficulty: 'expert',
      points: 500,
      solved: false,
      attempts: 8,
      hints: ['Find the offset', 'Use pattern_create', 'ROP chain'],
      flag: 'flag{buffer_overflow_exploited}',
      solvedBy: 5,
      tags: ['Exploitation', 'Memory Corruption']
    },
    {
      id: 'misc-001',
      title: 'Network Traffic Analysis',
      description: 'Analyze the PCAP file and find the suspicious network activity.',
      category: 'misc',
      difficulty: 'medium',
      points: 150,
      solved: false,
      attempts: 1,
      hints: ['Look for HTTP traffic', 'Check DNS queries', 'Follow TCP streams'],
      flag: 'flag{network_analysis_complete}',
      solvedBy: 34,
      tags: ['Network Analysis', 'PCAP']
    }
  ]

  // Generate achievements
  const generateAchievements = (): Achievement[] => [
    {
      id: 'first-blood',
      title: 'First Blood',
      description: 'Solve your first challenge',
      icon: '🩸',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 50
    },
    {
      id: 'web-master',
      title: 'Web Security Master',
      description: 'Solve 10 web challenges',
      icon: '🌐',
      unlocked: false,
      progress: 3,
      maxProgress: 10,
      points: 200
    },
    {
      id: 'crypto-expert',
      title: 'Cryptography Expert',
      description: 'Solve 5 crypto challenges',
      icon: '🔐',
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      points: 150
    },
    {
      id: 'speed-demon',
      title: 'Speed Demon',
      description: 'Solve a challenge in under 5 minutes',
      icon: '⚡',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      points: 100
    },
    {
      id: 'persistent',
      title: 'Persistent',
      description: 'Attempt a challenge 10 times before solving',
      icon: '💪',
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      points: 75
    },
    {
      id: 'team-player',
      title: 'Team Player',
      description: 'Collaborate with 5 different users',
      icon: '👥',
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      points: 125
    }
  ]

  // Generate skill tree
  const generateSkillTree = (): SkillTree[] => [
    {
      id: 'web-security',
      name: 'Web Security',
      description: 'Master web application security',
      level: 3,
      maxLevel: 5,
      unlocked: true,
      requirements: [],
      skills: ['SQL Injection', 'XSS', 'CSRF', 'File Upload', 'Authentication Bypass']
    },
    {
      id: 'cryptography',
      name: 'Cryptography',
      description: 'Learn cryptographic techniques',
      level: 2,
      maxLevel: 5,
      unlocked: true,
      requirements: [],
      skills: ['Classical Ciphers', 'Modern Ciphers', 'Hash Functions', 'Digital Signatures', 'Zero-Knowledge Proofs']
    },
    {
      id: 'reverse-engineering',
      name: 'Reverse Engineering',
      description: 'Analyze and understand binary code',
      level: 1,
      maxLevel: 5,
      unlocked: false,
      requirements: ['web-security-3'],
      skills: ['Static Analysis', 'Dynamic Analysis', 'Malware Analysis', 'Obfuscation', 'Anti-Debugging']
    },
    {
      id: 'exploitation',
      name: 'Exploitation',
      description: 'Master exploitation techniques',
      level: 0,
      maxLevel: 5,
      unlocked: false,
      requirements: ['reverse-engineering-2'],
      skills: ['Buffer Overflow', 'ROP Chains', 'Shellcode', 'Heap Exploitation', 'Kernel Exploitation']
    }
  ]

  // Generate leaderboard
  const generateLeaderboard = () => [
    { rank: 1, username: 'h4ck3r_m4st3r', points: 2850, level: 12, solved: 28 },
    { rank: 2, username: 'cyber_ninja', points: 2400, level: 11, solved: 24 },
    { rank: 3, username: 'security_guru', points: 2100, level: 10, solved: 21 },
    { rank: 4, username: 'pwn_master', points: 1950, level: 9, solved: 19 },
    { rank: 5, username: 'web_exploiter', points: 1800, level: 9, solved: 18 },
    { rank: 6, username: 'crypto_wizard', points: 1650, level: 8, solved: 16 },
    { rank: 7, username: 'forensics_pro', points: 1500, level: 8, solved: 15 },
    { rank: 8, username: 'you', points: 1250, level: 8, solved: 12 },
    { rank: 9, username: 'newbie_hacker', points: 1100, level: 7, solved: 11 },
    { rank: 10, username: 'script_kiddie', points: 950, level: 7, solved: 9 }
  ]

  useEffect(() => {
    setChallenges(generateChallenges())
    setAchievements(generateAchievements())
    setSkillTree(generateSkillTree())
    setLeaderboard(generateLeaderboard())
  }, [])

  const submitFlag = () => {
    if (!selectedChallenge) return

    if (userFlag === selectedChallenge.flag) {
      // Solve challenge
      setChallenges(prev => prev.map(challenge => 
        challenge.id === selectedChallenge.id 
          ? { ...challenge, solved: true, attempts: challenge.attempts + 1 }
          : challenge
      ))
      setUserPoints(prev => prev + selectedChallenge.points)
      setUserLevel(prev => Math.floor((prev * 100 + selectedChallenge.points) / 100))
      setUserFlag('')
      setSelectedChallenge(null)
    } else {
      // Wrong flag
      setChallenges(prev => prev.map(challenge => 
        challenge.id === selectedChallenge.id 
          ? { ...challenge, attempts: challenge.attempts + 1 }
          : challenge
      ))
      setUserFlag('')
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-cyber-green'
      case 'medium': return 'text-cyber-yellow'
      case 'hard': return 'text-cyber-orange'
      case 'expert': return 'text-cyber-red'
      default: return 'text-muted-foreground'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Target className="h-4 w-4" />
      case 'crypto': return <Lock className="h-4 w-4" />
      case 'forensics': return <Eye className="h-4 w-4" />
      case 'reverse': return <Code className="h-4 w-4" />
      case 'pwn': return <Zap className="h-4 w-4" />
      case 'misc': return <Database className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getProgressPercentage = (achievement: Achievement) => {
    return (achievement.progress / achievement.maxProgress) * 100
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-cyber font-bold mb-4">
          Security <span className="text-cyber-green">Challenges</span>
        </h2>
        <p className="text-muted-foreground">
          Gamified learning experience with CTF challenges, achievements, and skill progression
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="cyber-card text-center">
          <div className="text-2xl font-bold text-cyber-green">{userPoints}</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
        </div>
        <div className="cyber-card text-center">
          <div className="text-2xl font-bold text-cyber-yellow">Level {userLevel}</div>
          <div className="text-sm text-muted-foreground">Current Level</div>
        </div>
        <div className="cyber-card text-center">
          <div className="text-2xl font-bold text-cyber-blue">
            {challenges.filter(c => c.solved).length}/{challenges.length}
          </div>
          <div className="text-sm text-muted-foreground">Challenges Solved</div>
        </div>
        <div className="cyber-card text-center">
          <div className="text-2xl font-bold text-cyber-purple">
            {achievements.filter(a => a.unlocked).length}/{achievements.length}
          </div>
          <div className="text-sm text-muted-foreground">Achievements</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-cyber-dark p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'challenges'
              ? 'bg-cyber-green text-cyber-dark'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Target className="h-4 w-4 inline mr-2" />
          Challenges
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'achievements'
              ? 'bg-cyber-green text-cyber-dark'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Trophy className="h-4 w-4 inline mr-2" />
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'skills'
              ? 'bg-cyber-green text-cyber-dark'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <TrendingUp className="h-4 w-4 inline mr-2" />
          Skill Tree
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-cyber-green text-cyber-dark'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Leaderboard
        </button>
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'challenges' && (
            <div className="cyber-card">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-cyber-green" />
                Available Challenges
              </h3>
              
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-md border transition-all duration-300 cursor-pointer ${
                      selectedChallenge?.id === challenge.id
                        ? 'border-cyber-green bg-cyber-green/10'
                        : challenge.solved
                        ? 'border-cyber-green bg-cyber-green/5'
                        : 'border-muted hover:border-cyber-green/50'
                    }`}
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {challenge.solved ? (
                          <CheckCircle className="h-5 w-5 text-cyber-green" />
                        ) : (
                          <Target className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <h4 className="font-medium">{challenge.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {getCategoryIcon(challenge.category)}
                            <span className="capitalize">{challenge.category}</span>
                            <span className={`${getDifficultyColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyber-green">{challenge.points} pts</div>
                        <div className="text-xs text-muted-foreground">
                          {challenge.solvedBy} solves
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {challenge.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-cyber-dark border border-cyber-green/30 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Attempts: {challenge.attempts}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="cyber-card">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-cyber-green" />
                Achievements
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-md border transition-all duration-300 ${
                      achievement.unlocked
                        ? 'border-cyber-green bg-cyber-green/10'
                        : 'border-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            achievement.unlocked ? 'bg-cyber-green' : 'bg-cyber-yellow'
                          }`}
                          style={{ width: `${getProgressPercentage(achievement)}%` }}
                        />
                      </div>
                      <div className="text-right text-sm text-cyber-green">
                        +{achievement.points} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="cyber-card">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-cyber-green" />
                Skill Tree
              </h3>
              
              <div className="space-y-6">
                {skillTree.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-4 rounded-md border transition-all duration-300 ${
                      skill.unlocked
                        ? 'border-cyber-green bg-cyber-green/10'
                        : 'border-muted opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyber-green">
                          Level {skill.level}/{skill.maxLevel}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {skill.unlocked ? 'Unlocked' : 'Locked'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{skill.level}/{skill.maxLevel}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            skill.unlocked ? 'bg-cyber-green' : 'bg-muted'
                          }`}
                          style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium mb-2">Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {skill.skills.map((skillName, index) => (
                          <span
                            key={skillName}
                            className={`text-xs px-2 py-1 rounded ${
                              index < skill.level
                                ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {skillName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="cyber-card">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-cyber-green" />
                Leaderboard
              </h3>
              
              <div className="space-y-2">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.username}
                    className={`p-3 rounded-md border transition-all duration-300 ${
                      user.username === 'you'
                        ? 'border-cyber-green bg-cyber-green/10'
                        : 'border-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index < 3 ? 'bg-cyber-yellow text-cyber-dark' : 'bg-muted'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-muted-foreground">
                            Level {user.level} • {user.solved} solved
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-cyber-green">{user.points} pts</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Selected Challenge Details */}
          {selectedChallenge && activeTab === 'challenges' && (
            <div className="cyber-card">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                {getCategoryIcon(selectedChallenge.category)}
                <span className="ml-2">{selectedChallenge.title}</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm mt-1">{selectedChallenge.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Difficulty</label>
                    <div className={`text-sm mt-1 ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                      {selectedChallenge.difficulty.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Points</label>
                    <div className="text-sm mt-1 text-cyber-green">
                      {selectedChallenge.points} pts
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Statistics</label>
                  <div className="text-sm mt-1 space-y-1">
                    <div>Solved by: {selectedChallenge.solvedBy} users</div>
                    <div>Your attempts: {selectedChallenge.attempts}</div>
                    <div>Status: {selectedChallenge.solved ? 'Solved' : 'Unsolved'}</div>
                  </div>
                </div>
                
                {!selectedChallenge.solved && (
                  <div>
                    <label className="text-sm font-medium">Submit Flag</label>
                    <div className="flex space-x-2 mt-2">
                      <input
                        type="text"
                        value={userFlag}
                        onChange={(e) => setUserFlag(e.target.value)}
                        placeholder="flag{...}"
                        className="cyber-input flex-1"
                      />
                      <button
                        onClick={submitFlag}
                        className="cyber-button px-4"
                      >
                        <Flag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium">Hints</label>
                  <div className="space-y-2 mt-2">
                    {selectedChallenge.hints.map((hint, index) => (
                      <div key={index} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                        Hint {index + 1}: {hint}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="cyber-card mt-4">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-cyber-green" />
              Quick Stats
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Challenges</span>
                <span className="text-sm font-medium">{challenges.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Solved</span>
                <span className="text-sm font-medium text-cyber-green">
                  {challenges.filter(c => c.solved).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Success Rate</span>
                <span className="text-sm font-medium">
                  {Math.round((challenges.filter(c => c.solved).length / challenges.length) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Attempts</span>
                <span className="text-sm font-medium">
                  {Math.round(challenges.reduce((sum, c) => sum + c.attempts, 0) / challenges.length)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityChallenges 