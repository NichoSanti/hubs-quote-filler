import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { UploadInterface } from '../types/upload.interface';
import { LineItemInterface } from '../types/lineItem.interface';

@Component({
  selector: 'app-quote-display',
  templateUrl: './quote-display.component.html',
  styleUrls: ['./quote-display.component.css'],
})
export class QuoteDisplayComponent implements OnInit {
  @Input() uploadData?: UploadInterface;
  dataSource: MatTableDataSource<LineItemInterface> = new MatTableDataSource();

  displayedColumns: string[] = [
    'partName',
    'quantity',
    'technology',
    'material',
    'finish',
    'color',
    'partMarkings',
    'generalTolerance',
    'tightestLinearTolerance',
    'fits',
    'hasThreads',
    'internalCorners',
    'technicalDrawing',
    'customRequirements',
    'note',
  ];

  ngOnInit() {
    this.dataSource.data = this.uploadData?.lineItems || [];
  }
}
