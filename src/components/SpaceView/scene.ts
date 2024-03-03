import { sunPath, type SceneParams, type WorldParams, type SunParams } from "@/params";
import { range } from "@/util";
import { BufferGeometry, Camera, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TorusGeometry, WebGLRenderer, type Renderer, Vector3 } from "three"

export class SpaceViewScene {
    scene: Scene = new Scene();
    renderer: Renderer = new WebGLRenderer();
    world: Mesh = new Mesh();
    sunPath: Line = new Line();
    camera: Camera = new PerspectiveCamera();

    constructor() {
        this.scene.add(this.world);
        this.scene.add(this.sunPath);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.renderer = new WebGLRenderer({ canvas });
        this.renderer.setSize(canvas.width, canvas.height);

        this.camera = new PerspectiveCamera(75, canvas.width / canvas.height);
        this.camera.position.set(0, -20, 20);
        this.camera.lookAt(new Vector3(0, 0, 0));
    }

    #createWorld(params: WorldParams): Mesh {
        const worldGeometry = new TorusGeometry(params.majorRadius, params.minorRadius);
        const worldMaterial = new MeshBasicMaterial({ color: 0x0000ff });
        return new Mesh(worldGeometry, worldMaterial);
    }

    #createSunPath(params: SunParams): Line {
        const sunPosition = sunPath(params);
        const sunPathPoints = Array.from(range(0, 48, 0.01)).map((t) => sunPosition(t));
        const sunPathGeometry = new BufferGeometry().setFromPoints(sunPathPoints);
        const sunPathMaterial = new LineBasicMaterial({ color: 0xffffff });
        return new Line(sunPathGeometry, sunPathMaterial);
    }

    updateParams(params: SceneParams) {
        this.scene.remove(this.world, this.sunPath);
        this.world = this.#createWorld(params.world);
        this.scene.add(this.world);
        this.sunPath = this.#createSunPath(params.sun);
        this.scene.add(this.sunPath);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
