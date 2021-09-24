import { html } from 'lit';
import { FormContract } from '../src/FormContract.js';
import '../src/lit-formly-form.js';

export default {
  title: 'lit-formly-form',
};


const formConfig: FormContract = [
  {
    id: 'date_empty',
    key: 'date_empty',
    type: 'date',
    templateOptions: {
      label: "Empty Date", 
    }
  }, {
    id: 'date',
    key: 'date',
    type: 'date',
    templateOptions: {
      label: "Date", 
    }
  }
];

const value = {
  'date': '2020-12-05'
};

export const Date = () =>
  html`
    <lit-formly-form .contract="${formConfig}" .value="${value}" >
    </lit-formly-form>
  `;
