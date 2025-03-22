import {AfterViewInit, Component} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'sahri-sahri-store';

  ngAfterViewInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
