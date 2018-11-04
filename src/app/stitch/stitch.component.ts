import { Component, OnInit, Input, HostListener } from '@angular/core';
import { StitchType } from '../data.service';

@Component({
	selector: 'hana-stitch',
	templateUrl: './stitch.component.html',
	styleUrls: [ './stitch.component.scss' ]
})
export class StitchComponent implements OnInit {
	@Input() stitch: StitchType;

	constructor() {}

	ngOnInit() {}

	@HostListener('click')
	@HostListener('mouseover')
	toggle() {
		// ++this.stitch;
		// if (this.stitch >= StitchType.LAST)
		// this.stitch = StitchType.FIRST;
		if (this.stitch === StitchType.X) this.stitch = StitchType.O;
		else this.stitch = StitchType.X;
	}

	get stitchClass() {
		return StitchType[this.stitch];
	}

	get stitchRendering() {
		switch( this.stitch )
		{
			case StitchType.X: return ' ';
			case StitchType.O: return ' ';
		}
	}
}
