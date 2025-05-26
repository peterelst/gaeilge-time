const { getIrishTimePhrase } = require('gaeilge-time');
import { getEnglishTimePhrase, getLiteralTranslation } from './literal.js';
import '../css/main.css';

class AudioPlayer {
  constructor() {
    this.currentAudio = null;
    this.lastAudioFile = null;
    this.isRepeating = false;
    this.playbackSpeed = 0.8;
  }

  getAudioFileName() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    if (hours >= 12) hours -= 12;
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hoursStr}_${minutesStr}.mp3`;
  }

  setPlaybackSpeed(speed) {
    this.playbackSpeed = speed;
    if (this.currentAudio) {
      this.currentAudio.playbackRate = parseFloat(speed);
    }
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }

  async play(audioFile) {
    this.stop();
    this.isRepeating = false;
    this.currentAudio = new Audio(`audio/${audioFile}`);
    this.currentAudio.playbackRate = parseFloat(this.playbackSpeed);
    this.lastAudioFile = audioFile;

    this.currentAudio.addEventListener('error', (e) => {
      console.error('Audio error for file:', audioFile, e);
      console.error('Error details:', {
        code: e.target.error?.code,
        message: e.target.error?.message,
        src: e.target.src
      });
    });

    try {
      this.currentAudio.currentTime = 0;
      await this.currentAudio.play();
      return true;
    } catch (error) {
      console.error('Audio play error for file:', audioFile, error);
      return false;
    }
  }

  isPlaying() {
    return this.currentAudio && !this.currentAudio.paused;
  }

  getCurrentFile() {
    return this.lastAudioFile;
  }
}

class App {
  constructor() {
    this.timeEl = document.getElementById('time');
    this.translationEl = document.querySelector('.translation');
    this.timeWordsEl = document.querySelector('.time-words');
    this.settingsIcon = document.getElementById('settings-icon');
    this.settingsPanel = document.getElementById('settings-panel');
    this.showTranslationToggle = document.getElementById('show-translation');
    this.autoplayToggle = document.getElementById('autoplay-audio');
    this.speedSlider = document.getElementById('speed-slider');
    this.speedValue = document.getElementById('speed-value');
    this.playIcon = document.getElementById('play-icon');
    this.hasClickedOnce = false;
    this.isEnglishText = true;
    this.settings = {
      showTranslation: localStorage.getItem('showTranslation') !== 'false',
      autoplayAudio: localStorage.getItem('autoplayAudio') === 'true',
      playbackSpeed: localStorage.getItem('playbackSpeed') || '0.8'
    };
    this.initializeApp();
  }

  async initializeApp() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
      this.autoplayToggle.disabled = true;
      this.autoplayToggle.checked = false;
      this.settings.autoplayAudio = false;
      localStorage.setItem('autoplayAudio', 'false');
    } else {
      this.autoplayToggle.disabled = true;
      this.addAutoplayCheckOnUserInteraction();
    }

    this.showTranslationToggle.checked = this.settings.showTranslation;
    this.autoplayToggle.checked = this.settings.autoplayAudio;
    this.speedSlider.value = this.settings.playbackSpeed;
    this.speedValue.textContent = this.settings.playbackSpeed + 'x';
    this.updateTranslationVisibility();
    this.setupEventListeners();
    this.update();
    setInterval(() => this.update(), 1000);
    document.getElementById('play-icon').classList.remove('hidden');
    document.getElementById('settings-icon').classList.remove('hidden');
  }

  addAutoplayCheckOnUserInteraction() {
    const handler = async () => {
      await this.checkAutoplaySupport();
      window.removeEventListener('click', handler, true);
    };
    window.addEventListener('click', handler, true);
  }

  async checkAutoplaySupport() {
    try {
      const audio = new Audio('audio/silence.mp3');
      audio.volume = 0;

      audio.addEventListener('error', (e) => {
        console.error('Autoplay check audio error for silence.mp3:', e);
        console.error('Error details:', {
          code: e.target.error?.code,
          message: e.target.error?.message,
          src: e.target.src
        });
      });

      await audio.play();
      audio.pause();
      this.autoplayToggle.disabled = false;
    } catch (err) {
      console.error('Autoplay check failed:', err);
      this.autoplayToggle.disabled = true;
      this.autoplayToggle.checked = false;
      this.settings.autoplayAudio = false;
      localStorage.setItem('autoplayAudio', 'false');
    }
  }

  setupEventListeners() {
    this.settingsIcon.addEventListener('click', () => {
      this.settingsPanel.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!this.settingsPanel.contains(e.target) && e.target !== this.settingsIcon) {
        this.settingsPanel.classList.remove('open');
      }
    });

    this.showTranslationToggle.addEventListener('change', (e) => {
      this.settings.showTranslation = e.target.checked;
      localStorage.setItem('showTranslation', this.settings.showTranslation);
      this.updateTranslationVisibility();
    });

    this.autoplayToggle.addEventListener('change', (e) => {
      this.settings.autoplayAudio = e.target.checked;
      localStorage.setItem('autoplayAudio', this.settings.autoplayAudio);
      if (this.settings.autoplayAudio) {
        this.hasClickedOnce = true;
        this.playTimeAudio();
      }
    });

    this.speedSlider.addEventListener('input', (e) => {
      this.settings.playbackSpeed = e.target.value;
      this.speedValue.textContent = this.settings.playbackSpeed + 'x';
      localStorage.setItem('playbackSpeed', this.settings.playbackSpeed);
      audioPlayer.setPlaybackSpeed(this.settings.playbackSpeed);
    });

    this.playIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hasClickedOnce = true;
      this.playTimeAudio();
    });

    this.timeEl.addEventListener('click', () => {
      this.hasClickedOnce = true;
      this.playTimeAudio();
    });
  }

  updateTranslationVisibility() {
    this.translationEl.style.display = this.settings.showTranslation ? 'block' : 'none';
    this.timeWordsEl.style.display = 'none';
  }

  togglePlayIcon(state) {
    if (state === 'play') {
      this.playIcon.src = 'images/play-icon.svg';
      audioPlayer.isRepeating = false;
    } else if (state === 'repeat') {
      this.playIcon.src = 'images/repeat-icon.svg';
      audioPlayer.isRepeating = true;
    }
  }

  async playTimeAudio() {
    const audioFile = audioPlayer.getAudioFileName();
    const success = await audioPlayer.play(audioFile);
    if (success) {
      this.togglePlayIcon('repeat');
    } else {
      this.togglePlayIcon('play');
    }
  }

  update() {
    const now = new Date();
    let irishPhrase = getIrishTimePhrase(now);
    const literalTranslation = getLiteralTranslation(now);

    const currentAudioFile = audioPlayer.getAudioFileName();
    if (currentAudioFile !== audioPlayer.getCurrentFile()) {
      this.togglePlayIcon('play');
    }

    this.timeEl.textContent = irishPhrase;
    this.translationEl.innerHTML = `<span class="literal-label">Literal: </span>${literalTranslation}`;
    document.title = `Gaeilge Time - ${irishPhrase} 💚`;

    if (this.settings.autoplayAudio && this.hasClickedOnce) {
      if (currentAudioFile !== audioPlayer.getCurrentFile()) {
        this.playTimeAudio();
      }
    }
  }
}

const audioPlayer = new AudioPlayer();

window.appInstance = null;
document.addEventListener('DOMContentLoaded', () => {
  window.appInstance = new App();

  const ANIMATION_DURATION = 90;
  const BG_KEY = 'backgroundAnimProgress';
  let startTimestamp = null;
  let offset = 0;
  const saved = localStorage.getItem(BG_KEY);
  if (saved) {
    offset = parseFloat(saved) || 0;
  }

  (function setInitialBgPosition() {
    const elapsed = offset % ANIMATION_DURATION;
    const angle = (elapsed / ANIMATION_DURATION) * 2 * Math.PI;
    const x = 50 + 50 * Math.cos(angle);
    const y = 50 + 50 * Math.sin(angle);
    document.body.style.backgroundPosition = `${x}% ${y}%`;
    document.documentElement.style.backgroundPosition = `${x}% ${y}%`;
  })();

  function animateBackground(ts) {
    if (!startTimestamp) startTimestamp = ts;
    const elapsed = ((ts - startTimestamp) / 1000 + offset) % ANIMATION_DURATION;
    const angle = (elapsed / ANIMATION_DURATION) * 2 * Math.PI;
    const x = 50 + 50 * Math.cos(angle);
    const y = 50 + 50 * Math.sin(angle);
    document.body.style.backgroundPosition = `${x}% ${y}%`;
    document.documentElement.style.backgroundPosition = `${x}% ${y}%`;
    if (Math.floor(elapsed) !== Math.floor((elapsed - 1))) {
      localStorage.setItem(BG_KEY, elapsed.toString());
    }
    requestAnimationFrame(animateBackground);
  }

  requestAnimationFrame(animateBackground);

  window.addEventListener('beforeunload', () => {
    if (startTimestamp) {
      const now = performance.now();
      const elapsed = ((now - startTimestamp) / 1000 + offset) % ANIMATION_DURATION;
      localStorage.setItem(BG_KEY, elapsed.toString());
    }
  });
});
