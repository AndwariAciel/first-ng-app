export type Timer = {
    name: string;
    status: string;
    cron: string;
}

export type Timers = {
    data: Array<Timer>;
}