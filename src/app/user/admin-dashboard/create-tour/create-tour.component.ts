import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-tour',
  providers: [provideNativeDateAdapter()],
  imports: [AngularMaterialModule, FormsModule, CommonModule],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.css',
})
export class CreateTourComponent implements OnInit {
  adminService = inject(AdminService);
  insertingTour = false;
  fileToUpload: any;
  formData = new FormData();
  imageUrl: any;

  checkImgLenght: number = 0;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.adminService.creatingTour.subscribe((res) => {
      this.insertingTour = res;
      if (!res) {
        const dialogRef = this.dialog.open(TourCreatedDialog);

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(`Dialog result: ${result}`);
        });
      }
    });
  }

  handleFileInput(file: FileList) {
    // this.fileToUpload = file.item(0);
    //Show image preview
    // let reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.imageUrl = event.target.result;
    // };
    // reader.readAsDataURL(this.fileToUpload);

    this.checkImgLenght = Object.keys(file).length;

    if (this.checkImgLenght == 4) {
      this.formData.append('images1', file[0], file[0].name);
      this.formData.append('images2', file[1], file[1].name);
      this.formData.append('images3', file[2], file[2].name);
      this.formData.append('images4', file[3], file[3].name);
    }
  }
  submitCreateTour(form: NgForm) {
    this.insertingTour = true;
    this.adminService.tourImageUpload(form, this.formData);
    this.formData = new FormData();
  }
}

@Component({
  selector: 'tour-created-confirm-dialog',
  templateUrl: 'tour-created-confirm-dialog.html',
  imports: [MatDialogModule, AngularMaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourCreatedDialog {}
