import { Component, signal } from '@angular/core';

import { AudioService } from '../../core/services/audio.service';
import { EnvelopeIntroComponent } from './sections/envelope-intro/envelope-intro.component';
import { CoverComponent } from './sections/cover/cover.component';
import { WelcomeComponent } from './sections/welcome/welcome.component';
import { ItineraryComponent } from './sections/itinerary/itinerary.component';
import { LocationComponent } from './sections/location/location.component';
import { PricesComponent } from './sections/prices/prices.component';
import { GiftRegistryComponent } from './sections/gift-registry/gift-registry.component';
import { DressCodeComponent } from './sections/dress-code/dress-code.component';
import { RsvpComponent } from './sections/rsvp/rsvp.component';
import { CountdownClosingComponent } from './sections/countdown-closing/countdown-closing.component';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [
    EnvelopeIntroComponent,
    CoverComponent,
    WelcomeComponent,
    ItineraryComponent,
    LocationComponent,
    PricesComponent,
    GiftRegistryComponent,
    DressCodeComponent,
    RsvpComponent,
    CountdownClosingComponent
  ],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {
  protected readonly isMusicPlaying = this.audioService.isPlaying;

  // El resto de las secciones ni se crean hasta que el sobre confirma que
  // terminó de abrirse — así "Nos casamos" (u otra cosa de más abajo) no
  // tiene forma de asomarse un instante detrás del gate mientras carga.
  protected readonly isEnvelopeOpened = signal(false);

  constructor(private readonly audioService: AudioService) {}

  protected toggleMusic(): void {
    this.audioService.toggle();
  }

  // El botón del sobre en "welcome" ya no oculta/muestra nada — ubicación
  // e itinerario están siempre visibles más abajo — solo lleva el scroll.
  protected scrollToItinerary(): void {
    document.getElementById('itinerary-location')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
