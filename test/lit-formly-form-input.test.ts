import { html, fixture, expect } from '@open-wc/testing';

import {LitFormlyForm} from '../src/LitFormlyForm.js';
import '../src/lit-formly-form.js';
import { FormContract } from '../src/FormContract.js';

const contract: FormContract = [
  {
      id: "descr",
      key: "DESCR",
      type: "input",
      templateOptions: {
        type: "string", 
        label: "Bezeichnung", 
        required: true,
        options: []
      }
  }
];

const value = {
  DESCR: 'description'
};

describe('LitFormlyForm', () => {
  let element: LitFormlyForm;


  beforeEach(async () => {
    element = await fixture(html`
      <lit-formly-form .contract=${contract} .value="${value}"></lit-formly-form>
    `);
  });

  it('form without contract should be empty', async () => {
    let element = await fixture(html`
      <lit-formly-form ></lit-formly-form>
    `);    
    expect(element).to.be.empty;
    //const h1 = element.shadowRoot!.querySelector('h1')!;
    //const h1 = element.querySelector('h1')!;
    //expect(h1).to.exist;
    //expect(h1.textContent).to.equal('My app');
  });

  it(`form should render input field`, async () => {
    expect(element).not.to.be.empty;
    
    const form = element.querySelector('form')!;
    expect(form).to.exist;

    const input = element.querySelector('input')!;
    expect(input).to.exist;
    expect(input.id).to.eq(contract[0].key);
    expect(input.value).to.eq(value.DESCR);
    expect(input.required).to.be.true;

  });

});
