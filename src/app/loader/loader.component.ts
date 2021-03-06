import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  showText='Loading..';
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  isConnecting: Subject<boolean> = this.loaderService.isConnecting;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

}
