import { Component } from '@angular/core';
import { StitchType } from './data.service';

const E = StitchType.EMPTY,
	O = StitchType.O;

const BLUEPRINT = [
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
];

@Component({
	selector: 'hana-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	patterns = [ Object.assign([], BLUEPRINT), Object.assign([], BLUEPRINT) ];
}
