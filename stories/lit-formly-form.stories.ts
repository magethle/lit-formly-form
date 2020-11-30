import { html } from 'lit-html';
import { FormContract } from '../src/FormContract.js';
import '../src/lit-formly-form.js';

export default {
  title: 'lit-formly-form',
};


const formConfig: FormContract = [
  {
      id: "1",
      key: "NAME",
      type: "input",
      templateOptions: {
          type: "string", 
          label: "Name", 
          required: true
      }
  }, {
    id: '2',
    key: 'country',
    type: 'select',
    templateOptions: {
      type: "string", 
      label: "Country", 
      options: [{ name: 'Italy', value:'1'}, { name: 'Germany', value:'2'}, {name: 'Czech Republic', value: '0'},
          { name: 'Austria', value:'3'}, { name: 'Switzerland', value:'4'}, 
          { name: 'France', value:'5'}, { name: 'Spain', value:'6'}], 
      required: false
    }
  }, {
    id: '2',
    key: 'birthdate',
    type: 'date',
    templateOptions: {
      type: 'timestamp', 
      label: "Birthdate", 
      required: false
    }
  }, {
    id: 'notes_id',
    key: 'notes',
    type: 'input',
    templateOptions: {
      type: 'string', 
      label: "Notes", 
      required: false,
      minLength: 3,
      maxLength: 5,
      pattern: '[a-z]*',
      placeholder: 'Insert some lowercase notes here (3-5 characters)'
    }
  },
  {
    id: 'checkbox_unchecked',
    key: 'checkbox',
    type: 'checkbox',
    templateOptions: {
      type: 'string', 
      label: "Check me", 
      required: false
    }
  }, {
    id: 'checkbox_checked',
    key: 'checkbox_checked',
    type: 'checkbox',
    templateOptions: {
      type: 'string', 
      label: "Checked", 
      required: false
    }
  }, {
    id: 'age',
    key: 'age',
    type: 'number',
    templateOptions: {
      type: 'integer', 
      label: "Age <= 45", 
      required: false,
      max: 45
    }
  }, {
    id: 'disabled',
    key: 'disabled',
    type: 'input',
    templateOptions: {
      label: "Disabled", 
      disabled: true,
      placeholder: 'This field is disabled'
    }
  }, {
    id: 'readonly',
    key: 'readonly',
    type: 'input',
    templateOptions: {
      label: "Readonly", 
      readonly: true,
      placeholder: 'This field is readonly'
    }
  }


];

const value = {
  'NAME': 'Kafka',
  'country': '0',
  'birthdate': '1883-07-03',
  'checkbox_checked': true,
  'age': 41
};

export const FormlyForm = () =>
  html`
    <style>
      input:invalid, select:invalid {
        border: 2px #a94442 solid;
      }      
    </style>
    <lit-formly-form .contract="${formConfig}" .value="${value}" >
    </lit-formly-form>
  `;
