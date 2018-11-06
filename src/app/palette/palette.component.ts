import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TPalette, StitchType, COLOR_MAP } from '../data.service';

@Component({
	selector: 'hana-palette',
	templateUrl: './palette.component.html',
	styleUrls: [ './palette.component.scss' ]
})
export class PaletteComponent implements OnInit {
	@Input() palette: TPalette = [];
	@Input() currentStitchType: StitchType;
	@Output() currentStitchTypeChange: EventEmitter<StitchType> = new EventEmitter<StitchType>();

	constructor() {}

	ngOnInit() {}

	public backgroundColor(s: StitchType) {
		return COLOR_MAP[s];
	}
	setStitch(value: StitchType) {
		this.currentStitchTypeChange.emit((this.currentStitchType = value));
	}
}
