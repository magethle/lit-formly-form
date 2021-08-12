import { html, fixture, expect } from '@open-wc/testing';

import {LitFormlyForm} from '../src/LitFormlyForm.js';
import '../src/lit-formly-form.js';
import { FormContract } from '../src/FormContract.js';


describe('LitFormlyForm', () => {
  let element: LitFormlyForm;

  it(`form should render number field`, async () => {
    const contract: FormContract = [
      {
          id: "age",
          key: "age",
          type: "input",
          templateOptions: {
            label: "Age", 
            required: true,
            type: 'integer'
          }
      }
    ];
    const value = {'age': 20};

    element = await fixture(html`
      <lit-formly-form .contract=${contract} .value="${value}"></lit-formly-form>
    `);    
    expect(element).not.to.be.empty;
    
    const input = element.querySelector('input')!;
    expect(input).to.exist;
    expect(Number(input.value)).to.eq(value.age);
    expect(input.required).to.be.true;
  });   

});
