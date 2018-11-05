import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DataService, TPalette, StitchType } from '../data.service';

@Component({
	selector: 'hana-pattern',
	templateUrl: './pattern.component.html',
	styleUrls: [ './pattern.component.scss' ]
})
export class PatternComponent implements OnInit {
	@Input() pattern = [];

	public palette: TPalette;
	public dragMode: boolean;
	public currentStitchType;

	constructor(protected data: DataService) {
		this.data.currentPaletteChanges.subscribe(val => (this.palette = val));
		this.data.dragModeChanges.subscribe(val => (this.dragMode = val));
		this.data.stitchTypeChanges.subscribe(val => (this.currentStitchType = val));
	}
	ngOnInit() {}

	handleToggle(rowIndex: number, colIndex: number, newStitch: StitchType) {
		// console.log( rowIndex,colIndex, newStitch);
		this.pattern[rowIndex][colIndex] = newStitch;
	}
}
