# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class viin_web_studio(models.Model):
#     _name = 'viin_web_studio.viin_web_studio'
#     _description = 'viin_web_studio.viin_web_studio'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
