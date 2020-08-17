import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-permission-level',
  templateUrl: './permission-level.component.html',
  styleUrls: ['./permission-level.component.scss'],
})
export class PermissionLevelComponent implements OnInit {
  @Input('permissionLevel') permissionLevel: number;
  constructor() {}

  ngOnInit(): void {}
}
