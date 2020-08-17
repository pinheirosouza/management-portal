import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Partner } from '../../interfaces/partner';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  public url = environment.url;
  public partners: Array<Partner>;

  constructor(private http: HttpClient) {}

  listPartners() {
    let url = this.url + '/rootauth/admin/listpartners';
    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      this.partners = res.data;
      for (let i = 0; i < this.partners.length; i++) {
        let permissions = 0;
        for (
          let j = 0;
          j < Object.entries(this.partners[i].config).length;
          j++
        ) {
          if (Object.entries(this.partners[i].config)[j][1] == true) {
            permissions++;
          }
        }
        this.partners[i].config.permissions = permissions;
      }
    });
  }

  getConfigs(partnerId) {
    let url =
      this.url + '/rootauth/admin/partnerconfigurationdata/' + partnerId;
    return this.http.get(url);
  }

  changeConfigs(partnerId, configObj) {
    let url = this.url + '/rootauth/admin/setconfigurationdata/' + partnerId;
    return this.http.patch(url, configObj);
  }
}
