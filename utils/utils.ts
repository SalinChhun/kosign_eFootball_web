export function getAsString(value: any): string {
    if (Array.isArray(value)) return value[0];
    return value || '';
}