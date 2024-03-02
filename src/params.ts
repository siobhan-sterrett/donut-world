import { Matrix4, Vector3 } from "three";

export type SceneParams = {
    world: WorldParams;
    sun: SunParams;
    viewer: ViewerParams;
}

export type WorldParams = {
    majorRadius: number;
    minorRadius: number;
}

export type SunParams = {
    majorAxis: number;
    minorAxis: number;
}

export type ViewerParams = {
    azimuth: number;
    latitude: number;
}

export function sunPath(sunParams: SunParams): (hour: number) => Vector3 {
    const { majorAxis: a, minorAxis: b } = sunParams;

    return (hour: number): Vector3 => {
        // One cycle of the sun is 48 hours
        const t = hour / 24 * Math.PI;

        const denominator = (1 + Math.pow(a * Math.cos(t) / b, 2));
        const x = a * Math.sin(t) / denominator;
        const z = a * a / b * Math.sin(t) * Math.cos(t) / denominator;

        return new Vector3(x, 0, z);
    }
}

export function viewerTransform(worldParams: WorldParams, viewerParams: ViewerParams): (sunPosition: Vector3) => Vector3 {
    return (sunPosition: Vector3): Vector3 => {
        const position = sunPosition.clone();
        return position
            .applyMatrix4(new Matrix4().makeRotationZ(-viewerParams.azimuth * Math.PI / 180))
            .applyMatrix4(new Matrix4().makeTranslation(-worldParams.majorRadius, 0, 0))
            .applyMatrix4(new Matrix4().makeRotationY(viewerParams.latitude * Math.PI / 180 - Math.PI / 2))
            .applyMatrix4(new Matrix4().makeTranslation(0, 0, -worldParams.minorRadius));
    }
}
