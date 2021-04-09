import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];
  peliculasId: string[] = [];
  dataBaseObject: SQLiteObject;

  constructor(private dataBase: SQLite, private platform: Platform) { this.crearDataBase(); }

  crearDataBase(){
    this.platform.ready().then(() => {
      this.dataBase.create({
        name: 'data.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS peliculas (id REAL)', [])
          .then()
          .catch();
        this.dataBaseObject = db;
      })
        .catch();
    });
  }

  guardarPelicula(id: string){
    this.consultarPeliculas(this.dataBaseObject);
    const id_ = [id];

    this.buscarId(id);

    return this.dataBaseObject.executeSql('INSERT INTO peliculas (id) VALUES (?)', id_)
    .then( data => {
      this.consultarPeliculas(this.dataBaseObject);
    });
  }

  consultarPeliculas(sqlObject: SQLiteObject) {
    this.peliculasId = [];
    return sqlObject.executeSql('SELECT * FROM peliculas ORDER BY id ASC', []).then((r) => {
      if (r.rows.length > 0) {
        for (let i = 0; i < r.rows.length; i++) {
          this.peliculasId.push( r.rows.item(i).id );
        }
      }
    });
  }

  buscarId(id) {
    const idLocal = this.peliculasId.find(elemnt => elemnt === id);
    console.log(id);
    console.log(idLocal);
  }
}
