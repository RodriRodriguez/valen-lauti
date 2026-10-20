import { Component, EventEmitter, Output } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';
import { OrnamentDividerComponent } from '../../../../shared/ui/ornament-divider/ornament-divider.component';

/**
 * Bienvenida: saludo + párrafo, y una escena decorativa (sobre + flor +
 * calendario + lacre) que invita a revisar el itinerario.
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [OrnamentDividerComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  protected readonly greeting = INVITATION_CONFIG.welcome.greeting;
  protected readonly message = INVITATION_CONFIG.welcome.message;
  protected readonly verse = INVITATION_CONFIG.welcome.verse;
  protected readonly verseReference = INVITATION_CONFIG.welcome.verseReference;

  // El itinerario+mapa ya están siempre visibles más abajo en la página;
  // este botón solo lleva el scroll hasta ahí (lo decide el padre).
  @Output() itineraryRequested = new EventEmitter<void>();
}
