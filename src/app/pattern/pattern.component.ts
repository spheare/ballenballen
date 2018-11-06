import { Component, OnInit, Input, HostListener, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { DataService, TPalette, StitchType } from '../data.service';
import { combineLatest, BehaviorSubject, Subscription } from 'rxjs';

@Component({
	selector: 'hana-pattern',
	templateUrl: './pattern.component.html',
	styleUrls: [ './pattern.component.scss' ]
})
export class PatternComponent implements OnInit, OnDestroy {
	@Input()
	set patternIndex(v) {
		this.patternIndex$.next(v);
	}

	protected _patternIndex = -1;
	protected patternIndex$: BehaviorSubject<number> = new BehaviorSubject(this.patternIndex);
	protected sub: Subscription[] = [];

	public pattern = [];
	public palette: TPalette;

	public currentStitchType;

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.sub.push(
			this.data.currentPaletteChanges.subscribe(val => (this.palette = val)),
			this.data.stitchTypeChanges.subscribe(val => (this.currentStitchType = val)),
			combineLatest(this.data.patternChanges, this.patternIndex$).subscribe(([ patterns, patternIndex ]) => {
				if (this.patternIndex < 0) return;
				this._patternIndex = patternIndex;
				this.pattern = patterns[patternIndex];
			})
		);
	}
	ngOnDestroy(): void {
		this.sub.forEach(s => s.unsubscribe());
	}
	handleToggle(rowIndex: number, colIndex: number, newStitch: StitchType) {
		if (this._patternIndex < 0) return;
		this.data.updatePattern(this._patternIndex, rowIndex, colIndex, newStitch);
	}
}
