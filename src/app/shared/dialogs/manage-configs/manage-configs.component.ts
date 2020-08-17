import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnerService } from '../../_services/partner/partner.service';
import { Partner } from '../../interfaces/partner';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Configs {
  register_page?: boolean;
  register_plan?: boolean;
  set_configuration_data?: boolean;
  manage_modules?: boolean;
}

@Component({
  selector: 'app-manage-configs',
  templateUrl: './manage-configs.component.html',
  styleUrls: ['./manage-configs.component.scss'],
})
export class ManageConfigsComponent implements OnInit {
  public partnerId;
  public configs: Configs = {};

  constructor(
    private dialog: MatDialogRef<ManageConfigsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private partnerService: PartnerService,
    private snackbar: MatSnackBar
  ) {
    this.partnerId = this.data.partnerId;
    this.getPartnerConfigs();
  }

  ngOnInit(): void {}

  getPartnerConfigs() {
    this.partnerService.getConfigs(this.partnerId).subscribe((res: any) => {
      console.log('configs', res.data.config);
      this.configs = res.data.config;
    });
  }

  changeConfig(e) {
    console.log('changed', e);
    console.log(this.configs);
    this.partnerService
      .changeConfigs(this.partnerId, this.configs)
      .subscribe((res) => {
        this.snackbar.open('Configurações atualizadas com sucesso', 'Fechar');
        this.partnerService.listPartners();
        console.log(res);
      });
  }

  close() {
    this.dialog.close();
  }
}
