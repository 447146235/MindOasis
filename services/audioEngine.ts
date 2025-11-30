import { SoundType } from '../types';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private activeNodes: AudioNode[] = []; // Track all active nodes to stop them cleanely
  private isPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.ctx.createGain();
      this.gainNode.connect(this.ctx.destination);
    }
  }

  private registerNode(node: AudioNode) {
    this.activeNodes.push(node);
  }

  // Create White/Pink Noise Buffer
  private createNoiseBuffer(type: 'white' | 'pink'): AudioBuffer {
    if (!this.ctx) throw new Error("Context not initialized");
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      let b0, b1, b2, b3, b4, b5, b6;
      b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // (roughly) compensate for gain
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  public playShredderSound() {
    this.initCtx();
    if (!this.ctx) return;
    
    const duration = 3.0;
    const buffer = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const gain = this.ctx.createGain();
    
    noise.connect(gain);
    gain.connect(this.ctx.destination);
    
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.8, now + 0.1); 
    gain.gain.linearRampToValueAtTime(0.6, now + duration - 0.5); 
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration); 
    
    noise.start(now);
    noise.stop(now + duration);
  }

  public play(type: SoundType, volume: number = 0.5) {
    this.initCtx();
    if (this.isPlaying) this.stop();
    if (!this.ctx || !this.gainNode) return;

    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.ctx.resume();

    switch (type) {
      case SoundType.RAIN:
        this.playRain();
        break;
      case SoundType.WHITE_NOISE:
        this.playNoise('white');
        break;
      case SoundType.PINK_NOISE:
        this.playNoise('pink');
        break;
      case SoundType.OCEAN:
        this.playOcean();
        break;
      case SoundType.FOREST:
        this.playForest();
        break;
      case SoundType.STREAM:
        this.playStream();
        break;
      case SoundType.BOWL:
        this.playBowl();
        break;
    }

    this.isPlaying = true;
  }

  private playNoise(type: 'white' | 'pink') {
    if (!this.ctx || !this.gainNode) return;
    const buffer = this.createNoiseBuffer(type);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    noise.connect(this.gainNode);
    noise.start();
    this.registerNode(noise);
  }

  private playRain() {
    if (!this.ctx || !this.gainNode) return;
    const buffer = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800; 

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    
    this.registerNode(noise);
    this.registerNode(filter);
  }

  private playOcean() {
    if (!this.ctx || !this.gainNode) return;
    // Brown/Pink noise + LFO modulated Lowpass
    const buffer = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to shape the wave sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.5;

    // LFO to modulate filter frequency (Simulates wave crashing in and out)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15; // Slow wave speed

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 400; // Modulation depth

    // Base filter frequency
    filter.frequency.value = 500;

    // Connect LFO -> Gain -> Filter Frequency
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.gainNode);

    noise.start();
    lfo.start();

    this.registerNode(noise);
    this.registerNode(filter);
    this.registerNode(lfo);
    this.registerNode(lfoGain);
  }

  private playForest() {
    if (!this.ctx || !this.gainNode) return;
    // Wind: Pink noise through Bandpass
    const buffer = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 0.5;

    // Slight modulation for wind variation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.1;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 200;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.gainNode);

    noise.start();
    lfo.start();

    this.registerNode(noise);
    this.registerNode(filter);
    this.registerNode(lfo);
    this.registerNode(lfoGain);
  }

  private playStream() {
    if (!this.ctx || !this.gainNode) return;
    const buffer = this.createNoiseBuffer('pink');
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400; // Static lowpass for steady stream
    
    // Highpass to remove rumble
    const hpFilter = this.ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.value = 200;

    noise.connect(filter);
    filter.connect(hpFilter);
    hpFilter.connect(this.gainNode);
    noise.start();

    this.registerNode(noise);
    this.registerNode(filter);
    this.registerNode(hpFilter);
  }

  private playBowl() {
    if (!this.ctx || !this.gainNode) return;
    // Additive synthesis: Base tone + harmonics with slight detuning
    const freqs = [180, 182, 540]; // Base, Beat, Harmonic
    
    freqs.forEach(f => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      
      const oscGain = this.ctx!.createGain();
      oscGain.gain.value = 0.2; // Lower volume for individual oscs

      osc.connect(oscGain);
      oscGain.connect(this.gainNode!);
      osc.start();
      
      this.registerNode(osc);
      this.registerNode(oscGain);
    });
  }

  public stop() {
    this.activeNodes.forEach(node => {
      try {
        if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
             node.stop();
        }
        node.disconnect();
      } catch(e) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }
}

export const audioEngine = new AudioEngine();