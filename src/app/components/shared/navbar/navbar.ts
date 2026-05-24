import { Component, signal, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  asideIsOpen = signal<boolean>(false);

  handleClick() {
    this.asideIsOpen.update(current => !current);
  }


 scrolled = signal<boolean>(false);
  
  @HostListener("window:scroll",[])
  
  handleScroll(){
    this.scrolled.set(window.scrollY > 50)
  
  }

   conditionalFunction(){
 if (this.asideIsOpen()) {
    this.scrolled.set(false);
   }
   }
  
}
