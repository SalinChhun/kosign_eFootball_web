export function getAsString(value: any): string {
    if (Array.isArray(value)) return value[0];
    return value || '';
}

export function isEmpty(v:any){
    return v == undefined || v == null || v == "" || v.length == 0;
}
