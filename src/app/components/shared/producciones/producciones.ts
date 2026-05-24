import { Component, AfterViewInit, OnDestroy } from '@angular/core';

type Category = 'todo' | 'cine' | 'foto' | 'formacion' | 'festival';

interface Produccion {
  title: string;
  category: Exclude<Category, 'todo'>;
  src: string;
  size: 'large' | 'small';
}

@Component({
  selector: 'app-producciones',
  imports: [],
  templateUrl: './producciones.html',
  styleUrl: './producciones.css',
})
export class Producciones implements AfterViewInit, OnDestroy {
  filters: { key: Category; label: string }[] = [
    { key: 'todo',      label: 'Todo'      },
    { key: 'cine',      label: 'Cine'      },
    { key: 'foto',      label: 'Foto'      },
    { key: 'formacion', label: 'Formación' },
    { key: 'festival',  label: 'Festival'  },
  ];

  activeFilter: Category = 'todo';
  filterVersion = 0;
  isTransitioning = false;

  producciones: Produccion[] = [
    { title: 'Cine Territorial',     category: 'cine',      src: 'prod-1.jpg', size: 'large' },
    { title: 'Escuela de Cine',      category: 'formacion', src: 'prod-2.jpg', size: 'small' },
    { title: 'Cine al Parque',       category: 'festival',  src: 'prod-3.jpg', size: 'small' },
    { title: 'Retrato Humano',       category: 'foto',      src: 'prod-4.jpg', size: 'large' },
    { title: 'Documental Amazónico', category: 'cine',      src: 'prod-5.jpg', size: 'small' },
    { title: 'Taller de Imagen',     category: 'formacion', src: 'prod-6.jpg', size: 'small' },
  ];

  get filteredProducciones(): Produccion[] {
    if (this.activeFilter === 'todo') return this.producciones;
    return this.producciones.filter(p => p.category === this.activeFilter);
  }

  setFilter(key: Category): void {
    if (key === this.activeFilter || this.isTransitioning) return;
    this.isTransitioning = true;
    setTimeout(() => {
      this.activeFilter = key;
      this.filterVersion++;
      this.isTransitioning = false;
    }, 220);
  }

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
      { threshold: 0.1 }
    );

    document.querySelectorAll('.producciones [data-reveal]').forEach((el) => {
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
