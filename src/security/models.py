# -*- encoding: UTF-8 -*-

class UserSession(object):
	def __init__(self,json_data, access_token):
		
		self.access_token = access_token
		#=======================================================================
		# self.id_user = json_data['id_user']
		# self.id_bee = json_data['id_bee']
		#=======================================================================
		self.login = json_data['login']
		self.email = json_data['email']
		self.full_name = json_data['full_name']