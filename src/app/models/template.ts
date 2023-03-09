
export interface Template {
    sections: TemplateSection[];
}

export interface TemplateSection {
    header: string;
    fields: (Field | TextField | NumberField | DropdownField)[]
}

export interface Field {
    type: string;
    label: string;
    value?: string;
}

export interface TextField extends Field {
    multiline?: boolean;
}

export interface NumberField extends Field {
    min?: number;
    max?: number;
}

export interface DropdownField extends Field {
    items: DropdownItem[];
}

export interface DropdownItem {
    label: string;
    value: string;
}