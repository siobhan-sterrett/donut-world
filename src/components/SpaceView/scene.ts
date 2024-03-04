import { sunPath, type SceneParams, type WorldParams, type SunParams, type ViewerParams, viewerPosition } from "@/params";
import { range } from "@/util";
import { BufferGeometry, Camera, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TorusGeometry, WebGLRenderer, type Renderer, Vector3, SphereGeometry } from "three"

export class SpaceViewScene {
    scene: Scene = new Scene();
    renderer: Renderer = new WebGLRenderer();
    world: Mesh = new Mesh();
    sunPath: Line = new Line();
    viewer: Mesh = new Mesh();
    camera: Camera = new PerspectiveCamera();

    constructor() {
        this.scene.add(this.world);
        this.scene.add(this.sunPath);
        this.scene.add(this.viewer);
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

    #createViewer(world: WorldParams, viewer: ViewerParams): Mesh {
        const viewerGeometry = new SphereGeometry(world.minorRadius / 10);
        const viewerMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
        const viewerObject = new Mesh(viewerGeometry, viewerMaterial);

        const position = viewerPosition(world, viewer);
        viewerObject.position.set(position.x, position.y, position.z);
        return viewerObject;
    }

    updateParams(params: SceneParams) {
        this.scene.remove(this.world, this.sunPath, this.viewer);
        this.world = this.#createWorld(params.world);
        this.scene.add(this.world);
        this.sunPath = this.#createSunPath(params.sun);
        this.scene.add(this.sunPath);
        this.viewer = this.#createViewer(params.world, params.viewer);
        this.scene.add(this.viewer);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
