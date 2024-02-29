export function xTransform(hour: number): number {
    return hour * 50;
}

export function yTransform(degree: number): number {
    return -degree * 10 / 3;
}
