import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TPalette, StitchType, COLOR_MAP, DataService } from '../data.service';

@Component({
	selector: 'hana-palette',
	templateUrl: './palette.component.html',
	styleUrls: [ './palette.component.scss' ]
})
export class PaletteComponent implements OnInit {
	palette: TPalette = [];
	currentStitchType: StitchType;

	constructor(protected data: DataService) {
		this.data.currentPaletteChanges.subscribe(palette => (this.palette = palette));
		this.data.stitchTypeChanges.subscribe(s => (this.currentStitchType = s));
	}

	ngOnInit() {}

	public backgroundColor(s: StitchType) {
		return COLOR_MAP[s];
	}
	setStitch(value: StitchType) {
		this.data.stitchType = value;
	}
}
