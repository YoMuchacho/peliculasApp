import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, size = '/w500'): string {

    if (!imagen) {
      return './assets/no-image-banner.jpg';
    }

    const imagenUrl = `${ url }/${ size }${ imagen }`;
    return imagenUrl;
  }

}
