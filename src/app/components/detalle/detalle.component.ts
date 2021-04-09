import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  ocultar = 150;

  options = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor( private movieService: MoviesService, private modalController: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.movieService.getPeliculaDetalle(this.id).subscribe( respuesta => {
      this.pelicula = respuesta;
    });

    this.movieService.getPeliculaActores(this.id).subscribe( respuesta => {
      this.actores = respuesta.cast;
    });
  }

  regresar(){
    this.modalController.dismiss();
  }

  favorito(pelicula){
    this.dataLocal.guardarPelicula(pelicula.id);
  }
}
