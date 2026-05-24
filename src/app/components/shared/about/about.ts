import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  displayStats = [
    { value: '0+',  label: 'Proyectos', end: 30,  suffix: '+' },
    { value: '0',   label: 'Talleres',  end: 10,  suffix: ''  },
    { value: '0%',  label: 'Local',     end: 100, suffix: '%' },
  ];

  private observer!: IntersectionObserver;
  private countersStarted = false;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            if (
              entry.target.classList.contains('about__stats') &&
              !this.countersStarted
            ) {
              this.countersStarted = true;
              this.animateCounters();
            }

            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.about [data-reveal]').forEach((el) => {
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCounters(): void {
    this.displayStats.forEach((stat, i) => {
      const duration = 1800;
      const steps    = 60;
      const delay    = i * 120;
      let   current  = 0;

      setTimeout(() => {
        const interval = setInterval(() => {
          const progress = current / stat.end;
          const eased    = 1 - Math.pow(1 - progress, 3);
          current        = Math.min(current + stat.end / steps, stat.end);
          this.displayStats[i] = {
            ...this.displayStats[i],
            value: `${Math.round(stat.end * eased)}${stat.suffix}`,
          };
          if (current >= stat.end) {
            this.displayStats[i] = { ...this.displayStats[i], value: `${stat.end}${stat.suffix}` };
            clearInterval(interval);
          }
        }, duration / steps);
      }, delay);
    });
  }
}
