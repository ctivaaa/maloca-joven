import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Hero } from "../../shared/hero/hero";
import { Footer } from "../../shared/footer/footer";
import { Contact } from '../../shared/contact/contact';
import { About } from '../../shared/about/about';
import { Navbar } from '../../shared/navbar/navbar';
import { Features } from '../../shared/features/features';
import { Producciones } from '../../shared/producciones/producciones';
import { Social } from '../../shared/social/social';

@Component({
  selector: 'app-landing-page',
  imports: [Hero, Footer, Contact, About, Navbar, Features, Producciones, Social],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements OnInit, OnDestroy {

  /* ── Scroll progress ── */
  scrollPct = 0;

  /* ── Custom cursor ── */
  cursorX    = -100;
  cursorY    = -100;
  trailX     = -100;
  trailY     = -100;
  isHovering = false;

  private rafId = 0;
  private targetX = -100;
  private targetY = -100;

  ngOnInit(): void {
    this.tickTrail();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  /* Scroll: progress bar + trail lerp */
  @HostListener('window:scroll')
  onScroll(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPct = max > 0 ? window.scrollY / max : 0;
  }

  /* Cursor: track exact position */
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.cursorX  = e.clientX;
    this.cursorY  = e.clientY;
    this.targetX  = e.clientX;
    this.targetY  = e.clientY;
    this.isHovering =
      (e.target as HTMLElement).matches('a, button, [role="button"], .producciones__item');
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    this.cursorX = -100;
    this.cursorY = -100;
  }

  /* Smooth trail via rAF lerp */
  private tickTrail(): void {
    this.rafId = requestAnimationFrame(() => {
      this.trailX += (this.targetX - this.trailX) * 0.12;
      this.trailY += (this.targetY - this.trailY) * 0.12;
      this.tickTrail();
    });
  }
}
