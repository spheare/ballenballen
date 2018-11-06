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

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.patternChanges.subscribe(patterns => (this._patterns = patterns));
	}

	doPrint() {
		window.print();
	}

	addPattern() {
		if(this._patterns.length >= 4)
		{
			alert('nie overdrijve');
			return;
		}
		this.data.addNewPattern({});
	}
	removePattern() {
		this._patterns.pop();
		this.data.patterns = this._patterns;
	}
}
