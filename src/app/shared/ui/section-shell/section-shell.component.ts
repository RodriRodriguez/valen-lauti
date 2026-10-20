import { Component, Input } from '@angular/core';

/**
 * Envoltorio para secciones a pantalla completa: foto de fondo con velo
 * oscuro, alto mínimo = viewport y contenido centrado con padding seguro
 * (notch / home indicator). El contenido se pasa por proyección.
 */
@Component({
  selector: 'app-section-shell',
  standalone: true,
  imports: [],
  templateUrl: './section-shell.component.html',
  styleUrl: './section-shell.component.scss',
})
export class SectionShellComponent {
  /** Ruta (desde /public) de la foto de fondo. */
  @Input({ required: true }) backgroundImage!: string;
}
