const forms = require('forms');

// create shortcut
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

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

const createProductForm = function(categories) {
    // first arg is object that contains def of the form (forms.create)
    // each property in the object, defines one field in the form
    // property name === name of form control
    return forms.create({
        "name": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        "price": fields.string({
            required: true,
            errorAfterField: true,
            validators: [validators.integer(), validators.min(0)],
            cssClasses: {
                label: ['form-label']
            }
        }),
        "description": fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'category_id': fields.string({
            label: 'Category',
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: categories
        })
    })
};

module.exports = {bootstrapField, createProductForm};

// next, inside routes/products.js add codes to import objects in module.exports