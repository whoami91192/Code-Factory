class SoundEffects {
  private static instance: SoundEffects;
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.3;

  private constructor() {
    this.initAudioContext();
  }

  static getInstance(): SoundEffects {
    if (!SoundEffects.instance) {
      SoundEffects.instance = new SoundEffects();
    }
    return SoundEffects.instance;
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      await this.loadSounds();
    } catch (error) {
      // Remove debug logs
    }
  }

  private async loadSounds() {
    if (!this.audioContext) return;

    // Generate simple sounds programmatically
    const sounds = {
      'add-to-cart': this.generateBeep(800, 0.1),
      'remove-from-cart': this.generateBeep(400, 0.1),
      'favorite': this.generateBeep(1200, 0.15),
      'notification': this.generateNotificationSound(),
      'success': this.generateSuccessSound(),
      'error': this.generateErrorSound(),
      'click': this.generateClickSound(),
    };

    for (const [name, audioBuffer] of Object.entries(sounds)) {
      try {
        this.sounds.set(name, audioBuffer);
      } catch (error) {
        // Remove debug logs
      }
    }
  }

  private generateBeep(frequency: number, duration: number): AudioBuffer {
    if (!this.audioContext) return new AudioBuffer({ length: 0, sampleRate: 44100 });

    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      output[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * this.volume;
    }

    return buffer;
  }

  private generateNotificationSound(): AudioBuffer {
    if (!this.audioContext) return new AudioBuffer({ length: 0, sampleRate: 44100 });

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.3;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const frequency = 800 + 400 * Math.sin(2 * Math.PI * 5 * t);
      output[i] = Math.sin(2 * Math.PI * frequency * t) * this.volume * Math.exp(-t * 3);
    }

    return buffer;
  }

  private generateSuccessSound(): AudioBuffer {
    if (!this.audioContext) return new AudioBuffer({ length: 0, sampleRate: 44100 });

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.4;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const frequency = 523.25 + 523.25 * t / duration; // C to C octave
      output[i] = Math.sin(2 * Math.PI * frequency * t) * this.volume * Math.exp(-t * 2);
    }

    return buffer;
  }

  private generateErrorSound(): AudioBuffer {
    if (!this.audioContext) return new AudioBuffer({ length: 0, sampleRate: 44100 });

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.3;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const frequency = 200 - 100 * t / duration;
      output[i] = Math.sin(2 * Math.PI * frequency * t) * this.volume * Math.exp(-t * 4);
    }

    return buffer;
  }

  private generateClickSound(): AudioBuffer {
    if (!this.audioContext) return new AudioBuffer({ length: 0, sampleRate: 44100 });

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.05;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      output[i] = Math.random() * 2 - 1 * this.volume * Math.exp(-t * 50);
    }

    return buffer;
  }

  async playSound(soundName: string): Promise<void> {
    if (!this.enabled || !this.audioContext || !this.sounds.has(soundName)) {
      return;
    }

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const audioBuffer = this.sounds.get(soundName)!;
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.value = this.volume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start(0);
    } catch (error) {
      // Remove debug logs
    }
  }

  // Convenience methods
  async playAddToCart(): Promise<void> {
    await this.playSound('add-to-cart');
  }

  async playRemoveFromCart(): Promise<void> {
    await this.playSound('remove-from-cart');
  }

  async playFavorite(): Promise<void> {
    await this.playSound('favorite');
  }

  async playNotification(): Promise<void> {
    await this.playSound('notification');
  }

  async playSuccess(): Promise<void> {
    await this.playSound('success');
  }

  async playError(): Promise<void> {
    await this.playSound('error');
  }

  async playClick(): Promise<void> {
    await this.playSound('click');
  }

  // Settings
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getVolume(): number {
    return this.volume;
  }
}

export default SoundEffects; 