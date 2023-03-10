
export interface Template {
    sections: TemplateSection[];
}

export interface TemplateSection {
    header: string;
    fields: (Field | TextField | NumberField | DropdownField | CounterField | CheckboxField)[]
}

export interface Field {
    type: string;
    label: string;
    value?: string | number;
}

export interface TextField extends Field {
    multiline?: boolean;
}

export interface NumberField extends Field {
    min?: number;
    max?: number;
}

export interface DropdownField extends Field {
    items?: DropdownItem[];
}

export interface DropdownItem {
    text: string;
    value: string;
}

export interface CounterField extends NumberField {
    
}

export interface CheckboxField extends Field {

}
