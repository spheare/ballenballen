import { Component, OnInit } from '@angular/core';
import { StitchType, DataService, TPalette, PATTERN_BLUEPRINT, TPattern } from './data.service';

@Component({
	selector: 'hana-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

	protected _patterns = [];

	protected currentPalette: TPalette;

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.currentPaletteChanges.subscribe(palette => (this.currentPalette = palette));
		this.data.patternChanges.subscribe(
				patterns => this._patterns = patterns
		);

	}
drawMode = true;

	doPrint( ) {
		window.print();
	}

	protected newPattern(random: boolean = false) {
		const pattern = JSON.parse(JSON.stringify(PATTERN_BLUEPRINT)) as TPattern;
		return random
			? pattern.map((row, index) =>
					row.map(
						col =>
							col !== StitchType.EMPTY
								? Math.random() < 0.5
									? Math.round(index / pattern.length * (StitchType.LAST - StitchType.FIRST + 1))
									: StitchType.COLOR0
								: StitchType.EMPTY
					)
				)
			: pattern;
	}

	setStitch(value) {
		this.data.stitchType = value;
	}

	addPattern() {
		this._patterns.push(this.newPattern());
		this.data.patterns = this._patterns;
	}
	removePattern() {
		this._patterns.pop();
		this.data.patterns = this._patterns;
	}
}
