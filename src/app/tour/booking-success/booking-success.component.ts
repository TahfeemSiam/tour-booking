import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { TourService } from '../tour.service';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { TourBooking } from './booking.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-booking-success',
  imports: [NavbarComponent, AngularMaterialModule, RouterModule],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.css',
})
export class BookingSuccessComponent implements OnInit {
  tourService = inject(TourService);
  activatedRoute = inject(ActivatedRoute);
  pdfContent!: {
    content: (
      | {
          // you'll most often use dataURI images on the browser side
          // if no width/height/fit is provided, the original size will be used
          image: string;
          toc?: undefined;
          layout?: undefined;
          table?: undefined;
        }
      | {
          toc: { title: { text: string; style: string } };
          image?: undefined;
          layout?: undefined;
          table?: undefined;
        }
      | {
          layout: string; // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: number;
            widths: (string | number)[];
            body: string[][];
          };
          image?: undefined;
          toc?: undefined;
        }
    )[];
  };
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const tourBooking = new TourBooking(
        Number(params['tourId']),
        params['tourName'],
        Number(params['amount']),
        params['userId']
      );
      console.log(tourBooking);
      this.tourService.storeBooking(tourBooking);

      this.pdfContent = {
        content: [
          {
            image:
              'data:image/png;base64,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',
          },
          {
            toc: {
              title: { text: 'Payment Receipt', style: 'header' },
            },
          },
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', 'auto', 100, '*'],
              body: [
                ['UserId', 'TourId', 'Tourname', 'Price'],
                [
                  `${params['userId']}`,
                  `${params['tourId']}`,
                  `${params['tourName']}`,
                  `$${params['amount']}`,
                ],
              ],
            },
          },
        ],
      };

      this.tourService.sendConfirmationEmail();
    });
  }
  viewPdf() {
    let pdf = pdfMake.createPdf(this.pdfContent);
    pdf.open();
  }
  constructor() {
    (window as any).pdfMake.vfs = pdfFonts.vfs;
  }
}
