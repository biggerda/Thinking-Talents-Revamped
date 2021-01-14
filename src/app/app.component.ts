import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Thinking Talents | No Way Out';

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
