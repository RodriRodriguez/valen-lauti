import { Component, OnDestroy, OnInit, signal } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';

/**
 * Cierre de la invitación: countdown en vivo hasta el inicio real de la
 * boda (INVITATION_CONFIG.weddingDate, 07/03/2027 17:30hs) y el corazón de
 * encaje con los nombres.
 */
@Component({
  selector: 'app-countdown-closing',
  standalone: true,
  imports: [],
  templateUrl: './countdown-closing.component.html',
  styleUrl: './countdown-closing.component.scss',
})
export class CountdownClosingComponent implements OnInit, OnDestroy {

  protected readonly days = signal('00');
  protected readonly hours = signal('00');
  protected readonly minutes = signal('00');
  protected readonly seconds = signal('00');

  private readonly targetTime = INVITATION_CONFIG.weddingDate.getTime();
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateCountdown(): void {
    const diff = Math.max(0, this.targetTime - Date.now());
    const totalSeconds = Math.floor(diff / 1000);

    this.days.set(this.pad(Math.floor(totalSeconds / 86400)));
    this.hours.set(this.pad(Math.floor((totalSeconds % 86400) / 3600)));
    this.minutes.set(this.pad(Math.floor((totalSeconds % 3600) / 60)));
    this.seconds.set(this.pad(totalSeconds % 60));
  }

  private pad(value: number): string {
    return String(value).padStart(2, '0');
  }
}
