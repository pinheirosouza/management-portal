import { Component } from '@angular/core';
import { HTTPStatus } from './shared/_services/interceptor/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'management-portal';
  public showProgress: boolean = false;

  constructor(private httpStatus: HTTPStatus) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      if (status) {
        this.showProgress = true;
      } else {
        this.showProgress = false;
      }
    });
  }
}
