import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { PeliculaDetalle, Respuesta, RespuestaCredits } from '../interfaces/interfaces';

const url = environment.url;
const apikey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private httpClient: HttpClient) { }

  getEstrenos(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1 ;

    let mesString = '';
    if (mes < 10 ){
      mesString = '0' + mes;
    } else {
      mesString = String(mes);
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const final = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    const query = `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${final}`;
    return this.httpClient.get<Respuesta>(`${url}${query}&api_key=${ apikey }&language=es&include_image_language=es`);
  }

  getPopulares(){
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.httpClient.get<Respuesta>(`${url}${query}&api_key=${apikey}&language=es&include_image_language=es`);
  }

  getPeliculaDetalle(id: string){
    const query = `/movie/${id}?a=1`;
    return this.httpClient.get<PeliculaDetalle>(`${url}${query}&api_key=${apikey}&language=es&include_image_language=es`);
  }

  getPeliculaActores(id: string){
    const query = `/movie/${id}/credits?a=1`;
    return this.httpClient.get<RespuestaCredits>(`${url}${query}&api_key=${apikey}&language=es&include_image_language=es`);
  }

  buscarPeliculas(buscar: string){
    const query = `/search/movie?query=${buscar}`;
    return this.httpClient.get<RespuestaCredits>(`${url}${query}&api_key=${apikey}&language=es&include_image_language=es`);
  }
}
