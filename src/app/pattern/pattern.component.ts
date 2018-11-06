import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DataService, TPalette, StitchType } from '../data.service';

@Component({
	selector: 'hana-pattern',
	templateUrl: './pattern.component.html',
	styleUrls: [ './pattern.component.scss' ]
})
export class PatternComponent implements OnInit {
	@Input() patternIndex = 0;

	public pattern = [];
	public palette: TPalette;

	public currentStitchType;

	constructor(protected data: DataService) {
		this.data.currentPaletteChanges.subscribe(val => (this.palette = val));
		this.data.stitchTypeChanges.subscribe(val => (this.currentStitchType = val));
		this.data.patternChanges.subscribe(patterns => (this.pattern = patterns[this.patternIndex]));
	}
	ngOnInit() {}

	handleToggle(rowIndex: number, colIndex: number, newStitch: StitchType) {
		this.data.updatePattern(this.patternIndex, rowIndex, colIndex, newStitch);
	}
}
