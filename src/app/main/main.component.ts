import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../shared/_services/auth/auth.service';
import { PartnerService } from '../shared/_services/partner/partner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ManageConfigsComponent } from '../shared/dialogs/manage-configs/manage-configs.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = [
    'technical_manager',
    'name',
    'config.permissions',
  ];

  public searchText;
  public innerWidth;

  constructor(
    public partnerService: PartnerService,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.partnerService.listPartners();
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  getColor(permissions) {
    switch (permissions) {
      case 0:
        return '#36D945';
      case 1:
        return '#16591D';
      case 2:
        return '#993117';
      case 3:
        return '#D94521';
      case 4:
        return 'blue';
    }
  }

  openMenu() {
    console.log('menu');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
    this.snackbar.open('Logout realizado com sucesso!', 'Fechar', {
      duration: 3000,
    });
  }

  manageConfigs(partner) {
    this.dialog.open(ManageConfigsComponent, {
      data: {
        partnerId: partner._id,
      },
    });
  }
}
