import { Injectable } from '@angular/core';

export enum StitchType {
	X,
	O,
	FIRST = StitchType.X,
	LAST = StitchType.O,
	EMPTY = null
}

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor() {}
}
