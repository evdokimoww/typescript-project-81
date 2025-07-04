export class Tag {
    private pairedTags: string[] = ['label', 'div']

    constructor(public tagName: string,
                public options: {[key: string]: string} = {},
                public inner: string = '') {}

    toString(): string {
        const optionsStr = Object.entries(this.options).reduce((acc, [key, value]) => {
            const str = `${key}="${value}"`
            return acc ? `${acc} ${str}` : ` ${str}`
        }, '');

        const startTag = `<${this.tagName}${optionsStr.length ? optionsStr : ''}>`

        if (this.pairedTags.includes(this.tagName)) {
            return `${startTag}${this.inner}</${this.tagName}>`
        }

        return startTag
    }
}

export default {
    formFor(template: {[key: string]: string},
            options: {[key: string]: string} = {},
            callback: (f: any) => void): string {
        return `<form action="${options.url ?? '#'}" method="post"></form>`
    }
}
