import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe',
  standalone: true
})
export class PhonePipePipe implements PipeTransform {

  transform(value: string): string | null {
    if (!value) {
      return null;
    }

    if(value.length > 9) {
      return value.slice(0, 9);
    }

    value = value.replace(/\D/g, '');
    value = value.replace(/[^0-9]/g, '');
    const formattedPhone = value.trim();

    return formattedPhone;
  }
}
