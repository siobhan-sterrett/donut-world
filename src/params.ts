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
    orbitalRadius: number;
}

export type ViewerParams = {
    azimuth: number;
    latitude: number;
}

export function sunPath(sunParams: SunParams): (hour: number) => Vector3 {
    const { orbitalRadius: a } = sunParams;

    return (hour: number): Vector3 => {
        // One cycle of the sun is 48 hours
        const t = hour / 24 * Math.PI;

        const denominator = 1 + Math.pow(Math.sin(t), 2);
        const x = a * Math.cos(t) / denominator;
        const z = a * Math.sin(t) * Math.cos(t) / denominator;

        return new Vector3(x, 0, z);
    }
}

export function viewerPosition(worldParams: WorldParams, viewerParams: ViewerParams): Vector3 {
    const { majorRadius, minorRadius } = worldParams;
    const { azimuth, latitude } = viewerParams;

    // Calculate position at latitude, at azimuth = 0
    const position = new Vector3(majorRadius, 0, 0).add({
        x: minorRadius * Math.cos(latitude),
        y: 0,
        z: minorRadius * Math.sin(latitude)
    });

    // Rotate to azimuth
    return position.applyMatrix4(new Matrix4().makeRotationZ(azimuth));
}

export function viewerTransform(worldParams: WorldParams, viewerParams: ViewerParams): (sunPosition: Vector3) => Vector3 {
    return (sunPosition: Vector3): Vector3 => {
        const position = sunPosition.clone();
        return position
            .applyMatrix4(new Matrix4().makeRotationZ(-viewerParams.azimuth))
            .applyMatrix4(new Matrix4().makeTranslation(-worldParams.majorRadius, 0, 0))
            .applyMatrix4(new Matrix4().makeRotationY(viewerParams.latitude - Math.PI / 2))
            .applyMatrix4(new Matrix4().makeTranslation(0, 0, -worldParams.minorRadius));
    }
}
