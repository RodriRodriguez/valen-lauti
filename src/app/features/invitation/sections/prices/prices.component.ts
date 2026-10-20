import { Component, signal } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';
import { OrnamentDividerComponent } from '../../../../shared/ui/ornament-divider/ornament-divider.component';

/**
 * Precios por tramo de fecha (early-bird): va entre ubicación e
 * itinerario (después de la ubicación, para no arrancar hablando de
 * plata). El fondo (fondo.jpg) lo pone el wrapper compartido en
 * invitation.component (.location-prices-itinerary-bg) — misma imagen,
 * sin costuras.
 */
@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [OrnamentDividerComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss',
})
export class PricesComponent {
  protected readonly title = INVITATION_CONFIG.pricing.title;
  protected readonly subtitle = INVITATION_CONFIG.pricing.subtitle;
  protected readonly tiers = INVITATION_CONFIG.pricing.tiers;
  protected readonly notes = INVITATION_CONFIG.pricing.notes;
  protected readonly alias = INVITATION_CONFIG.pricing.alias;

  protected readonly aliasCopied = signal(false);
  private copyResetTimer?: ReturnType<typeof setTimeout>;

  protected async copyAlias(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.alias);
    } catch {
      // Clipboard API puede fallar (permiso denegado, contexto no seguro) —
      // fallback clásico con un textarea invisible + execCommand.
      const textarea = document.createElement('textarea');
      textarea.value = this.alias;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    this.aliasCopied.set(true);
    clearTimeout(this.copyResetTimer);
    this.copyResetTimer = setTimeout(() => this.aliasCopied.set(false), 1800);
  }
}
