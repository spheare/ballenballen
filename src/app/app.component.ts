import { Component, OnInit } from '@angular/core';
import { StitchType, DataService, TPalette, PATTERN_BLUEPRINT, TPattern } from './data.service';

@Component({
	selector: 'hana-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	patterns = [ this.newPattern(false) ];
	currentPalette: TPalette;
	dragMode: boolean;

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.currentPaletteChanges.subscribe(palette => (this.currentPalette = palette));
		this.data.dragModeChanges.subscribe(mode => (this.dragMode = mode));
	}

	protected newPattern(random: boolean = false) {
		const pattern = JSON.parse(JSON.stringify(PATTERN_BLUEPRINT)) as TPattern;
		return random
			? pattern.map(row =>
					row.map(
						col =>
							col !== StitchType.EMPTY
								? Math.random() < 0.5 ? StitchType.COLOR2 : StitchType.COLOR1
								: StitchType.EMPTY
					)
				)
			: pattern;
	}
	setDragMode(value) {
		this.data.dragMode = value;
	}

	setStitch(value) {
		this.data.stitchType = value;
	}

	addPattern() {
		this.patterns.push(this.newPattern());
	}
	removePattern() {
		this.patterns.pop();
	}
}
