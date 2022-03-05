import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, Subscriber } from 'rxjs';
import { ICountryDataItem } from './interfaces/ICountryDataItem';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {

  constructor() { 
  }

  subscriber!: Subscriber<ICountryDataItem[]>
  
  subject = new Observable<ICountryDataItem[]>(subscriber => {
    subscriber.next(this.countryDataStore);
    this.subscriber = subscriber;
  });

  get countryData() {
    return this.subject;
  }

  countryDataStore : ICountryDataItem[]= [
    {Name:"US", Value: 25000,Lat:38.9072,Long:-77.0369},
    {Name:"CN", Value: 21000,Lat:39.9042,Long:116.4074}, 
    {Name:"BR", Value: 12000,Lat:-15.7801,Long:-47.9292},
    {Name:"AU", Value: 9000,Lat:-25.2744,Long:133.7751},
    {Name:"IN", Value: 15000, Lat:28.6139,Long:77.2090},
    {Name:"ZA", Value: 5000, Lat:-26.2041,Long:28.0473},
  ];
  
  addCountry(country : ICountryDataItem) {
    this.countryDataStore.push(country);
    this.subscriber.next([...this.countryDataStore]);
  }

  updateCountry(country : ICountryDataItem) {
    const index = this.countryDataStore.findIndex(c => c.Name === country.Name);
    this.countryDataStore[index] = country;
    this.subscriber.next([...this.countryDataStore]);
  }
}
