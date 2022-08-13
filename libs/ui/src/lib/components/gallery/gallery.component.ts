import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    @Input() images: string[];

    selectedImage: string;

    ngOnInit(): void {
      if (this.hasImages) {
        this.selectedImage = this.images[0];
      }
    }

  public changeSelectedImage(imageUrl: string) {
      this.selectedImage = imageUrl;
  }

  get hasImages() {
      return !!this.images?.length;
  }
}
