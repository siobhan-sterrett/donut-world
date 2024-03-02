export function debounce<T extends readonly unknown[]>(fn: (...args: [...T]) => void, delay: number): (...args: [...T]) => void {
    let timer: number | undefined;

    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => fn(...args), delay);
    }
}

export function range(stop: number): IterableIterator<number>;
export function range(start: number, stop: number): IterableIterator<number>;
export function range(start: number, stop: number, step: number): IterableIterator<number>;
export function range(startOrStop: number, stop?: number, step?: number): IterableIterator<number> {
    let start: number;
    if (stop === undefined) {
        start = 0;
        stop = startOrStop;
    } else {
        start = startOrStop;
    }

    if (step === undefined) {
        step = 1;
    }

    return rangeExt(start, stop, step);
}

function* rangeExt(start: number, stop: number, step: number): Generator<number> {
    let withinRange: (value: number) => boolean;
    if (step > 0) {
        withinRange = (value) => value < stop;
    } else if (step < 0) {
        withinRange = (value) => value > stop;
    } else {
        return;
    }

    for (let i = start; withinRange(i); i += step) {
        yield i;
    }
}
