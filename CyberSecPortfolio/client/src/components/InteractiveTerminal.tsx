import { useState, useEffect, useRef } from 'react'
import { Terminal, ArrowDown } from 'lucide-react'

interface CommandHistory {
  command: string
  output: string
  timestamp: Date
}

interface CommandDefinition {
  name: string
  description: string
  usage: string
  execute: (args: string[]) => string
}

const InteractiveTerminal = () => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentPath, setCurrentPath] = useState('/home/cyber-sec')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands: Record<string, CommandDefinition> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      usage: 'help [command]',
      execute: (args) => {
        if (args.length === 0) {
          return `Available commands:
${Object.keys(commands).map(cmd => `  ${cmd} - ${commands[cmd].description}`).join('\n')}

Type 'help <command>' for detailed usage.`
        }
        const cmd = commands[args[0]]
        return cmd ? `${cmd.name}: ${cmd.description}\nUsage: ${cmd.usage}` : `Command '${args[0]}' not found.`
      }
    },
    clear: {
      name: 'clear',
      description: 'Clear terminal screen',
      usage: 'clear',
      execute: () => {
        setHistory([])
        return ''
      }
    },
    pwd: {
      name: 'pwd',
      description: 'Print working directory',
      usage: 'pwd',
      execute: () => currentPath
    },
    ls: {
      name: 'ls',
      description: 'List directory contents',
      usage: 'ls [options] [path]',
      execute: (args) => {
        const files = [
          { name: 'security_tools/', type: 'dir', size: '4.0K' },
          { name: 'logs/', type: 'dir', size: '2.1M' },
          { name: 'config.json', type: 'file', size: '1.2K' },
          { name: 'scan_results.txt', type: 'file', size: '15K' },
          { name: 'firewall_rules.conf', type: 'file', size: '3.4K' },
          { name: 'backup_2024.tar.gz', type: 'file', size: '45M' }
        ]
        
        if (args.includes('-l')) {
          return `total ${files.length}
${files.map(f => `${f.type === 'dir' ? 'd' : '-'}rw-r--r-- 1 cyber-sec cyber-sec ${f.size.padStart(8)} ${new Date().toLocaleDateString()} ${f.name}`).join('\n')}`
        }
        
        return files.map(f => f.name).join('  ')
      }
    },
    cd: {
      name: 'cd',
      description: 'Change directory',
      usage: 'cd <directory>',
      execute: (args) => {
        if (args.length === 0) {
          setCurrentPath('/home/cyber-sec')
          return ''
        }
        const newPath = args[0] === '..' ? currentPath.split('/').slice(0, -1).join('/') || '/' : `${currentPath}/${args[0]}`
        setCurrentPath(newPath)
        return ''
      }
    },
    whoami: {
      name: 'whoami',
      description: 'Display current user',
      usage: 'whoami',
      execute: () => 'cyber-security-engineer'
    },
    date: {
      name: 'date',
      description: 'Display current date and time',
      usage: 'date',
      execute: () => new Date().toString()
    },
    scan: {
      name: 'scan',
      description: 'Perform security scan',
      usage: 'scan [target] [type]',
      execute: (args) => {
        const target = args[0] || 'localhost'
        const type = args[1] || 'quick'
        
        return `[+] Starting ${type} scan on ${target}...
[+] Scanning ports...
[+] Found 3 open ports:
  - Port 22 (SSH): Open
  - Port 80 (HTTP): Open  
  - Port 443 (HTTPS): Open
[+] Vulnerability assessment:
  - 2 medium vulnerabilities found
  - 1 low vulnerability found
[+] Scan completed in 2.3 seconds`
      }
    },
    firewall: {
      name: 'firewall',
      description: 'Manage firewall rules',
      usage: 'firewall [status|rules|block]',
      execute: (args) => {
        const action = args[0] || 'status'
        
        switch (action) {
          case 'status':
            return `Firewall Status: ACTIVE
Rules loaded: 127
Blocked connections: 45
Allowed connections: 1,234`
          case 'rules':
            return `Firewall Rules:
1. ALLOW 192.168.1.0/24 -> ANY
2. BLOCK 10.0.0.0/8 -> ANY
3. ALLOW ANY -> 443 (HTTPS)
4. BLOCK ANY -> 22 (SSH) from external`
          case 'block':
            const ip = args[1]
            return ip ? `[+] Blocking IP: ${ip}\n[+] Rule added successfully` : 'Usage: firewall block <ip>'
          default:
            return 'Usage: firewall [status|rules|block]'
        }
      }
    },
    encrypt: {
      name: 'encrypt',
      description: 'Encrypt file or text',
      usage: 'encrypt <file|text> [algorithm]',
      execute: (args) => {
        if (args.length === 0) return 'Usage: encrypt <file|text> [algorithm]'
        
        const algorithm = args[1] || 'AES-256'
        return `[+] Encrypting with ${algorithm}...
[+] Key generated: 0x${Math.random().toString(16).substr(2, 32)}
[+] Encryption completed successfully
[+] Output saved to: encrypted_${Date.now()}.bin`
      }
    },
    decrypt: {
      name: 'decrypt',
      description: 'Decrypt file',
      usage: 'decrypt <file> [key]',
      execute: (args) => {
        if (args.length === 0) return 'Usage: decrypt <file> [key]'
        
        return `[+] Decrypting file: ${args[0]}
[+] Using key: 0x${Math.random().toString(16).substr(2, 32)}
[+] Decryption completed successfully
[+] Content: "This is a secret message"`
      }
    },
    ping: {
      name: 'ping',
      description: 'Test network connectivity',
      usage: 'ping <host>',
      execute: (args) => {
        const host = args[0] || 'google.com'
        return `PING ${host} (142.250.185.78) 56(84) bytes of data.
64 bytes from ${host}: icmp_seq=1 time=15.2 ms
64 bytes from ${host}: icmp_seq=2 time=14.8 ms
64 bytes from ${host}: icmp_seq=3 time=15.1 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 14.800/15.033/15.200/0.200 ms`
      }
    },
    top: {
      name: 'top',
      description: 'Show system processes',
      usage: 'top',
      execute: () => {
        const processes = [
          { pid: 1234, user: 'root', cpu: '2.1%', mem: '1.2%', command: 'systemd' },
          { pid: 2345, user: 'cyber-sec', cpu: '15.3%', mem: '8.7%', command: 'security_monitor' },
          { pid: 3456, user: 'cyber-sec', cpu: '3.2%', mem: '2.1%', command: 'firewall_daemon' },
          { pid: 4567, user: 'www-data', cpu: '1.8%', mem: '4.3%', command: 'nginx' },
          { pid: 5678, user: 'cyber-sec', cpu: '0.5%', mem: '1.1%', command: 'log_analyzer' }
        ]
        
        return `top - ${new Date().toLocaleTimeString()}
Tasks: 127 total, 1 running, 126 sleeping, 0 stopped, 0 zombie
%Cpu(s): 23.1 us, 2.1 sy, 0.0 ni, 74.8 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
MiB Mem : 8192.0 total, 2048.0 free, 3072.0 used, 3072.0 buff/cache
MiB Swap: 0.0 total, 0.0 free, 0.0 used. 4096.0 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
${processes.map(p => `${p.pid.toString().padStart(5)} ${p.user.padEnd(9)} 20   0 ${Math.floor(Math.random() * 10000).toString().padStart(7)} ${Math.floor(Math.random() * 1000).toString().padStart(6)} ${Math.floor(Math.random() * 100).toString().padStart(5)} S ${p.cpu.padStart(5)} ${p.mem.padStart(5)} ${Math.floor(Math.random() * 100).toString().padStart(6)} ${p.command}`).join('\n')}`
      }
    }
  }

  const executeCommand = async (command: string) => {
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const [cmd, ...args] = command.trim().split(' ')
    
    if (!cmd) {
      setIsProcessing(false)
      return ''
    }
    
    const commandDef = commands[cmd.toLowerCase()]
    const output = commandDef ? commandDef.execute(args) : `Command '${cmd}' not found. Type 'help' for available commands.`
    
    setIsProcessing(false)
    return output
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const command = input.trim()
    const output = await executeCommand(command)
    
    setHistory(prev => [...prev, {
      command,
      output,
      timestamp: new Date()
    }])
    
    setInput('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex].command)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex].command)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="cyber-card h-96 flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 p-3 border-b border-cyber-green/30">
        <Terminal className="h-4 w-4 text-cyber-green" />
        <span className="text-sm font-mono text-cyber-green">Cyber Security Terminal</span>
        <div className="flex space-x-1 ml-auto">
          <div className="w-3 h-3 bg-cyber-red rounded-full"></div>
          <div className="w-3 h-3 bg-cyber-yellow rounded-full"></div>
          <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 bg-cyber-dark font-mono text-sm overflow-y-auto space-y-1"
      >
        {/* Welcome Message */}
        {history.length === 0 && (
          <div className="text-cyber-green">
            <div>Welcome to Cyber Security Terminal v2.1.0</div>
            <div>Type 'help' for available commands</div>
            <div>Type 'clear' to clear screen</div>
            <div></div>
          </div>
        )}

        {/* Command History */}
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-cyber-green">cyber-sec@terminal:</span>
              <span className="text-cyber-blue">{currentPath}</span>
              <span className="text-cyber-green">$</span>
              <span className="text-white">{entry.command}</span>
            </div>
            {entry.output && (
              <div className="text-cyber-yellow ml-4 whitespace-pre-wrap">
                {entry.output}
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center space-x-2">
          <span className="text-cyber-green">cyber-sec@terminal:</span>
          <span className="text-cyber-blue">{currentPath}</span>
          <span className="text-cyber-green">$</span>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              className="flex-1 bg-transparent text-white outline-none border-none font-mono"
              placeholder={isProcessing ? 'Processing...' : 'Enter command...'}
            />
          </form>
          {isProcessing && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-green"></div>
          )}
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="p-2 border-t border-cyber-green/30 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Commands: {Object.keys(commands).length} available</span>
          <span>History: {history.length} entries</span>
          <span>Press ↑↓ for command history</span>
        </div>
      </div>
    </div>
  )
}

export default InteractiveTerminal 