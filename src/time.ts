import { ECS, type ECSPlugin } from 'raxis-core';

export class Time {
    constructor(
        public elapsed: number,
        public delta: number,
        public last: number,
    ) {}
}

export class TimeData {
    constructor(public speed: number = 1) {}
}

function startTime(ecs: ECS) {
    const time = ecs.getResource(Time);

    time.last = performance.now();
}

function updateTime(ecs: ECS) {
    const time = ecs.getResource(Time);
    const now = performance.now();

    time.delta = now - time.last;
    time.elapsed += time.delta;
    time.last = now;
}

export const TimePlugin: ECSPlugin = {
    components: [],
    startup: [startTime],
    systems: [updateTime],
    resources: [new Time(0, 0, 0), new TimeData()],
};
