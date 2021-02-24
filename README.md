# lit-formly-forms
An implementation of Angular Formly with web-components (lit-element)

## Installation

``` bash
npm i lit-formly-forms lit-html lit-element
```

## Form definition

First you have to define the fields of the form as specified by Formly:

```js
const config = [{
      id: "1",
      key: "name",
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
      required: false,
      options: [{ name: 'Italy', value:'1'},
                { name: 'Germany', value:'2'}, 
                { name: 'Czech Republic', value: '0'},
                { name: 'Austria', value:'3'}, 
                { name: 'Switzerland', value:'4'}, 
                { name: 'France', value:'5'}, 
                { name: 'Spain', value:'6'}]
    }, {
        id: '3',
        key: 'birthdate',
        type: 'input',
        templateOptions: {
            type: "timestamp", 
            label: "Birth date", 
            required: false
    }]
```

Then define the model which you want to bind to the form:
```js
const model = {
    name: "Franz",
    country: "0",
    birthdate: '1883-07-03'
}
```
The model attribute has to match the field `key` from the configuration.

Then you can use this definition on a `lit-formly-form` element to create a form:

```html
<lit-formly-form .contract=${config} .value="${model}">
</lit-formly-form>
``` 

This repository contains storybook with some further examples.  
