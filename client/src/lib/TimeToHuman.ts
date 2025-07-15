import { Duration, DateTime } from 'luxon';
export function convertDurationTimeToHuman(ttl: number): string {
    const totalMinutes = Math.round(ttl / 60);
    const duration = Duration.fromObject({ minutes: totalMinutes })
        .shiftTo('days', 'hours', 'minutes')
        .toHuman({ listStyle: 'long', unitDisplay: 'long' });
    return duration
}
export function convertTimestampToHumanReadable(milliseconds: number): string {
    const createdDate = DateTime.fromMillis(milliseconds);
    return createdDate.toRelative()!
}
export function convertDataTimeToHumanReadable(date: string) {
    return DateTime.fromJSDate(new Date(date)).toRelative()
}   
