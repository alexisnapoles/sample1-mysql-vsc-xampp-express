const forms = require('forms');

// create shortcut
const fields = forms.fields;
const validators = forms.validators;

// Caolan forms collaboration with bootstrap
// code: https://github.com/caolan/forms === Bootstrap compatible output
let bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }
    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="alert alert-error help-block">' + object.error + '</div>' : '';

    var validationclass = object.value && !object.error ? 'has-success' : '';
    validationclass = object.error ? 'has-error' : validationclass;

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group ' + validationclass + '">' + label + widget + error + '</div>';
};

// Defining product form

const createProductForm = function(categories, tags) {
    // first arg is object that contains def of the form (forms.create)
    // each property in the object, defines one field in the form
    // property name === name of form control
    return forms.create({
        "name": fields.string({
            'required': true,
            'errorAfterField': true
        }),
        "price": fields.string({
            'required': true,
            'errorAfterField': true,
            'validators': [validators.digits(), validators.min(0)]
        }),
        "description": fields.string({
            'required': true,
            'errorAfterField': true
        }),
    })
};

module.exports = {bootstrapField, createProductForm};

// next, inside routes/products.js add codes to import objects in module.exports