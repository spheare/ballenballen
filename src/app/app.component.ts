import { Component, OnInit } from '@angular/core';
import { StitchType, DataService, TPalette, PATTERN_BLUEPRINT, TPattern } from './data.service';

@Component({
	selector: 'hana-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	protected _patterns = [];
	public drawMode = true;
	protected currentPalette: TPalette;

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.currentPaletteChanges.subscribe(palette => (this.currentPalette = palette));
		this.data.patternChanges.subscribe(patterns => (this._patterns = patterns));
	}

	doPrint() {
		window.print();
	}

	setStitch(value) {
		this.data.stitchType = value;
	}

	addPattern() {
		this.data.addNewPattern({});
	}
	removePattern() {
		this._patterns.pop();
		this.data.patterns = this._patterns;
	}
}
