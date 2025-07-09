export type OptionsType = {
    [key: string]: string | number
};

export type TemplateType = {
    [key: string]: string
};

export type DefaultTagsOptionsType = {
    input: OptionsType
    textarea: OptionsType
}

export interface ITag {
    tagName: string,
    options: OptionsType,
    inner?: string,
    toHtml(): HTMLElement,
    toString(): string,
}

export interface ITagInput extends ITag {
    defaultTagsOptions: DefaultTagsOptionsType,
    name?: string,
}

export interface IForm {
    inputs: HTMLElement[],
    template: TemplateType,
    options: OptionsType,
    input(id: string, options?: OptionsType): void
    submit(value?: string): void
    toHtml(): HTMLElement,
    toString(): string
}
