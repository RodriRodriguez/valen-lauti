import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output, signal } from '@angular/core';

import { AudioService } from '../../../../core/services/audio.service';
import { SectionShellComponent } from '../../../../shared/ui/section-shell/section-shell.component';

// Estos dos tiempos tienen que coincidir con el CSS (.scss): primero se ve
// la solapa abrirse en 3D (@keyframes flap-open), recién después arranca
// el fundido de todo el sobre (opacity/transform de :host). Se manejan
// por timer en vez de esperar un transitionend/animationend del DOM
// porque ese evento no es 100% confiable (pestaña en segundo plano,
// prefers-reduced-motion, etc.) — y si nunca llega, el resto del sitio
// (que recién se renderiza cuando este componente emite `opened`) se
// quedaría en blanco para siempre. Con timers, la apertura pasa sí o sí.
const FLAP_ANIMATION_MS = 750;
const GATE_FADE_MS = 700;

/**
 * Portada de entrada: un sobre a pantalla completa sobre el fondo del
 * sendero. Al presionar, la solapa gira en 3D como si realmente se
 * abriera (y arranca la música), y recién después el sobre entero se
 * desvanece para revelar el resto de la invitación debajo.
 */
@Component({
  selector: 'app-envelope-intro',
  standalone: true,
  imports: [SectionShellComponent],
  templateUrl: './envelope-intro.component.html',
  styleUrl: './envelope-intro.component.scss',
})
export class EnvelopeIntroComponent implements OnInit, OnDestroy {
  /** Se emite una vez que el sobre terminó de abrirse y desaparecer. */
  @Output() opened = new EventEmitter<void>();

  protected readonly isOpening = signal(false);
  protected readonly isOpened = signal(false);
  protected readonly isHidden = signal(false);

  @HostBinding('class.is-opened')
  protected get isOpenedClass(): boolean {
    return this.isOpened();
  }

  @HostBinding('class.is-hidden')
  protected get isHiddenClass(): boolean {
    return this.isHidden();
  }

  constructor(private readonly audioService: AudioService) {}

  ngOnInit(): void {
    document.body.classList.add('no-scroll');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }

  protected open(): void {
    if (this.isOpening()) {
      return;
    }
    this.isOpening.set(true);

    // Gesto de click real del usuario: es el momento correcto (y el
    // único confiable) para arrancar audio con autoplay.
    this.audioService.play('/audio/Ed%20Sheeran%20-%20Perfect.mp3');

    setTimeout(() => {
      this.isOpened.set(true);
      document.body.classList.remove('no-scroll');

      setTimeout(() => {
        this.isHidden.set(true);
        this.opened.emit();
      }, GATE_FADE_MS);
    }, FLAP_ANIMATION_MS);
  }
}
