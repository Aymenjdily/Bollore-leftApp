export type InputP = {
    title: string;
    type: string;
    width?: string;
    state: any;
    setState: (state: any) => void;
    isTextArea?: boolean
}

export type ButtonP = {
    type: "button" | "submit";
    action?: () => void;
    title: string;
}

export type CardP = {
    number: number;
    title: string;
}

export type CustomFieldProps = {
    title: string;
    state: string;
    filters: Array<any>;
    setState: (value: string) => void
}    