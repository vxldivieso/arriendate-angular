import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
    <div class="lds-dual-ring"></div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading$= this.spinner.isLoading$;

  constructor(private spinner : SpinnerService) { }

  ngOnInit(): void {
  }

}
