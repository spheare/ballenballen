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
import * as THREE from 'three';


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
	@ViewChild('webgl') public webgl: ElementRef<HTMLElement>;

	protected hAnimationFrame: number = null;

	protected scene: THREE.Scene;
	protected camera: THREE.Camera;
	protected renderer: THREE.Renderer;
	protected mesh: THREE.Mesh;

	constructor() {}

	ngOnInit() {}
	ngOnDestroy() {
		if (this.hAnimationFrame !== null) cancelAnimationFrame(this.hAnimationFrame);
	}

	ngAfterViewInit(): void {
		this.renderTexture();
		this.makeScene();
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

		console.log('renderTexture');

		const PATTERN_REPEAT = 2,
			PATTERN_WIDTH = this.width / PATTERN_REPEAT,
			BLOCK_WIDTH = PATTERN_WIDTH / 16,
			BLOCK_HEIGHT = this.height / 41;

		ctx.clearRect(0, 0, this.width, this.height);

		console.groupCollapsed(`render`);
		for (let patIndex = 0; patIndex < PATTERN_REPEAT; ++patIndex) {
			const pattern = this.patterns[patIndex % this.patterns.length];

			for (let rows = 0; rows < pattern.length; ++rows) {
				// aantal niet null punten in de rij
				const pointCount = pattern[rows].reduce(( prev, col) => prev + (col !== StitchType.EMPTY ? 1 : 0), 0);

				// eerste niet null element
				const firstNonZero = pattern[rows].findIndex(col => col !== StitchType.EMPTY);

				// de volledige breedte incl whitespace
				const rowWidth = pattern[rows].length;

				console.groupCollapsed(`row ${rows}`);
				console.log(
					'row first non zero',
					firstNonZero,
					'number of non null points',
					pointCount,
					'total length',
					rowWidth
				);
				for (let texX = 0; texX < rowWidth; ++texX) {
					const fPercentage = texX / rowWidth;
					const sampleX = Math.floor(firstNonZero + pointCount * fPercentage);
					const drawOffset = patIndex * PATTERN_WIDTH;

					console.log(`sample on pattern: ${sampleX}, render on txture pos ${texX}`);

					// if (pattern[rows][sampleX] === StitchType.EMPTY) continue;
					ctx.fillStyle = COLOR_MAP[pattern[rows][sampleX]];
					ctx.fillRect(drawOffset + texX * BLOCK_WIDTH, rows * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
				}
				console.groupEnd();
			}
		}
		console.groupEnd();
		return canvas;
	}

	makeScene() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);

		const geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);

		this.webgl.nativeElement.appendChild(this.renderer.domElement);
		// modify UVs to accommodate MatCap texture
		// const faceVertexUvs = geometry.faceVertexUvs[0];
		// for (const i = 0; i < faceVertexUvs.length; i++) {
		// 	const uvs = faceVertexUvs[i];
		// 	const face = geometry.faces[i];

		// 	for (const j = 0; j < 3; j++) {
		// 		uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
		// 		uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
		// 	}
		// }

		this.mesh = new THREE.Mesh(geometry);
		this.updateMaterial();

		this.scene.add(this.mesh);

		this.camera.position.z = 10;

		this.updateGLView();
	}

	updateMaterial(): void {
		if (!this.mesh) return;
		console.log('updating texure');
		const canvas = this.renderTexture();
		const material = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvas) });
		this.mesh.material = material;
	}

	updateGLView() {
		this.mesh.rotation.y += 0.01;
		this.renderer.render(this.scene, this.camera);

		this.hAnimationFrame = requestAnimationFrame(this.updateGLView.bind(this));
	}
}
