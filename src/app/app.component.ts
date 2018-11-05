import { Component, OnInit } from '@angular/core';
import { StitchType, DataService, TPalette, PATTERN_BLUEPRINT } from './data.service';

@Component({
	selector: 'hana-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	patterns = [ this.newPattern() ];
	currentPalette: TPalette;
	dragMode: boolean;

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.currentPaletteChanges.subscribe(palette => (this.currentPalette = palette));
		this.data.dragModeChanges.subscribe(mode => (this.dragMode = mode));
	}

	protected newPattern() {
		return  JSON.parse(JSON.stringify(PATTERN_BLUEPRINT));

	}
	setDragMode(value) {
		this.data.dragMode = value;
	}

	setStitch( value ) {
		this.data.stitchType = value;
	}

	addPattern() {
		this.patterns.push( this.newPattern() );
	}
	removePattern() {
		this.patterns.pop();
	}
}
