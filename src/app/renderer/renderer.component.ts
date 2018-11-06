import {
	Component,
	OnInit,
	Input,
	ViewChild,
	AfterViewInit,
	ElementRef,
	OnChanges,
	SimpleChanges,
	OnDestroy
} from '@angular/core';
import { TPattern, StitchType, COLOR_MAP } from '../data.service';

import { EquirectangularReflectionMapping, ImageUtils, Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, PointLight, Color, Mesh, MeshPhongMaterial, CanvasTexture } from 'three';

@Component({
	selector: 'hana-renderer',
	templateUrl: './renderer.component.html',
	styleUrls: [ './renderer.component.scss' ]
})
export class RendererComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
	@Input() patterns: TPattern[] = [];
	@Input() width = 256;
	@Input() height = 256;

	@ViewChild('canvas') public canvas: ElementRef<HTMLCanvasElement>;
	@ViewChild('webgl') public webgl: ElementRef<HTMLCanvasElement>;

	protected hAnimationFrame: number = null;

	protected scene: THREE.Scene;
	protected camera: THREE.Camera;
	protected renderer: THREE.Renderer;
	protected mesh: THREE.Mesh;
	protected bumpMap: THREE.Texture;

	constructor() {}

	ngOnInit() {}
	ngOnDestroy() {
		if (this.hAnimationFrame !== null) cancelAnimationFrame(this.hAnimationFrame);
	}

	ngAfterViewInit(): void {
		this.renderTexture();

		this.bumpMap = ImageUtils.loadTexture('/assets/knitted.jpg', null, tex => {
			// tex.repeat.set(2,2);
			this.makeScene();
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.canvas.nativeElement.width = this.width;
		this.canvas.nativeElement.height = this.height;
		this.renderTexture();
	}

	renderTexture(): HTMLCanvasElement {
		// todo: move canvas to offscreen element
		const canvas = this.canvas.nativeElement;
		// const canvas = document.createElement('canvas');

		const ctx = canvas.getContext('2d');

		if (!this.patterns) return;

		const PATTERN_REPEAT = 2,
			PATTERN_WIDTH = this.width / PATTERN_REPEAT,
			BLOCK_WIDTH = PATTERN_WIDTH / 16,
			BLOCK_HEIGHT = this.height / 41;

		ctx.clearRect(0, 0, this.width, this.height);

		for (let patIndex = 0; patIndex < PATTERN_REPEAT; ++patIndex)
			this.patterns[patIndex % this.patterns.length].forEach((currRow, rowIndex) => {
				// aantal niet null punten in de rij
				const pointCount = currRow.reduce((prev, col) => prev + (col !== StitchType.EMPTY ? 1 : 0), 0);

				// eerste niet null element
				const firstNonZero = currRow.findIndex(col => col !== StitchType.EMPTY);

				// de volledige breedte incl whitespace
				const rowWidth = currRow.length;

				currRow.forEach((col, texX) => {
					const fPercentage = texX / rowWidth;
					const sampleX = Math.floor(firstNonZero + pointCount * fPercentage);
					const drawOffset = patIndex * PATTERN_WIDTH;

					if (currRow[sampleX] === StitchType.EMPTY) return;
					ctx.fillStyle = COLOR_MAP[currRow[sampleX]];
					ctx.fillRect(drawOffset + texX * BLOCK_WIDTH, rowIndex * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
				});
			});

		return canvas;
	}

	makeScene() {
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(50, 500 / 400, 0.1, 1000);

		this.renderer = new WebGLRenderer({
			canvas: this.webgl.nativeElement
		});
		this.renderer.setSize(512, 512);

		const geometry = new SphereGeometry(3, 32, 32);


		const light = new PointLight(new Color('rgb(230,230,230)'), 2.5);
		const light2 = new PointLight(new Color('rgb(255,255,255)'), 4);
		light.position.set(0, -100, 1000);
		light2.position.set(50, 50, 1000);

		// this.scene.add(light);
		this.scene.add(light2);

		this.mesh = new Mesh(geometry);
		this.updateMaterial();

		this.scene.add(this.mesh);

		this.camera.position.z = 10;

		this.updateGLView();
	}

	updateMaterial(): void {
		if (!this.mesh) return;

		const canvas = this.renderTexture();

		const material = new MeshPhongMaterial({
			// color: new THREE.Color('rgb(155,196,30)'),
			// emissive: new THREE.Color('rgb(7,3,5)'),
			// specular: new THREE.Color('rgb(255,113,0)'),

			shininess: 20,
			bumpMap: this.bumpMap,
			map: new CanvasTexture(canvas, EquirectangularReflectionMapping),
			bumpScale: 0.2
		});
		// material.map.repeat.setY(2)
		this.mesh.material = material;
	}

	updateGLView() {
		this.mesh.rotation.y += 0.01;
		this.mesh.rotation.x -= 0.002;
		this.renderer.render(this.scene, this.camera);

		this.hAnimationFrame = requestAnimationFrame(this.updateGLView.bind(this));
	}
}
