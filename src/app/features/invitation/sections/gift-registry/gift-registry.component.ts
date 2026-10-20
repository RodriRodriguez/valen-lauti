import { Component, HostListener, OnDestroy, signal } from '@angular/core';

import { INVITATION_CONFIG } from '../../../../core/config/invitation.config';
import { OrnamentDividerComponent } from '../../../../shared/ui/ornament-divider/ornament-divider.component';

/**
 * Mesa de regalos: una "libreta" con el mensaje y un botón que abre un
 * modal con la lista de ideas — sobre un fondo de paisaje.
 */
@Component({
  selector: 'app-gift-registry',
  standalone: true,
  imports: [OrnamentDividerComponent],
  templateUrl: './gift-registry.component.html',
  styleUrl: './gift-registry.component.scss',
})
export class GiftRegistryComponent implements OnDestroy {
  protected readonly message = INVITATION_CONFIG.giftRegistry.message;
  protected readonly eventNumber = INVITATION_CONFIG.giftRegistry.eventNumber;
  protected readonly storeName = INVITATION_CONFIG.giftRegistry.storeName;
  protected readonly buttonText = INVITATION_CONFIG.giftRegistry.buttonText;
  protected readonly buttonUrl = INVITATION_CONFIG.giftRegistry.buttonUrl;
  protected readonly items = INVITATION_CONFIG.giftRegistry.items;
  protected readonly aliasMessage = INVITATION_CONFIG.giftRegistry.aliasMessage;
  protected readonly alias = INVITATION_CONFIG.giftRegistry.alias;

  protected readonly isModalOpen = signal(false);
  protected readonly aliasCopied = signal(false);
  private copyResetTimer?: ReturnType<typeof setTimeout>;

  // Mismo copiado que el alias de "prices".
  protected async copyAlias(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.alias);
    } catch {
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

  // A diferencia del candado del sobre (envelope-intro), este modal puede
  // abrirse en cualquier posición de scroll — hay que guardarla y
  // restaurarla, no alcanza con fijar el body arriba de todo.
  private scrollYBeforeModal = 0;

  protected openModal(): void {
    this.scrollYBeforeModal = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollYBeforeModal}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    this.isModalOpen.set(true);
  }

  protected closeModal(): void {
    if (!this.isModalOpen()) {
      return;
    }
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    window.scrollTo(0, this.scrollYBeforeModal);
    this.isModalOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    this.closeModal();
  }

  ngOnDestroy(): void {
    // Por si el componente se destruye con el modal todavía abierto — no
    // dejar el body trabado en position:fixed para el resto del sitio.
    this.closeModal();
  }
}
