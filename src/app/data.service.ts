import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum StitchType {
	EMPTY = null,
	COLOR0=1,
	COLOR1,
	COLOR2,
	COLOR3,
	COLOR4,
	COLOR5,
	COLOR6,
	COLOR7,
	FIRST = StitchType.COLOR0,
	LAST = StitchType.COLOR1,
}
export type TPalette = StitchType[];

const E = StitchType.EMPTY,
	O = StitchType.COLOR0;

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
	];
	protected _currentPalette$ = new BehaviorSubject<TPalette>(this._currentPalette);

	protected _dragMode: boolean;
	protected _dragMode$ = new BehaviorSubject<boolean>(this._dragMode);

	protected _stitchType: StitchType = StitchType.COLOR1;
	protected _stitchType$ = new BehaviorSubject<StitchType>(this._stitchType);

	public set currentPalette(value: TPalette) {
		this._currentPalette$.next((this._currentPalette = value));
	}
	public set dragMode(value: boolean) {
		this._dragMode$.next((this._dragMode = value));
	}
	public set stitchType(value: StitchType) {
		this._stitchType$.next((this._stitchType = value));
	}

	public get currentPaletteChanges() {
		return this._currentPalette$.asObservable();
	}
	public get dragModeChanges() {
		return this._dragMode$.asObservable();
	}
	public get stitchTypeChanges() {
		return this._stitchType$.asObservable();
	}

	constructor() {}
}
