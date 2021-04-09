import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  sugerencias: string[] = [
    'Spiderman',
    'Superman',
    'Eng game',
    'Thor',
    'Raya'
  ];
  peliculas: Pelicula[] = [];
  busqueda = false;

  constructor(private movieService: MoviesService, private modalController: ModalController) {}

  onSearchChange(event){
    const buscar = event.detail.value;
    if (buscar.length === 0){
      this.busqueda = false;
      this.peliculas = [];
      return;
    }

    this.busqueda = true;
    this.movieService.buscarPeliculas(buscar).subscribe( respuesta => {
      this.peliculas = respuesta['results'];
      this.busqueda = false;
    });
  }

  async seeDetails( id: string ){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
