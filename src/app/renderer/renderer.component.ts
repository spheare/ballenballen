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
import { TPattern, StitchType, COLOR_MAP, DataService } from '../data.service';

import {
	EquirectangularReflectionMapping,
	ImageUtils,
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	SphereGeometry,
	PointLight,
	Color,
	Mesh,
	MeshPhongMaterial,
	CanvasTexture,
	Wrapping,
	RepeatWrapping,
	MeshBasicMaterial
} from 'three';

@Component({
	selector: 'hana-renderer',
	templateUrl: './renderer.component.html',
	styleUrls: [ './renderer.component.scss' ]
})
export class RendererComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
	@Input() width = 256;
	@Input() height = 256;

	public rotationX = 0;

	// @ViewChild('canvas')	public canvas: ElementRef<HTMLCanvasElement>;
	@ViewChild('webgl') public webgl: ElementRef<HTMLCanvasElement>;

	protected hAnimationFrame: number = null;

	protected scene: THREE.Scene;
	protected camera: THREE.Camera;
	protected renderer: THREE.Renderer;
	protected mesh: THREE.Mesh;
	protected bumpMap: THREE.Texture;
	protected patterns: TPattern[] = [];

	constructor(protected data: DataService) {}

	ngOnInit() {
		this.data.patternChanges.subscribe(patterns => {
			this.patterns = patterns;
			this.updateMaterial();
		});
	}
	ngOnDestroy() {
		if (this.hAnimationFrame !== null) cancelAnimationFrame(this.hAnimationFrame);
	}

	ngAfterViewInit(): void {
		this.renderTexture();

		this.bumpMap = ImageUtils.loadTexture('/assets/knitted.jpg', null, tex => {
			this.makeScene();
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.webgl.nativeElement.width = this.width;
		this.webgl.nativeElement.height = this.height;
		this.updateMaterial();
	}

	renderTexture(): HTMLCanvasElement {
		// todo: move canvas to offscreen element
		const canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;

		const ctx = canvas.getContext('2d');

		if (!this.patterns||!this.patterns.length) return;

		const PATTERN_REPEAT = 4,
			PATTERN_WIDTH = this.width / PATTERN_REPEAT,
			BLOCK_WIDTH = PATTERN_WIDTH / 16, // 16 steken
			BLOCK_HEIGHT = this.height / 41; // 41 rijen

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
		this.renderer = new WebGLRenderer({
			canvas: this.webgl.nativeElement
		});

		this.scene = new Scene();
		this.camera = new PerspectiveCamera(50, 500 / 400, 0.1, 1000);

		this.renderer.setSize(this.width, this.height);

		const geometry = new SphereGeometry(3, 32, 32);

		const light = new PointLight(new Color('rgb(230,230,230)'), 1);
		light.position.set(-100, 150, 150);

		this.scene.add(light);

		this.mesh = new Mesh(geometry);
		this.updateMaterial();

		this.scene.add(this.mesh);

		this.camera.position.z = 10;

		this.updateGLView();
	}

	updateMaterial(): void {
		if (!this.mesh) return;

		const canvas = this.renderTexture();
		const map = canvas?
			 new CanvasTexture(canvas, EquirectangularReflectionMapping)
			 : null;

		// this.bumpMap.wrapS = this.bumpMap.wrapT = RepeatWrapping;
		// map.wrapS = map.wrapT = RepeatWrapping;

		const material = canvas ? new MeshPhongMaterial({
			// color: new THREE.Color('rgb(155,196,30)'),
			// emissive: new Color('rgb(7,3,5)'),
			// specular: new Color('rgb(255,113,0)'),
			shininess: 0,
			bumpMap: this.bumpMap,
			map,
			bumpScale: 0.05
		}): new MeshBasicMaterial();

		// this.bumpMap.repeat.set(0.5, 0.5);
		// map.repeat.set(0.5, 0.5);

		// material.map.repeat.setY(2)
		this.mesh.material = material;
	}

	updateGLView() {
		this.mesh.rotation.y += 0.0025;
		this.mesh.rotation.x = this.rotationX;
		this.renderer.render(this.scene, this.camera);

		this.hAnimationFrame = requestAnimationFrame(this.updateGLView.bind(this));
	}
}
