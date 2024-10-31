import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutPipe',
  standalone: true
})
export class RutPipePipe implements PipeTransform {

  transform(value: string): string | null {
    if (!value) {
      return null;
    }

    const rut = value.replace(/[^0-9Kk]/g, '').toUpperCase();

    if (rut.length < 2) {
      return rut;
    }

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    let formattedRut = '';
    for (let i = cuerpo.length; i > 0; i -= 3) {
      formattedRut = `${cuerpo.slice(Math.max(0, i - 3), i)}.${formattedRut}`;
    }

    formattedRut = `${formattedRut.slice(0, -1)}-${dv}`;

    return formattedRut;
  }
}
