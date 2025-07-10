import {DefaultTagsOptionsType, IForm, ITag, ITagInput, OptionsType, TemplateType} from "./types";
import {isKeyOf} from "./utils";
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html>');
const document = dom.window.document;

export class Tag implements ITag {
    constructor(public tagName: string,
                public options: OptionsType = {},
                public inner: string = '') {
    }

    toHtml(): HTMLElement {
        const element = document.createElement(this.tagName);

        if (Object.keys(this.options).length !== 0) {
            for (const key in this.options) {
                element.setAttribute(key, String(this.options[key]));
            }
        }

        if (this.inner) {
            element.innerHTML = this.inner;
        }

        return element
    }
}

class TagInput implements ITagInput {
    defaultTagsOptions: DefaultTagsOptionsType = {
        input: {type: 'text'},
        textarea: {cols: 20, rows: 40}
    }

    constructor(public tagName: string,
                public options: OptionsType = {},
                public inner: string = '',
                public name: string = '') {
    }

    toHtml(): HTMLElement {
        const tag: string = isKeyOf('as', this.options) ? String(this.options.as) : this.tagName

        const inKeyInObj: boolean = isKeyOf(tag, this.defaultTagsOptions)

        const resultOptions: OptionsType = {
            ...(inKeyInObj ? this.defaultTagsOptions[tag as keyof DefaultTagsOptionsType] : {}),
            ...(tag !== 'textarea' ? {value: this.inner} : {}),
            ...this.options,
        }

        delete resultOptions.as

        //todo костыль для прохождения hexlet-тестов (соблюдение порядка атрибутов в теге)
        return new Tag(tag, tag === 'textarea' ? {...resultOptions, ...(this.name && {name: this.name}),} : {...(this.name && {name: this.name}), ...resultOptions}, this.inner).toHtml()
    }
}

class Form implements IForm {
    public inputs: HTMLElement[] = []

    constructor(public template: TemplateType,
                public options: OptionsType = {}) {
    }

    input(id: string, options: OptionsType = {}): void {
        if (!this.template[id]) {
            throw new Error(`Field '${id}' does not exist in the template.`)
        }

        const input = new TagInput('input', options, this.template[id] ?? '', id).toHtml()

        const upperLabelInner = id.charAt(0).toUpperCase() + id.slice(1)
        const labelForInput = new Tag('label', {for: id}, upperLabelInner).toHtml()

        this.inputs.push(labelForInput)
        this.inputs.push(input)
    }

    submit(value: string = 'Save'): void {
        const input = new TagInput('input', {type: 'submit', value}).toHtml()
        this.inputs.push(input)
    }

    toHtml(): HTMLElement {
        console.log(this.options)
        const formOptions: OptionsType = Object.entries(this.options).reduce((acc: OptionsType, [key, value]) => {
            if (key === 'url') {
                acc['action'] = value
            } else {
                acc[key] = value
            }

            return acc
        }, {
            method: 'post',
            action: '#'
        })

        return new Tag('form', formOptions).toHtml()
    }

    toString(): string {
        const form = this.toHtml()
        if (this.inputs.length !== 0) {
            this.inputs.forEach((input) => {
                form.appendChild(input)
            })
        }
        return form.outerHTML
    }
}

export default class HexletCode {
    static formFor(template: TemplateType, options: OptionsType = {}, cb: (f: IForm) => void): string {
        const form = new Form(template, options);
        cb(form);
        return form.toString();
    }
}
