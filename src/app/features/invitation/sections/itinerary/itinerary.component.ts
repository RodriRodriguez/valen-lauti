import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';

/**
 * Itinerario del día: línea de tiempo con ícono + hora + descripción por
 * cada momento. El corazón viaja por la línea siguiendo el scroll (0 al
 * entrar al primer ítem, 1 al llegar al último). Sigue directo hacia
 * "location" (misma tarjeta, cambia de color) — por eso no tiene bordes
 * redondeados abajo.
 */
@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss',
})
export class ItineraryComponent implements AfterViewInit, OnDestroy {
  protected readonly items = INVITATION_CONFIG.itinerary.items;

  /** 0 = arriba de la línea, 1 = abajo — posición del corazón. */
  protected readonly heartProgress = signal(0);

  @ViewChild('list') private readonly listRef?: ElementRef<HTMLElement>;

  private rafId: number | null = null;

  ngAfterViewInit(): void {
    this.updateProgress();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onScrollOrResize(): void {
    // rAF-throttled: como mucho un recálculo por frame, no uno por evento.
    if (this.rafId !== null) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updateProgress();
    });
  }

  private updateProgress(): void {
    const el = this.listRef?.nativeElement;
    if (!el) {
      return;
    }
    // El corazón sigue la altura de la ventana: cuando el medio de la
    // pantalla está a la altura del principio de la lista, progress=0;
    // cuando llega al final de la lista, progress=1.
    const rect = el.getBoundingClientRect();
    const reference = window.innerHeight * 0.5;
    const raw = (reference - rect.top) / rect.height;
    this.heartProgress.set(Math.min(1, Math.max(0, raw)));
  }
}
