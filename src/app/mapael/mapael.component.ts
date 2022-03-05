import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-mapael';
import 'jquery-mapael/js/maps/world_countries';
import { GeoDataService } from '../geo-data.service';
import { ICountryDataItem } from '../interfaces/ICountryDataItem';

@Component({
  selector: 'app-mapael',
  templateUrl: './mapael.component.html',
  styleUrls: ['./mapael.component.scss']
})
export class MapaelComponent implements OnInit {

  constructor(geoDataService:GeoDataService) {
    geoDataService.countryData.subscribe(data => {
      this.mapDataUpdated(data)
    });
  }

  countryData:ICountryDataItem[] = [];
  mapaelInited = false;

  ngOnInit(): void {
    const areaMap = this.countryData.map(country => {
      return { [country.Name]: {
          attrs: {
            fill: country.Value > 1000 ? '#f00' : '#0f0'
          },
          text: country.Value,
          tooltip: {
            content: country.Name + ': ' + country.Value
          }
        }
      }
    });
    const areas = Object.assign({}, ...areaMap);

    const plotMap = this.countryData.map(country => {
      const size = country.Value / 1000;
      return {[country.Name + '_plot']: { text: country.Value, latitude: country.Lat, longitude: country.Long, value: country.Value, size}} 
    });
    const plots = Object.assign({}, ...plotMap);

    (<any>$('.map-container')).mapael({
      map: {
        name: 'world_countries',
      },
      areas: areas,
      plots: plots
    });
    this.mapaelInited = true;
  }

  mapDataUpdated( data: ICountryDataItem[]) {
    this.countryData = data;
    if (this.mapaelInited) {
      const areaMap = data.map(country => {
        return { [country.Name]: {
            attrs: {
              fill: country.Value > 1000 ? '#f00' : '#0f0'
            },
            text: country.Value,
            tooltip: {
              content: country.Name + ': ' + country.Value
            }
          }
        }
      });
      const areas = Object.assign({}, ...areaMap);
      (<any>$('.map-container')).trigger('update', [{
        mapOptions: {
          areas: areas
        }
      }]);
    } 
  }

}
