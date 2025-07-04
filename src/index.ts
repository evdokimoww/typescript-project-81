/* eslint-disable @typescript-eslint/no-unused-vars */
import {DefaultTagsOptionsType, IForm, ITag, ITagInput, OptionsType, TemplateType} from "./types";

function isKeyOf<T extends object>(key: string, obj: T): boolean {
    return key in obj;
}

export class Tag implements ITag {
    pairedTags: string[] = ['label', 'div']

    constructor(public tagName: string,
                public options: OptionsType = {},
                public inner: string = '') {
    }

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

class TagInput implements ITagInput {
    pairedTags: string[] = ['textarea']
    defaultTagsOptions: DefaultTagsOptionsType = {
        input: {type: 'text'},
        textarea: {cols: 20, rows: 40}
    }

    constructor(public tagName: string,
                public options: OptionsType = {},
                public inner: string = '',
                public name: string) {
    }

    toString(): string {
        const tag: string = isKeyOf('as', this.options) ? String(this.options.as) : this.tagName

        const inKeyInObj: boolean = isKeyOf(tag, this.defaultTagsOptions)

        const resultOptions: OptionsType = {
            name: this.name,
            ...(inKeyInObj ? this.defaultTagsOptions[tag as keyof DefaultTagsOptionsType] : {}),
            ...this.options,
            ...(!this.pairedTags.includes(tag) ? {value: this.inner} : {})
        }

        const optionsStr: string[] = Object.entries(resultOptions).reduce((acc: string[], [key, value]) => {
            const str: string = `${key}="${String(value)}"`
            acc.push(str)
            return acc
        }, []);

        const startTag = `<${tag}${optionsStr.length ? ` ${optionsStr.join(' ')}` : ''}>`

        if (this.pairedTags.includes(tag)) {
            return `${startTag}${this.inner}</${tag}>`
        }

        return startTag
    }
}

class Form implements IForm {
    public inputs: string[] = []

    constructor(public template: TemplateType,
                public options: OptionsType = {}) {
    }

    input(id: string, options: OptionsType = {}): void {
        if (!this.template[id]) {
            throw new Error(`Field '${id}' does not exist in the template.`)
        }

        const input = new TagInput('input', options, this.template[id] ?? '', id).toString()
        this.inputs.push(input)
    }

    toString(): string {
        const inputsString: string = this.inputs.length ? this.inputs.map((el) => `    ${el}`).join('\n') : ''
        return `<form action="${this.options.url ?? '#'}" method="post">${inputsString.length ? `\n${inputsString}\n` : ''}</form>`
    }
}

export default class HexletCode {
    static formFor(template: TemplateType, options: OptionsType = {}, cb: (f: IForm) => void): string {
        const form = new Form(template, options);
        cb(form);
        return form.toString();
    }
}
