# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class ViinWebStudio(http.Controller):
    @http.route('/viin_studio/get_view_arch', auth='user', type='json')
    def get_view_arch(self, model, view_type, view_id):
        """
        This function return view arch for studio to be editable
        """
        View = request.env['ir.ui.view'].sudo()
        if not view_id:
            view_id = View.default_view(request.env[model]._name, view_type)
            
        ir_model = request.env['ir.model'].search([('model', '=', model)])
        task_form_arch = """
            <data>\n  
                <xpath expr="//field[@name=\'stage_id\']" position="replace"/>\n  
                <xpath expr="//form[1]/sheet[1]/notebook[1]" position="inside">\n    
                    <page string="New Page" name="studio_page_Pcrif" attrs="{}" invisible="1">\n      
                        <group name="studio_group_Pcrif">\n        
                            <group name="studio_group_Pcrif_left"/>\n        
                            <group name="studio_group_Pcrif_right"/>\n      </group>\n    
                    </page>\n  
                </xpath>\n
            </data>\n
        """
        return {
            'studio_view_id': view_id,
            'studio_view_arch': task_form_arch,
        }
