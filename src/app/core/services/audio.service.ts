import { Injectable, signal } from '@angular/core';

/**
 * Música de fondo de la invitación. Un solo <audio> compartido por toda
 * la app (no por sección), para poder arrancarlo una vez al abrir el
 * sobre y seguir controlándolo (mute/play) desde cualquier lado después.
 */
@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;

  private readonly _isPlaying = signal(false);
  readonly isPlaying = this._isPlaying.asReadonly();

  /**
   * Arranca (o retoma) la pista. Los navegadores bloquean el autoplay sin
   * gesto del usuario, así que esto se llama siempre desde un handler de
   * click real (ej. abrir el sobre) — nunca en ngOnInit.
   */
  play(src: string): void {
    if (!this.audio) {
      this.audio = new Audio(src);
      this.audio.loop = true;
      this.audio.volume = 0.55;
      this.audio.preload = 'auto';
    }

    this.audio
      .play()
      .then(() => this._isPlaying.set(true))
      .catch(() => {
        // Autoplay bloqueado (poco probable tras un click real, pero por
        // las dudas) — queda pausado, el botón de mute lo puede reintentar.
        this._isPlaying.set(false);
      });
  }

  toggle(): void {
    if (!this.audio) {
      return;
    }
    if (this.audio.paused) {
      this.audio
        .play()
        .then(() => this._isPlaying.set(true))
        .catch(() => this._isPlaying.set(false));
    } else {
      this.audio.pause();
      this._isPlaying.set(false);
    }
  }

  pause(): void {
    this.audio?.pause();
    this._isPlaying.set(false);
  }
}
