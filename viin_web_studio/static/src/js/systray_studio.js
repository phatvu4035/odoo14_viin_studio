odoo.define('viin_web_studio.systray_studio_item', function(require) {
    "use strict";
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');
    
    var StudioSystrayWidget = Widget.extend({
        name: 'studio_systray_icon',
        template: 'viin_web_studio.SystrayStudioItem',
        sequence: 2,
        
        /**
        * @overwrite
        */
        init: function() {
        	this._super.apply(this, arguments);
        },
        
        'events': {
        	'click': '_onSysTrayIconCLick'
        },
        
        _onSysTrayIconCLick: function(e) {
        	e.preventDefault();
        	this.trigger_up('studio_systray_clicked');
        }
    })
    
    SystrayMenu.Items.push(StudioSystrayWidget);
	
})