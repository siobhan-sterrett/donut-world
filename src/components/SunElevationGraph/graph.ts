export function xTransform(hour: number): number {
    return hour * 25;
}

export function yTransform(degree: number): number {
    return -degree * 10 / 3;
}
