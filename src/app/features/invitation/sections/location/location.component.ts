import { Component, OnDestroy, OnInit, signal } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';

const SLIDE_INTERVAL_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Ubicación del evento: nombre + dirección + botón al mapa real, un
 * carrousel de fotos de la pareja enmarcado en encaje y el boceto del
 * lugar abajo. Sigue directo desde "itinerary" (misma tarjeta, cambia de
 * color).
 */
@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent implements OnInit, OnDestroy {
  protected readonly scheduleLabel = INVITATION_CONFIG.location.scheduleLabel;
  protected readonly scheduleTime = INVITATION_CONFIG.location.scheduleTime;
  protected readonly venueName = INVITATION_CONFIG.location.venueName;
  protected readonly address = INVITATION_CONFIG.location.address;
  protected readonly buttonText = INVITATION_CONFIG.location.buttonText;
  protected readonly buttonUrl = INVITATION_CONFIG.location.buttonUrl;
  protected readonly photos = INVITATION_CONFIG.location.photos;

  protected readonly current = signal(0);

  private timerId?: ReturnType<typeof setInterval>;
  private touchStartX: number | null = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  protected goTo(index: number): void {
    const count = this.photos.length;
    this.current.set((index + count) % count);
    // Reinicia el contador para que no salte justo después de tocar.
    this.startAutoplay();
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  protected onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    this.goTo(this.current() + (deltaX < 0 ? 1 : -1));
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    if (this.photos.length < 2) return;
    this.timerId = setInterval(
      () => this.current.update((i) => (i + 1) % this.photos.length),
      SLIDE_INTERVAL_MS,
    );
  }

  private stopAutoplay(): void {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = undefined;
  }
}
