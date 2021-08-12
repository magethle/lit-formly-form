
export type FormContract = FieldContract[];

export interface FieldContract {
    /**
     * This allows you to specify the `id` of your field. Note, the `id` is generated if not set.
     */    
    id: string;

    /**
     * The key that relates to the model. This will link the field value to the model
     */
    key: string;

    /**
     * If you wish, you can specify a specific `name` for your field. This is useful if you're posting the form to a server using techniques of yester-year.
     */
    name?: string;

    /**
     * This should be a formly-field type added either by you or a plugin. More information over at Creating Formly Fields.
     */
    type: 'input'|'date'|'user'|'remoteselect'|'remoteselect-autocomplete'|'select'|'datalist'|'checkbox'; // select not used by our API

    /**
     * This is reserved for the templates. Any template-specific options go in here. Look at your specific template implementation to know the options required for this.
     */    
    templateOptions: TemplateOptions;

    /**
     * Custom data
     */
    data?: FieldData;

}

export interface FieldData {
    domain: string;
    mappings: FieldDataMapping[];
}

export interface FieldDataMapping {
    key: string;
    param: string;
    type: string;
}

export interface TemplateOptions {
    label: string;
    type?: 'string'|'decimal'|'integer'|'timestamp'|'double'|'long'|'boolean'; //type from geoserver/DB, geometry | double | long | boolean ???
    required?: boolean;
    pattern?: string;
    placeholder?: string;
    options?: Option[];

    disabled?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    readonly?: boolean;
    step?: number;

    rows?: number;
    cols?: number;
    description?: string;
    hidden?: boolean;
    tabindex?: number;
    attributes?: { [key: string]: string | number };
    
  
}

export interface Option {
    name: string;
    value: string;
}
