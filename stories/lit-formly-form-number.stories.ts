import { html } from 'lit';
import { FormContract } from '../src/FormContract.js';
import '../src/lit-formly-form.js';

export default {
  title: 'lit-formly-form',
};


const formConfig: FormContract = [
{
    id: 'age',
    key: 'age',
    type: 'input',
    templateOptions: {
      type: 'integer', 
      label: "Integer <= 45", 
      required: false,
      max: 45
    }
  }, {
    id: 'decimal',
    key: 'decimal',
    type: 'input',
    templateOptions: {
      type: 'decimal', 
      label: "Decimal", 
    }
  }
];

const value = {
  'age': 41
};

export const Number = () =>
  html`
    <lit-formly-form .contract="${formConfig}" .value="${value}" >
    </lit-formly-form>
  `;
