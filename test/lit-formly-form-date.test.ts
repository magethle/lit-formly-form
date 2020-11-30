import { html, fixture, expect } from '@open-wc/testing';

import {LitFormlyForm} from '../src/LitFormlyForm.js';
import '../src/lit-formly-form.js';
import { FormContract } from '../src/FormContract.js';

const contract: FormContract = [
  {
      id: "date",
      key: "date",
      type: "date",
      templateOptions: {
        label: "Date", 
        required: true
      }
  }
];

const value = {
  date: '2020-10-30'
};

describe('LitFormlyForm', () => {
  let element: LitFormlyForm;


  beforeEach(async () => {
    element = await fixture(html`
      <lit-formly-form .contract=${contract} .value="${value}"></lit-formly-form>
    `);
  });

  it(`form should render date field`, async () => {
    expect(element).not.to.be.empty;
    
    const input = element.querySelector('input')!;
    expect(input).to.exist;
    expect(input.id).to.eq(contract[0].key);
    expect(input.value).to.eq(value.date);
    expect(input.required).to.be.true;
  });

});
