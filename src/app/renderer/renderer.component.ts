import {
	Component,
	OnInit,
	Input,
	ViewChild,
	AfterViewInit,
	ElementRef,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { TPattern, StitchType } from '../data.service';
import * as THREE from 'three';

const COLOR_MAP = {
	[StitchType.COLOR0]: '#123459',
	[StitchType.COLOR1]: '#ff0000',
	[StitchType.COLOR2]: '#0000ff',
	[StitchType.COLOR3]: '#00ff00',
	[StitchType.COLOR4]: '#ffff00',
	[StitchType.COLOR5]: '#808000',
	[StitchType.COLOR6]: '#cccccc',
	[StitchType.COLOR7]: '#000000'
};

@Component({
	selector: 'hana-renderer',
	templateUrl: './renderer.component.html',
	styleUrls: [ './renderer.component.scss' ]
})
export class RendererComponent implements OnInit, AfterViewInit, OnChanges {
	@Input() patterns: TPattern[] = [];
	@Input() width = 256;
	@Input() height = 256;

	@ViewChild('canvas') public canvas: ElementRef<HTMLCanvasElement>;
	@ViewChild('webgl') public webgl;//: ElementRef<HTML>;

	constructor() {}

	ngOnInit() {}
	ngAfterViewInit(): void {
		this.render();
		this.makeScene();
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.canvas.nativeElement.width = this.width;
		this.canvas.nativeElement.height = this.height;
		this.render();
	}

	render() {
		console.log('render');
		const canvas = this.canvas.nativeElement;
		const ctx = canvas.getContext('2d');

		if (!this.patterns) return;

		const PATTERN_REPEAT = 4,
			PATTERN_WIDTH = this.width / PATTERN_REPEAT,
			BLOCK_WIDTH = PATTERN_WIDTH / 16,
			BLOCK_HEIGHT = this.height / 41;

		ctx.clearRect(0, 0, this.width, this.height);

		for (let patIndex = 0; patIndex < PATTERN_REPEAT; ++patIndex) {
			const pattern = this.patterns[patIndex % this.patterns.length];

			for (let rows = 0; rows < pattern.length; ++rows)
				for (let cols = 0; cols < pattern[rows].length; ++cols) {
					const offset = patIndex * PATTERN_WIDTH;
					if (pattern[rows][cols] === StitchType.EMPTY) continue;
					ctx.fillStyle = COLOR_MAP[pattern[rows][cols]];

					ctx.fillRect(offset + cols * BLOCK_WIDTH, rows * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
				}
		}
	}

	makeScene() {
		const canvas = this.canvas.nativeElement;

		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(500, 400);

		this.webgl.nativeElement.appendChild(renderer.domElement);

		var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);

		var texture = new THREE.Texture(canvas);
		var material = new THREE.MeshBasicMaterial({ map: texture });

		var cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 10;
		var render = function() {
			requestAnimationFrame(render);

			cube.rotation.y += 0.01;

			renderer.render(scene, camera);
		};

		render();
	}
}
