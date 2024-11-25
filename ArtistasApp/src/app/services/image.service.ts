import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly basePath = '/assets/';

  getImagePath(relativePath: string): string {
    return `${this.basePath}${relativePath}`;
  }
}
