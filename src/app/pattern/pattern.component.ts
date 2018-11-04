import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'hana-pattern',
	templateUrl: './pattern.component.html',
	styleUrls: [ './pattern.component.scss' ]
})
export class PatternComponent implements OnInit {
	constructor() {}
	@Input() pattern = [];
	ngOnInit() {}
}
