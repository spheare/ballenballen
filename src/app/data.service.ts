import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export enum StitchType {
	EMPTY = null,
	COLOR0 = 1,
	COLOR1,
	COLOR2,
	COLOR3,
	COLOR4,
	COLOR5,
	COLOR6,
	COLOR7,
	FIRST = StitchType.COLOR0,
	LAST = StitchType.COLOR7
}

export const COLOR_MAP = {
	[StitchType.EMPTY]: '#FFFFFF',
	[StitchType.COLOR0]: '#FFFFFF',
	[StitchType.COLOR1]: '#ff0000',
	[StitchType.COLOR2]: '#0000ff',
	[StitchType.COLOR3]: '#00ff00',
	[StitchType.COLOR4]: '#ffff00',
	[StitchType.COLOR5]: '#800080',
	[StitchType.COLOR6]: '#cccccc',
	[StitchType.COLOR7]: '#000000'
};

export type TPalette = StitchType[];

export type TPattern = StitchType[][];

const E = StitchType.EMPTY,
	O = StitchType.COLOR0;

//40x16
export const PATTERN_BLUEPRINT = Object.freeze([
	[ E, E, E, E, E, E, O, O, O, E, E, E, E, E, E, E ],
	[ E, E, E, E, E, E, O, O, O, E, E, E, E, E, E, E ],
	[ E, E, E, E, E, E, O, O, O, O, E, E, E, E, E, E ],
	[ E, E, E, E, E, E, O, O, O, O, E, E, E, E, E, E ],
	[ E, E, E, E, E, O, O, O, O, O, O, E, E, E, E, E ],
	[ E, E, E, E, E, O, O, O, O, O, O, E, E, E, E, E ],
	[ E, E, E, E, O, O, O, O, O, O, O, O, E, E, E, E ],
	[ E, E, E, E, O, O, O, O, O, O, O, O, E, E, E, E ],
	[ E, E, E, O, O, O, O, O, O, O, O, O, O, E, E, E ],
	[ E, E, E, O, O, O, O, O, O, O, O, O, O, E, E, E ],
	[ E, E, O, O, O, O, O, O, O, O, O, O, O, O, E, E ],
	[ E, E, O, O, O, O, O, O, O, O, O, O, O, O, E, E ],
	[ E, O, O, O, O, O, O, O, O, O, O, O, O, O, O, E ],
	[ E, O, O, O, O, O, O, O, O, O, O, O, O, O, O, E ],
	//=--
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	[ O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O ],
	//--
	[ E, O, O, O, O, O, O, O, O, O, O, O, O, O, O, E ],
	[ E, O, O, O, O, O, O, O, O, O, O, O, O, O, O, E ],
	[ E, E, O, O, O, O, O, O, O, O, O, O, O, O, E, E ],
	[ E, E, O, O, O, O, O, O, O, O, O, O, O, O, E, E ],
	[ E, E, E, O, O, O, O, O, O, O, O, O, O, E, E, E ],
	[ E, E, E, O, O, O, O, O, O, O, O, O, O, E, E, E ],
	[ E, E, E, E, O, O, O, O, O, O, O, O, E, E, E, E ],
	[ E, E, E, E, O, O, O, O, O, O, O, O, E, E, E, E ],
	[ E, E, E, E, E, O, O, O, O, O, O, E, E, E, E, E ],
	[ E, E, E, E, E, O, O, O, O, O, O, E, E, E, E, E ],
	[ E, E, E, E, E, O, O, O, O, E, E, E, E, E, E, E ],
	[ E, E, E, E, E, O, O, O, O, E, E, E, E, E, E, E ],
	[ E, E, E, E, E, E, O, O, O, E, E, E, E, E, E, E ],
	[ E, E, E, E, E, E, O, O, O, E, E, E, E, E, E, E ]
	//--
]);

@Injectable({
	providedIn: 'root'
})
export class DataService {
	protected _currentPalette: TPalette = [
		StitchType.COLOR0,
		StitchType.COLOR1,
		StitchType.COLOR2,
		StitchType.COLOR3,
		StitchType.COLOR4,
		StitchType.COLOR5,
		StitchType.COLOR6,
		StitchType.COLOR7
	];
	protected _currentPalette$ = new BehaviorSubject<TPalette>(this._currentPalette);

	protected _stitchType: StitchType = StitchType.COLOR1;
	protected _stitchType$ = new BehaviorSubject<StitchType>(this._stitchType);

	protected _patterns: TPattern[] = [];
	protected _patterns$ = new BehaviorSubject<TPattern[]>(this._patterns);

	public set currentPalette(value: TPalette) {
		this._currentPalette$.next((this._currentPalette = value));
	}

	public set stitchType(value: StitchType) {
		this._stitchType$.next((this._stitchType = value));
	}

	public set patterns(value: TPattern[]) {
		this._patterns = JSON.parse(JSON.stringify(value)); // deep copy this
		this._patterns$.next(this._patterns);
	}

	public get currentPaletteChanges() {
		return this._currentPalette$.asObservable();
	}

	public get stitchTypeChanges() {
		return this._stitchType$.asObservable();
	}

	public get patternChanges() {
		return this._patterns$.asObservable();
	}

	updatePattern(patternIndex: number, rowIndex: number, colIndex: number, newStitch: StitchType): any {
		this._patterns[patternIndex][rowIndex][colIndex] = newStitch;
		this._patterns$.next(this._patterns);
	}

	addNewPattern({ random = false, fill = true }): void {
		const pattern = JSON.parse(JSON.stringify(PATTERN_BLUEPRINT)) as TPattern;
		const fillColor = fill ? this._stitchType : StitchType.COLOR0;
		const addPattern = pattern.map((row, index) =>
			row.map(
				col =>
					col !== StitchType.EMPTY
						? random
							? Math.random() < 0.5
								? Math.round(index / pattern.length * (StitchType.LAST - StitchType.FIRST + 1))
								: fillColor
							: fillColor
						: StitchType.EMPTY
			)
		);

		this._patterns.push(addPattern);
		this._patterns$.next(this._patterns);
	}
	constructor() {
		this._patterns$.pipe(debounceTime(1000)).subscribe(data => {
			window.localStorage.setItem('data', JSON.stringify(data));
		});

		try {
			const saved = JSON.parse(window.localStorage.getItem('data'));
			if (saved) {
				this._patterns = saved;
				this._patterns$.next(this._patterns);
			} else this.addNewPattern({ fill: false });
		} catch (ex) {
			this.addNewPattern({ fill: false });
		}
	}
}
