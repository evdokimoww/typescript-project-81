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
    pairedTags: string[],
    tagName: string,
    options: OptionsType,
    inner?: string,
    toString(): string,
}

export interface ITagInput extends ITag {
    defaultTagsOptions: DefaultTagsOptionsType,
    name: string,
}

export interface IForm {
    inputs: string[],
    template: TemplateType,
    options: OptionsType,
    input(id: string, options?: OptionsType): void
    toString(): string
}
