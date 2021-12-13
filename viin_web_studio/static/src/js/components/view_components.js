odoo.define('viin_web_studio.view_components', function (require) {
    var Widget = require('web.Widget');
    var core = require('web.core');
    var _lt = core._lt;

    var NewFieldComponentAbstract = Widget.extend({
        fieldLabel: null,
        technicalName: null,
        template: 'NewFieldComponent',
        fieldClass: null,
        fieldDescription: false,
        start: function () {
            var self = this;
            this._super.apply(this, arguments).then(function () {
                self.$el.draggable({
                    revertDuration: 200,
                    helper: 'clone',
                    scroll: false,
                    cursor: true,
                    refreshPositions: true,
                    opacity: 0.5,
                    revert: 'invalid',
                })
            });

        }
    });

    var BooleanComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Boolean'),
        technicalName: 'boolean',
        fieldClass: 'studio-field-component-boolean',
        fieldDescription: '',
    })
    var CharComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Char'),
        technicalName: 'char',
        fieldClass: 'studio-field-component-char',
        fieldDescription: ''
    })
    var FloatComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Float'),
        technicalName: 'float',
        fieldClass: 'studio-field-component-float',
        fieldDescription: ''
    })
    var IntegerComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Integer'),
        technicalName: 'integer',
        fieldClass: 'studio-field-component-integer',
        fieldDescription: ''
    })
    var BinaryComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Binary'),
        technicalName: 'binary',
        fieldClass: 'studio-field-component-binary',
        fieldDescription: ''
    })
    var HtmlComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Html'),
        technicalName: 'html',
        fieldClass: 'studio-field-component-html',
        fieldDescription: ''
    })
    var ImageComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Image'),
        technicalName: 'image',
        fieldClass: 'studio-field-component-image',
        fieldDescription: ''
    })
    var MonetaryComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Monetary'),
        technicalName: 'monetary',
        fieldClass: 'studio-field-component-monetary',
        fieldDescription: ''
    })
    var SelectionComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Selection'),
        technicalName: 'selection',
        fieldClass: 'studio-field-component-selection',
        fieldDescription: ''
    })
    var TextComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Text'),
        technicalName: 'text',
        fieldClass: 'studio-field-component-text',
        fieldDescription: ''
    })
    var DateComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Date'),
        technicalName: 'date',
        fieldClass: 'studio-field-component-date',
        fieldDescription: ''
    })
    var DatetimeComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Datetime'),
        technicalName: 'datetime',
        fieldClass: 'studio-field-component-datetime',
        fieldDescription: ''
    })
    var Many2oneComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Many2one'),
        technicalName: 'many2one',
        fieldClass: 'studio-field-component-many2one',
        fieldDescription: ''
    })
    var One2manyComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('One2many'),
        technicalName: 'one2many',
        fieldClass: 'studio-field-component-one2many',
        fieldDescription: ''
    })
    var Many2manyComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Many2many'),
        technicalName: 'many2many',
        fieldClass: 'studio-field-component-many2many',
        fieldDescription: ''
    })

    var NotebookComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Tabs'),
        technicalName: 'notebook',
        fieldClass: 'studio-field-component-notebook',
        fieldDescription: ''
    });
    var GroupComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Columns'),
        technicalName: 'group',
        fieldClass: 'studio-field-component-group',
        fieldDescription: ''
    });
    var FilterComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Filter'),
        technicalName: 'filter',
        fieldClass: 'studio-field-component-filter',
        fieldDescription: ''
    });

    var FilterSeparatorComponent = NewFieldComponentAbstract.extend({
        fieldLabel: _lt('Separator'),
        technicalName: 'separator',
        fieldClass: 'studio-field-component-separator',
        fieldDescription: ''
    });
    return {
        new_field: {
            'boolean_component': BooleanComponent,
            'char_component': CharComponent,
            'float_component': FloatComponent,
            'integer_component': IntegerComponent,
            'binary_component': BinaryComponent,
            'html_component': HtmlComponent,
            'image_component': ImageComponent,
            'monetary_component': MonetaryComponent,
            'selection_component': SelectionComponent,
            'text_component': TextComponent,
            'date_component': DateComponent,
            'datetime_component': DatetimeComponent,
            'many2one_component': Many2oneComponent,
            'one2many_component': One2manyComponent,
            'many2many_component': Many2manyComponent,
            'notebook_component': NotebookComponent,
            'group_component': GroupComponent,
            'filter_component': FilterComponent,
            'filter_separator_component': FilterSeparatorComponent
        }
    }
})