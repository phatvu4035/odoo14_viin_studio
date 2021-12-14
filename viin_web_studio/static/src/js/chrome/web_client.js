odoo.define('viin_web_studio.WebClient', function(require) {
    'use strict';
    
    const WebClient = require('web.WebClient');
    const ajax = require('web.ajax');
    var core = require('web.core');

    WebClient.include({
	   custom_events: _.extend({}, WebClient.prototype.custom_events, {
		  'studio_systray_clicked': '_onStudioSystrayClicked',
	   }),
       
       studio_assets: ['web_editor.compiled_assets_wysiwyg', 'viin_web_studio.compiled_assets_studio'],

       _onStudioSystrayClicked: async function() {
           core.bus.trigger('studio_toggled');
           await ajax.loadLibs({ assetLibs: this.studio_assets });
           
	       const studioMode = 'main';
           if(studioMode == 'main') {
	           await this._openMainStudio();
           } 
       },

       _openMainStudio: async function() {
	       var action = this.action_manager.getCurrentAction();
           var controller = this.action_manager.getCurrentController();
           this.do_action('studio_editor_action', {
	           action: action,
               controllerState: controller.widget.exportState(),
               viewType: controller.viewType,
           })
        }
    })
    
});