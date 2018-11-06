import { Component, OnInit, Input, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';
import { StitchType, DataService, COLOR_MAP } from '../data.service';

@Component({
	selector: 'hana-stitch',
	templateUrl: './stitch.component.html',
	styleUrls: [ './stitch.component.scss' ]
})
export class StitchComponent implements OnInit {
	@Input() stitch: StitchType;
	@Input() currentStitchType: StitchType;

	@Input() palette: StitchType[] = [];

	@Output() stitchToggled: EventEmitter<StitchType> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	@HostListener('mouseover', [ '$event' ])
	public onMouseOver(ev: MouseEvent) {
		if (!ev.buttons) return;
		this.stitchToggled.emit(this.currentStitchType);
	}

	@HostListener('click', [ '$event' ])
	public toggle(ev: MouseEvent) {
		// mode: toggle
		let newStitch;
		if (this.stitch === this.currentStitchType) newStitch = StitchType.COLOR0;
		else newStitch = this.currentStitchType;

		this.stitchToggled.emit(newStitch);
		// current mode: cycle
		// const index = this.palette.indexOf(this.stitch);
		// this.stitch = this.palette[(index + 1) % this.palette.length];
	}

	@HostBinding('style.background-color')
	public get backgroundColor() {
		return COLOR_MAP[this.stitch];
	}

	get stitchRendering() {
		// return '·';
		const SYMBOL_MAP = {
			[StitchType.COLOR0]:'x',
			[StitchType.COLOR1]:'*',
			[StitchType.COLOR2]:'#',
			[StitchType.COLOR3]:'—',
			[StitchType.COLOR4]:'±',
			[StitchType.COLOR5]:'†',
			[StitchType.COLOR6]:'‡',
			[StitchType.COLOR7]:'§'
		};
		return SYMBOL_MAP[ this.stitch ];

	}
}
