import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';
import { FieldContract, Option } from './FormContract';
import { Model } from './LitFormlyForm';
//export {html, repeat, until};

/**
 * Renders a field using bootstrap 3 classes
 */
export class FieldRenderer {

    public renderField(field: FieldContract, value: unknown, set: (value:unknown)=>void, errorMsg: string|null = null, model: Model) {

        const labelTemplate = this.labelTemplate(field);
        
        const fieldTemplate = this.fieldTemplate(field, value, set, model);

        const errorClass = { 'has-error': errorMsg!=null };
    
        return html`
          <div class="form-group ${classMap(errorClass)}">
            ${labelTemplate} 
            ${fieldTemplate}
            ${this._errorMessageTemplate(errorMsg)}
          </div>
        `;
      }
    
    public labelTemplate(field: FieldContract) {
        const requiredMark = field.templateOptions.required ? '*' : '';
        return html`
            <label class="control-label" for="${field.key}">
            ${field.templateOptions.label} ${requiredMark}
            </label>
        `;
    }
    
    protected _errorMessageTemplate(errorMsg: string|null) {
        if (errorMsg) {
            return html`
            <div>
                <span class="text-danger">
                    ${errorMsg}
                </span>
            </div>`;
        }
        return nothing;
    }
    
    public fieldTemplate(field: FieldContract, value: unknown, set: (value:unknown)=>void, model: Model ) {
        let renderFn = this.renderTextInputField;
        
         if (field.type==='input') {
            if (['decimal', 'integer', 'long', 'double'].indexOf(field.templateOptions.type||'')>=0) {
                renderFn = this.renderNumberInputField;
            } else {
                renderFn = this.renderTextInputField;
            }
        //  } else if (field.type==='number') {
        //     renderFn = this.renderNumberInputField;
        } else if (field.type==='checkbox') {   
            //@ts-ignore     
            renderFn = this.renderCheckboxField;
        } else if (field.type==='select') {
            renderFn = this.renderSelectField;
        } else if (field.type==='datalist') {
            renderFn = this.renderDataListField;
        /*} else if (field.type==='remoteselect') {
            //field.templateOptions.options= [{name: 'Name', value: '1'}, {name: 'Name 2', value: '2'}, {name: 'Name 3', value: '3'},];
            renderFn = this.renderSelectField; */
        } else if (field.type==='date') {
            renderFn = this.renderDateField;
        } else {
            //fall back to input field
            renderFn = this.renderTextInputField;
        }
        //@ts-ignore
        return renderFn.bind(this)(field, value, set, model);
    
    }
    
    protected renderTextInputField(field: FieldContract, value: string, set: (value:unknown)=>void, model: Model) {
        return this.renderInputField(field, value, set, 'text');
        // return html`
        //     <input id="${field.key}" 
        //       type="text" 
        //       class="form-control"  
        //       name="${field.key}"
        //       .value="${value||''}"
        //       ?required="${field.templateOptions.required}"
        //       placeholder="${ifDefined(field.templateOptions.placeholder)}"
        //       @input="${(e: Event & any) => set(e.target.value)}"
        //       >
        //     </input>
        //     `;
    }

    protected renderNumberInputField(field: FieldContract, value: string, set: (value:unknown)=>void, model: Model) {
        return this.renderInputField(field, value, set, 'number');
        // const setNumber = (value:unknown) => set(Number(value));

        // return html`
        //     <input id="${field.key}" 
        //       type="number" 
        //       class="form-control"  
        //       name="${field.key}"
        //       .value="${value||''}"
        //       ?required="${field.templateOptions.required}"
        //       placeholder="${ifDefined(field.templateOptions.placeholder)}"
        //       @input="${(e: Event & any) => setNumber(e.target.value) }"
        //       ?disabled="${field.templateOptions.disabled}"
        //       ?readonly="${field.templateOptions.readonly}"
        //       >
        //     </input>
        //     `;
    }

    protected renderInputField(field: FieldContract, value: string, set: (value:unknown)=>void, type: 'text'|'number'|'checkbox' ) {
        let setter = set;
        let step = undefined;
        switch (type) {
            case 'number': {
                setter = (value: unknown) => {
                    if (value) {
                        //Number("") becomes 0 etc
                        set(Number(value));
                    } else {
                        set(null);
                    }
                };
                if (field.templateOptions.type==='decimal') {
                    if (field.templateOptions.step) {
                        step = field.templateOptions.step;
                    } else {
                        step = 'any';
                    }
                }
            }
        }

        // value should already contain value to show to user (done in LitFormlyForm.unwrapFieldValue)
        // otherwise override it
        // Previoulsy I used .value="${value||''}" but didn't work for number 0 etc
        return html`
            <input id="${field.key}" 
              type="${type}" 
              class="form-control"  
              name="${field.key}"
              .value="${value}"
              pattern="${ifDefined(field.templateOptions.pattern)}"
              min="${ifDefined(field.templateOptions.min)}"
              max="${ifDefined(field.templateOptions.max)}"
              step="${ifDefined(step === null ? undefined : step)}"
              minlength="${ifDefined(field.templateOptions.minLength)}"
              maxlength="${ifDefined(field.templateOptions.maxLength)}"
              placeholder="${ifDefined(field.templateOptions.placeholder)}"
              @input="${(e: Event & any) => setter(e.target.value) }"
              ?required="${field.templateOptions.required}"
              ?disabled="${field.templateOptions.disabled}"
              ?readonly="${field.templateOptions.readonly}"
              >
            </input>

            `;
    }    
    
    protected renderCheckboxField(field: FieldContract, value: boolean, set: (value:unknown)=>void, model: Model ) {
        return html`
            <input
                type="checkbox"
                id="${field.key}"
                @change="${(e: any) => set(e.target.checked)}"
                ?checked="${value}"
                ?disabled="${field.templateOptions.disabled}"
                ?readonly="${field.templateOptions.readonly}"
                >
            </input>`;
    }

    protected renderDateField(field: FieldContract, value: string, set: (value:unknown)=>void, model: Model ) {
    //date + delete field: not implemented as not needed
    //         <div class="input-group">
    //             <input id="${field.key}" class="form-control" style="padding:13px 0px;"
    //                 type="date"
    //                 .value="${value}"
    //                 @input="${e => set(e.target.value)}"
    //                 ?required="${field.templateOptions.required}"
    //                 ?disabled="${field.templateOptions.disabled}"
    //                 ?readonly="${field.templateOptions.readonly}"
    //                 placeholder="YYYY-MM-DD">
    //             </input>
    //             <span class="input-group-addon" @click=${e => set(null)}>
    //                 <i class="fa fa-remove" aria-hidden="true"></i>
    //             </span>                
    //         </div>    
        return html`
            <input id="${field.key}" class="form-control"
                type="date"
                .value="${value}"
                @input="${(e: Event & any) => set(e.target.value)}"
                ?required="${field.templateOptions.required}"
                ?disabled="${field.templateOptions.disabled}"
                ?readonly="${field.templateOptions.readonly}"
                placeholder="YYYY-MM-DD">
            </input>
        `;
    }    
    
    protected renderSelectField(field: FieldContract, value: string, set: (value:unknown)=>void, model: Model ) {
        const options = field.templateOptions.options ?? [];
        return html`
            <select id="${field.key}" class="form-control"
                @change="${(e: Event & any) => set(e.target.value)}"
                @input="${(e: Event & any) => set(e.target.value)}"
                ?required="${field.templateOptions.required}"
                ?disabled="${field.templateOptions.disabled}"
                ?readonly="${field.templateOptions.readonly}">
                ${repeat(options, this.renderOption(value))}
            </select>
        `;
    }

    /**
     * Render a <input> field using a <datalist> element
     * @param {*} field 
     * @param {*} value 
     * @param {*} set 
     * @param {*} model 
     * @returns 
     */
    protected renderDataListField(field: FieldContract, value: string, set: (value:unknown)=>void, model: Model ) {
        const options = field.templateOptions.options ?? [];
        return html`
            <input class="form-control" id=${field.key} name=${field.key} 
                list="${field.key}-datalist" 
                ?required=${field.templateOptions.required}
                ?disabled="${field.templateOptions.disabled}"
                ?readonly="${field.templateOptions.readonly}"
                @input=${ (e: Event & any) => set(e.target.value)} autocomplete="off">
            </input>            
            <datalist id="${field.key}-datalist">
                ${repeat(options, this.renderOption(value))}
            </datalist>            
        `;
    } 
    
    protected renderOption(value: string) {
        return (option: Option) => html`
        <option
            value="${option.value}"
            ?selected="${option.value === value}"
            label="${option.name}">
            ${option.name}
        </option>`;
    }    

}


