import { Component, OnInit } from '@angular/core';
import { StitchType, DataService, TPalette, PATTERN_BLUEPRINT } from './data.service';

@Component({
	selector: 'hana-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	patterns = [  Object.assign([], PATTERN_BLUEPRINT) ];
	currentPalette: TPalette;
	dragMode: boolean;

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.currentPaletteChanges.subscribe(palette => (this.currentPalette = palette));
		this.data.dragModeChanges.subscribe(mode => (this.dragMode = mode));
	}

	setDragMode(value) {
		this.data.dragMode = value;
	}

	setStitch( value ) {
		this.data.stitchType = value;
	}

	addPattern() {
		this.patterns.push( Object.assign([], PATTERN_BLUEPRINT) );
	}
	removePattern() {
		this.patterns.pop();
	}
}
