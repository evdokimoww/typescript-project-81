export function isKeyOf<T extends object>(key: string, obj: T): boolean {
    return key in obj;
}

export function mainTrim(str: string): string {
    return str.replace(/\t/g, '')
        .replace(/\n/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/>\s+</g, '><');
}
