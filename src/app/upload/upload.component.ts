import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as Papa from 'papaparse';

import { UploadInterface } from '../types/upload.interface';
import { LineItemInterface } from '../types/lineItem.interface';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  isSubmitted: boolean = false;
  uploadData: UploadInterface = { lineItems: [] };

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed Result:', result);
          const lineItems: LineItemInterface[] = result.data.map(
            (row: any) => ({
              partName: row['Part Name'],
              quantity: row['Quantity'],
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
            })
          );
          this.uploadData.lineItems = lineItems;
          this.isSubmitted = true;

          // sends data and navigates to quote-form
          this.router.navigate(['/quote-form'], {
            state: { data: this.uploadData },
          });

          // Now call the async function to handle the upload

          // this.handleUpload();
        },
        header: true,
      });
    }
  }

  // Separate async function to handle the upload
  async handleUpload(): Promise<void> {
    try {
      const tableName = 'line_items_csv'; // Replace with your actual table name
      const insertedData = await this.supabaseService.uploadData(
        tableName,
        this.uploadData.lineItems
      );
      console.log('Data successfully uploaded to Supabase', insertedData);
      // Handle success scenario (e.g., show success message to user)
    } catch (error) {
      console.error('Error uploading data to Supabase', error);
      // Handle error scenario (e.g., show error message to user)
    }
  }
}
