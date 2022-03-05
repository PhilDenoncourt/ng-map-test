import { Component } from '@angular/core';
import { GeoDataService } from './geo-data.service';
import { ICountryDataItem } from './interfaces/ICountryDataItem';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public geoDataService: GeoDataService) {
    geoDataService.countryData.subscribe(data => {
      this.countryData = data;
    });
  }

  title = 'ng-map-test';
  
  countryData : ICountryDataItem[]= [];

  addFrance() {
    this.geoDataService.addCountry({Name:"FR", Value: 18000, Lat:48.8566,Long:2.3522});
  }
}
