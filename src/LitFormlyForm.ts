import { LitElement, html, css, property } from 'lit-element';
import { FieldRenderer } from './FieldRenderers.js';
import { FieldContract, FormContract } from './FormContract.js';

interface Model {
  [key: string]: unknown
}

export class LitFormlyForm extends LitElement {
  // static styles = css`
  //     :host {
  //       input:invalid {
  //         border-color: red;
  //       }
  //     }
  //     input:invalid {
  //       border-color: red;
  //     }
  //     `; 

  @property({ type: Array, attribute: false })
  public contract: FormContract | null = null;

  @property({ type: Object, attribute: false })
  public value: Model = {};

  @property({ type: Object, attribute: false })
  public renderer: FieldRenderer = new FieldRenderer(); 
  
  // @property({ type: Object, attribute: false })
  // public getpropertyvalue: (field:FieldContract) => unknown = this._getPropertyValue;

  // @property({ type: Object, attribute: false })
  // public getPropertyValueSetter: ((field:FieldContract) => (fieldInput: unknown) => void) = this._createModelValueSetter;

  /** error object for all fields indexed by their id */
  private errors: {[key:string]:string} = {};

  protected createRenderRoot() {
      return this; //no shadow root
  }

  public render() {
    if (this.contract) {
      return this._formTemplate(this.contract);
    }

    return html``;
  }  

  protected _formTemplate(c: FormContract) {
    return html`
      <form @change="${this.formValueUpdated}"
          @submit="${this._onSubmit}">
          ${this._fieldsetTemplate(c)}
      </form>
    `;
  }

  protected _fieldsetTemplate(c: FormContract) {
    console.log('Rendering', c);
    return html`
      <div class="fieldset">
        ${(c || []).map(field => this._fieldWrapperTemplate(field))}
      </div>
    `
  }

  protected _fieldWrapperTemplate(field: FieldContract) {
    const value = this._getPropertyValue(field);
    const set = this._createModelValueSetter(field);
    const errorMsg = this.errors[field.key];
    return this.renderer.renderField(field, value, set, errorMsg);
  }

  /**
   * Writes value back to model
   * @param field 
   */
  protected _createModelValueSetter(field: FieldContract) {
    return (fieldInput: unknown) => {
      let newValue = fieldInput;

      // if (field.valueDecorator && typeof field.valueDecorator.wrap === 'function') {
      //   newValue = field.valueDecorator.wrap(newValue)
      // }
      newValue = this.wrapFieldValue(field, newValue);

      if (this.value[field.key] !== newValue) {
        console.log(`Setting value ${newValue} (old value ${this.value[field.key]})`);
        this.value[field.key] = newValue

        this.requestUpdate();
      }
    }
  }

  protected unwrapFieldValue(field: FieldContract, value: unknown) {
    return value;
  }

  protected wrapFieldValue(field: FieldContract, value: unknown) {
    return value;
  }

  protected _getPropertyValue(field: FieldContract) {
    let value = this.value[field.key] || null;

    value = this.unwrapFieldValue(field, value);

    //TODO
    // if (value && field.valueDecorator && typeof field.valueDecorator.unwrap === 'function') {
    //   value = field.valueDecorator.unwrap(value)
    // }

    return value;
  }  


  public submit() {
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: {
          value: this.value,
        }
      }),
    )
  }
  
  async formValueUpdated(e: { target: HTMLInputElement }) {
    const input = e.target;
    if (input.id) {
      console.log('Updated input', input.id);
      const validity = input.validity;
      const valid = validity.valid;
      if (valid) {
        //clear previous error (if any)
        if (this.errors[input.id]) {
          delete this.errors[input.id];
          this.requestUpdate();
        }
      } else {
        console.log(`Field ${input.id} invalid`, validity);
        const errorMsg = this.getErrorMessage(validity);
        this.errors[input.id] = errorMsg;
        //input.setCustomValidity('Pattern mismatch!');
        this.requestUpdate();
      }
    }
  }

  public getErrorMessage(validity: ValidityState) {
    if (validity.patternMismatch) {
      return 'Pattern mismatch!';
    } else if (validity.valueMissing) {
      return 'Value missing!';
    } else if (validity.badInput) {
      return 'Bad input!';
    } else if (validity.rangeOverflow) {
      return 'Range overflow!';
    } else if (validity.rangeUnderflow) {
      return 'Range underflow!';
    } else if (validity.stepMismatch) {
      return 'Step mismatch!';
    } else if (validity.tooLong) {
      return 'Too long!';
    } else if (validity.tooShort) {                              
      return 'Too short!';
    } else if (validity.typeMismatch) {
      return 'Type mismatch!';
    } else {
      return 'Validation error!';
    }
  }

  public isValid() {
    return Object.keys(this.errors).length == 0;
  }

  private _onSubmit(e: Event) {
    this.submit()
    e.preventDefault()
    return false
  }  
}
