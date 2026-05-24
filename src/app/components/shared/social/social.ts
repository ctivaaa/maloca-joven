import { Component } from '@angular/core';

interface Red {
  icon: string;
  name: string;
  handle: string;
  url: string;
}

@Component({
  selector: 'app-social',
  imports: [],
  templateUrl: './social.html',
  styleUrl: './social.css',
})
export class Social {
  redes: Red[] = [
    { icon: 'bi-tiktok',    name: 'TikTok',   handle: '@malocajoven', url: 'https://www.tiktok.com/@malocajoven'   },
    { icon: 'bi-facebook',  name: 'Facebook',  handle: 'Maloca Joven', url: 'https://www.facebook.com/malocajoven'  },
    { icon: 'bi-youtube',   name: 'YouTube',   handle: 'Maloca Joven', url: 'https://www.youtube.com/@malocajoven'  },
    { icon: 'bi-twitter-x', name: 'Twitter',   handle: '@malocajoven', url: 'https://twitter.com/malocajoven'       },
  ];
}
