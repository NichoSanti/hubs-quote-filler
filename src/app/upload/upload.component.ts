import { Component } from '@angular/core';
import * as Papa from 'papaparse';

import { UploadInterface } from '../types/upload.interface';
import { LineItemInterface } from '../types/lineItem.interface';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  isSubmitted: boolean = false;
  uploadData: UploadInterface = { lineItems: [] };

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed Result:', result);
          const lineItems: LineItemInterface[] = result.data.map(
            (row: any) => ({
              partName: row['Part Name'],
              quantity: Number(row['Quantity']),
              technology: row['Technology'],
              material: row['Material'],
              finish: row['Finish'],
              color: row['Color'],
              partMarkings: row['Part markings'],
              generalTolerance: row['General tolerance'],
              tightestLinearTolerance: row['Tightest linear tolerance'],
              fits: row['Fits'],
              hasThreads: row['Has threads'],
              internalCorners: row['Internal corners'],
              technicalDrawing: row['Technical drawing'],
              customRequirements: row['Custom requirements'],
              note: row['Note'],
            })
          );
          this.uploadData.lineItems = lineItems;
          this.isSubmitted = true;
        },
        header: true,
      });
    }
  }
}
