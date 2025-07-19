import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Shield, AlertTriangle, Lightbulb, Book, Zap, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'recommendation' | 'warning' | 'info';
}

interface SecurityRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'application' | 'data' | 'access' | 'compliance';
  action: string;
}

const AISecurityAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Security Assistant. I can help you with security questions, provide recommendations, and guide you through security best practices. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const securityKnowledge = {
    'password': {
      response: 'Strong passwords should be at least 12 characters long, include uppercase and lowercase letters, numbers, and special characters. Consider using a password manager for better security.',
      recommendations: [
        {
          id: 'pass-1',
          title: 'Implement Multi-Factor Authentication',
          description: 'Add an extra layer of security beyond passwords',
          priority: 'high' as const,
          category: 'access' as const,
          action: 'Enable MFA on all critical accounts'
        }
      ]
    },
    'firewall': {
      response: 'Firewalls are essential network security devices that monitor and control incoming and outgoing network traffic. They act as a barrier between trusted and untrusted networks.',
      recommendations: [
        {
          id: 'fw-1',
          title: 'Configure Default Deny Policy',
          description: 'Block all traffic by default and only allow necessary connections',
          priority: 'high' as const,
          category: 'network' as const,
          action: 'Review and update firewall rules'
        }
      ]
    },
    'encryption': {
      response: 'Encryption protects data by converting it into an unreadable format. Use AES-256 for data at rest and TLS 1.3 for data in transit.',
      recommendations: [
        {
          id: 'enc-1',
          title: 'Implement End-to-End Encryption',
          description: 'Ensure data is encrypted throughout its entire lifecycle',
          priority: 'high' as const,
          category: 'data' as const,
          action: 'Audit current encryption standards'
        }
      ]
    },
    'phishing': {
      response: 'Phishing attacks use deceptive emails to steal sensitive information. Always verify sender addresses and never click suspicious links.',
      recommendations: [
        {
          id: 'phish-1',
          title: 'Employee Security Training',
          description: 'Regular training on identifying phishing attempts',
          priority: 'medium' as const,
          category: 'access' as const,
          action: 'Schedule quarterly security awareness training'
        }
      ]
    },
    'malware': {
      response: 'Malware includes viruses, ransomware, and spyware. Use antivirus software, keep systems updated, and practice safe browsing habits.',
      recommendations: [
        {
          id: 'mal-1',
          title: 'Deploy Advanced Endpoint Protection',
          description: 'Use next-generation antivirus with behavioral analysis',
          priority: 'high' as const,
          category: 'application' as const,
          action: 'Evaluate and implement EDR solutions'
        }
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (response: string, recommendations?: SecurityRecommendation[]) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    setIsTyping(false);

    const newMessage: Message = {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);

    if (recommendations && recommendations.length > 0) {
      const recommendationMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Here are some security recommendations based on your question:',
        sender: 'bot',
        timestamp: new Date(),
        type: 'recommendation'
      };
      setMessages(prev => [...prev, recommendationMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input.toLowerCase();
    setInput('');

    // Find relevant response
    let response = 'I understand your question about security. Let me provide some general guidance...';
    let recommendations: SecurityRecommendation[] = [];

    for (const [keyword, data] of Object.entries(securityKnowledge)) {
      if (userInput.includes(keyword)) {
        response = data.response;
        recommendations = data.recommendations;
        break;
      }
    }

    // If no specific match, provide general security advice
    if (response === 'I understand your question about security. Let me provide some general guidance...') {
      response = 'That\'s an interesting security question. Here are some general best practices: Always keep your systems updated, use strong authentication, encrypt sensitive data, and regularly backup your information. Is there a specific security topic you\'d like to learn more about?';
    }

    await simulateTyping(response, recommendations);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-cyber-danger';
      case 'high': return 'text-cyber-warning';
      case 'medium': return 'text-cyber-accent';
      case 'low': return 'text-cyber-secondary';
      default: return 'text-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network': return <Zap className="h-4 w-4" />;
      case 'application': return <Shield className="h-4 w-4" />;
      case 'data': return <Book className="h-4 w-4" />;
      case 'access': return <User className="h-4 w-4" />;
      case 'compliance': return <AlertTriangle className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="cyber-card-glow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
          <Bot className="inline-block mr-2 h-6 w-6" />
          AI Security Assistant
        </h2>
        <div className="text-sm text-cyber-secondary">
          Powered by Advanced AI
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="cyber-card h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-cyber-primary text-background'
                        : 'bg-cyber-light text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-cyber-light text-foreground p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs opacity-70">AI is typing...</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-cyber-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyber-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyber-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyber-primary/20">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about cybersecurity..."
                  className="cyber-input flex-1"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyber-secondary">Quick Topics</h3>
          
          <div className="space-y-3">
            {Object.keys(securityKnowledge).map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setInput(`Tell me about ${topic}`);
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="w-full cyber-card p-3 text-left hover:bg-cyber-light transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-cyber-warning" />
                  <span className="capitalize">{topic}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="cyber-card p-4 mt-6">
            <h4 className="font-bold mb-3 text-cyber-secondary">Security Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use unique passwords for each account</li>
              <li>• Enable two-factor authentication</li>
              <li>• Keep software updated regularly</li>
              <li>• Be cautious with email attachments</li>
              <li>• Use a VPN on public networks</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Recommendations */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Security Recommendations</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(securityKnowledge).flatMap(data => data.recommendations).slice(0, 6).map((rec: SecurityRecommendation) => (
            <div key={rec.id} className="cyber-card p-4">
              <div className="flex items-center space-x-2 mb-2">
                {getCategoryIcon(rec.category)}
                <span className={`text-xs font-bold ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>
              <h4 className="font-bold mb-2">{rec.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              <div className="text-xs text-cyber-primary font-mono">
                Action: {rec.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISecurityAssistant; 