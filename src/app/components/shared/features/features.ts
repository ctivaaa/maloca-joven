import { Component, AfterViewInit, OnDestroy } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features implements AfterViewInit, OnDestroy {
  features: Feature[] = [
    {
      icon: 'bi-film',
      title: 'Cine y Video',
      description: 'Producción cinematográfica, documentales y clips musicales con visión territorial.',
    },
    {
      icon: 'bi-camera-fill',
      title: 'Fotografía',
      description: 'Registro de naturaleza, retrato editorial y foto-documentalismo de impacto social.',
    },
    {
      icon: 'bi-mortarboard-fill',
      title: 'Formación',
      description: 'Talleres de cine y fotografía para jóvenes rurales, empoderando nuevas voces.',
    },
    {
      icon: 'bi-bank',
      title: 'Festivales',
      description: 'Gestión de espacios culturales y festivales de cine itinerante en comunidades.',
    },
    {
      icon: 'bi-brush-fill',
      title: 'Diseño y Marca',
      description: 'Branding cultural, ilustración y diseño gráfico con identidad amazónica.',
    },
  ];

  private observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.features [data-reveal]').forEach((el) => {
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
