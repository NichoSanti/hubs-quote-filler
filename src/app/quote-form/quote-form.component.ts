import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UploadInterface } from '../types/upload.interface';
import { LineItemInterface } from '../types/lineItem.interface';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
})
export class QuoteFormComponent implements OnChanges {
  @Input() uploadData?: UploadInterface;
  lineItemsForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.lineItemsForm = this.fb.group({
      lineItems: this.fb.array([]),
    });

    // Retrives state passed from the router
    const navigation = this.route.snapshot;
    this.uploadData = navigation.data?.['uploadData'] ?? null;
  }

  // runs populateform when data is uploaded
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['uploadData']) {
      this.populateForm();
    }
  }

  get lineItems(): FormArray {
    return this.lineItemsForm.get('lineItems') as FormArray;
  }

  // Logs data to console
  onSubmit() {
    if (this.lineItemsForm.valid) {
      console.log(this.lineItemsForm.value.lineItems);
    }
  }

  // populates form with uploaded data
  private populateForm(): void {
    if (this.uploadData?.lineItems) {
      const lineItemControls = this.uploadData.lineItems.map((item) =>
        this.createLineItemGroup(item)
      );
      this.lineItemsForm.setControl(
        'lineItems',
        this.fb.array(lineItemControls)
      );
    }
  }

  private createLineItemGroup(lineItem: LineItemInterface): FormGroup {
    return this.fb.group({
      partName: [lineItem.partName, Validators.required],
      quantity: [lineItem.quantity, Validators.required],
      technology: [lineItem.technology, Validators.required],
      material: [lineItem.material, Validators.required],
      finish: [lineItem.finish, Validators.required],
      color: [lineItem.color, Validators.required],
      partMarkings: [lineItem.partMarkings, Validators.required],
      generalTolerance: [lineItem.generalTolerance, Validators.required],

      // "||" == if there is not data, use the default provided
      tightestLinearTolerance: [
        // in this case the default is 'No'
        lineItem.tightestLinearTolerance || 'No',
        Validators.required,
      ],
      fits: [lineItem.fits, Validators.required],
      hasThreads: [lineItem.hasThreads || 'No', Validators.required],
      internalCorners: [lineItem.internalCorners, Validators.required],
    });
  }
}
