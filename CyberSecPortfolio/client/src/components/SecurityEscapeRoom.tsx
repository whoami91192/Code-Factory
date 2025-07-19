import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Eye, Code, Shield, AlertTriangle, CheckCircle, XCircle, Timer, Trophy } from 'lucide-react';

interface Puzzle {
  id: string;
  name: string;
  description: string;
  type: 'password' | 'code' | 'pattern' | 'logic';
  solution: string;
  hints: string[];
  solved: boolean;
  timeLimit?: number;
}

interface Room {
  id: string;
  name: string;
  description: string;
  puzzles: Puzzle[];
  completed: boolean;
  timeSpent: number;
}

const SecurityEscapeRoom: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'room1',
      name: 'Password Cracking Lab',
      description: 'Crack the encrypted passwords using various techniques',
      timeSpent: 0,
      completed: false,
      puzzles: [
        {
          id: 'puzzle1',
          name: 'Hash Cracking',
          description: 'The password hash is: 5f4dcc3b5aa765d61d8327deb882cf99. What is the original password?',
          type: 'password',
          solution: 'password',
          hints: ['This is an MD5 hash', 'Try common passwords', 'Think simple'],
          solved: false
        },
        {
          id: 'puzzle2',
          name: 'Pattern Recognition',
          description: 'Decode the pattern: 1-3-5-7-9-11-13-15-17-19',
          type: 'pattern',
          solution: 'odd',
          hints: ['Look at the numbers', 'What type of sequence is this?', 'Odd numbers'],
          solved: false
        }
      ]
    },
    {
      id: 'room2',
      name: 'Network Security Chamber',
      description: 'Analyze network traffic and identify threats',
      timeSpent: 0,
      completed: false,
      puzzles: [
        {
          id: 'puzzle3',
          name: 'Port Scanner',
          description: 'Which ports are commonly used for SSH, HTTP, and HTTPS? (comma separated)',
          type: 'code',
          solution: '22,80,443',
          hints: ['SSH: 22', 'HTTP: 80', 'HTTPS: 443'],
          solved: false
        },
        {
          id: 'puzzle4',
          name: 'Protocol Analysis',
          description: 'What protocol uses port 53?',
          type: 'logic',
          solution: 'dns',
          hints: ['Think about domain names', 'Name resolution', 'DNS'],
          solved: false
        }
      ]
    },
    {
      id: 'room3',
      name: 'Cryptography Vault',
      description: 'Solve cryptographic challenges to unlock the final door',
      timeSpent: 0,
      completed: false,
      puzzles: [
        {
          id: 'puzzle5',
          name: 'Caesar Cipher',
          description: 'Decrypt: "khoor zruog" (shift: 3)',
          type: 'code',
          solution: 'hello world',
          hints: ['Shift each letter back by 3', 'A becomes X', 'Simple substitution'],
          solved: false
        },
        {
          id: 'puzzle6',
          name: 'Binary Decoder',
          description: 'Convert binary to text: 01001000 01001001',
          type: 'code',
          solution: 'hi',
          hints: ['ASCII encoding', '8 bits per character', 'H = 72, I = 73'],
          solved: false
        }
      ]
    }
  ]);

  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentRoomData = rooms[currentRoom];
  const currentPuzzleData = currentRoomData?.puzzles[currentPuzzle];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
        setRooms(prev => prev.map((room, index) => 
          index === currentRoom ? { ...room, timeSpent: room.timeSpent + 1 } : room
        ));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, currentRoom]);

  const startGame = () => {
    setGameStarted(true);
  };

  const checkAnswer = () => {
    if (!currentPuzzleData) return;

    const isCorrect = userAnswer.toLowerCase().trim() === currentPuzzleData.solution.toLowerCase();
    
    if (isCorrect) {
      // Mark puzzle as solved
      setRooms(prev => prev.map((room, roomIndex) => 
        roomIndex === currentRoom 
          ? {
              ...room,
              puzzles: room.puzzles.map((puzzle, puzzleIndex) => 
                puzzleIndex === currentPuzzle 
                  ? { ...puzzle, solved: true }
                  : puzzle
              )
            }
          : room
      ));

      // Move to next puzzle or room
      if (currentPuzzle < currentRoomData.puzzles.length - 1) {
        setCurrentPuzzle(prev => prev + 1);
      } else {
        // Room completed
        setRooms(prev => prev.map((room, index) => 
          index === currentRoom ? { ...room, completed: true } : room
        ));
        
        if (currentRoom < rooms.length - 1) {
          setCurrentRoom(prev => prev + 1);
          setCurrentPuzzle(0);
        } else {
          // Game completed
          setGameCompleted(true);
        }
      }
      
      setUserAnswer('');
      setShowHint(false);
      setHintIndex(0);
    }
  };

  const showNextHint = () => {
    if (!currentPuzzleData) return;
    
    if (hintIndex < currentPuzzleData.hints.length - 1) {
      setHintIndex(prev => prev + 1);
    }
    setShowHint(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPuzzleIcon = (type: string) => {
    switch (type) {
      case 'password': return <Lock className="h-5 w-5" />;
      case 'code': return <Code className="h-5 w-5" />;
      case 'pattern': return <Eye className="h-5 w-5" />;
      case 'logic': return <Shield className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  if (!gameStarted) {
    return (
      <div className="cyber-card-glow p-8 text-center">
        <h2 className="text-3xl font-cyber font-bold mb-6 text-cyber-primary">
          <Lock className="inline-block mr-3 h-8 w-8" />
          Security Escape Room
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Test your cybersecurity skills by solving puzzles and challenges across three themed rooms. 
          Each room focuses on different aspects of security: password cracking, network analysis, and cryptography.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {rooms.map((room, index) => (
            <div key={room.id} className="cyber-card p-4">
              <h3 className="text-lg font-bold mb-2 text-cyber-secondary">Room {index + 1}</h3>
              <p className="text-sm text-muted-foreground">{room.description}</p>
              <div className="mt-3 text-xs text-cyber-primary">
                {room.puzzles.length} puzzles
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={startGame}
          className="cyber-button text-lg px-8 py-4"
        >
          Start Challenge
        </button>
      </div>
    );
  }

  if (gameCompleted) {
    const totalTime = rooms.reduce((sum, room) => sum + room.timeSpent, 0);
    return (
      <div className="cyber-card-glow p-8 text-center">
        <Trophy className="h-16 w-16 mx-auto mb-6 text-cyber-warning" />
        <h2 className="text-3xl font-cyber font-bold mb-4 text-cyber-secondary">
          Congratulations!
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          You've successfully completed all security challenges!
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="cyber-card p-4">
            <h3 className="text-lg font-bold mb-2">Total Time</h3>
            <div className="text-2xl font-bold text-cyber-primary">
              {formatTime(totalTime)}
            </div>
          </div>
          <div className="cyber-card p-4">
            <h3 className="text-lg font-bold mb-2">Puzzles Solved</h3>
            <div className="text-2xl font-bold text-cyber-secondary">
              {rooms.reduce((sum, room) => sum + room.puzzles.filter(p => p.solved).length, 0)}/6
            </div>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="cyber-button"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="cyber-card-glow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
            {currentRoomData.name}
          </h2>
          <p className="text-muted-foreground">{currentRoomData.description}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 text-cyber-secondary">
            <Timer className="h-5 w-5" />
            <span className="font-mono">{formatTime(gameTime)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Room {currentRoom + 1} of {rooms.length}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-cyber-primary">
            {currentPuzzle + 1} / {currentRoomData.puzzles.length}
          </span>
        </div>
        <div className="w-full bg-cyber-light rounded-full h-2">
          <div 
            className="bg-cyber-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentPuzzle + 1) / currentRoomData.puzzles.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Puzzle */}
      {currentPuzzleData && (
        <div className="space-y-6">
          <div className="cyber-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              {getPuzzleIcon(currentPuzzleData.type)}
              <h3 className="text-xl font-bold">{currentPuzzleData.name}</h3>
              {currentPuzzleData.solved && (
                <CheckCircle className="h-5 w-5 text-cyber-secondary" />
              )}
            </div>
            <p className="text-muted-foreground mb-6">{currentPuzzleData.description}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Answer:</label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  className="cyber-input w-full"
                  placeholder="Enter your answer..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={checkAnswer}
                  className="cyber-button"
                >
                  Submit Answer
                </button>
                <button 
                  onClick={showNextHint}
                  className="cyber-button-outline"
                >
                  Show Hint ({hintIndex + 1}/{currentPuzzleData.hints.length})
                </button>
              </div>
            </div>

            {showHint && currentPuzzleData.hints[hintIndex] && (
              <div className="mt-4 p-4 bg-cyber-warning/10 border border-cyber-warning/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="h-4 w-4 text-cyber-warning" />
                  <span className="font-medium text-cyber-warning">Hint {hintIndex + 1}</span>
                </div>
                <p className="text-sm">{currentPuzzleData.hints[hintIndex]}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Room Progress */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-3 text-cyber-secondary">Room Progress</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {rooms.map((room, index) => (
            <div key={room.id} className="cyber-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Room {index + 1}</span>
                {room.completed ? (
                  <CheckCircle className="h-4 w-4 text-cyber-secondary" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {room.puzzles.filter(p => p.solved).length}/{room.puzzles.length} solved
              </div>
              <div className="w-full bg-cyber-light rounded-full h-1">
                <div 
                  className="bg-cyber-secondary h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(room.puzzles.filter(p => p.solved).length / room.puzzles.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityEscapeRoom; 