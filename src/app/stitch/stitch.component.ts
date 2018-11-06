import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { StitchType, DataService } from '../data.service';

@Component({
	selector: 'hana-stitch',
	templateUrl: './stitch.component.html',
	styleUrls: [ './stitch.component.scss' ]
})
export class StitchComponent implements OnInit {
	@Input() stitch: StitchType;
	@Input() currentStitchType: StitchType;

	@Input() dragMode: boolean;
	@Input() palette: StitchType[] = [];

	@Output() stitchToggled: EventEmitter<StitchType> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	@HostListener('mouseover', [ '$event' ])
	public onMouseOver(ev: MouseEvent) {
		if (!this.dragMode) return;
		if (!ev.buttons) return;
		this.stitchToggled.emit(this.currentStitchType);

	}

	@HostListener('click',['$event'])
	public toggle(ev:MouseEvent) {
		// mode: toggle
		let newStitch;
		if (this.stitch === this.currentStitchType)
			newStitch = StitchType.COLOR0;
		else newStitch = this.currentStitchType;

		this.stitchToggled.emit(newStitch);
		// current mode: cycle
		// const index = this.palette.indexOf(this.stitch);
		// this.stitch = this.palette[(index + 1) % this.palette.length];
	}

	get stitchClass() {
		return StitchType[this.stitch];
	}

	get stitchRendering() {
		return ' ';
		// switch (this.stitch) {
		// 	case StitchType.X:
		// 		return ' ';
		// 	case StitchType.O:
		// 		return ' ';
		// }
	}
}
