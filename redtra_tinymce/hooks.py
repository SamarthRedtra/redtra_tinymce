app_name = "redtra_tinymce"
app_title = "Redtra tinyMCE TextEditor"
app_publisher = "Samarth Upare"
app_description = "Redtra TinyMCE TextEditor is a customizable and intuitive rich text editor for seamless content creation and editing in web applications."
app_email = "samarth.upare@redtra.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/redtra_tinymce/css/redtra_tinymce.css"
# app_include_js = "/assets/redtra_tinymce/js/redtra_tinymce.js"

# include js, css files in header of web template
# web_include_css = "/assets/redtra_tinymce/css/redtra_tinymce.css"
# web_include_js = "/assets/redtra_tinymce/js/redtra_tinymce.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "redtra_tinymce/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "redtra_tinymce/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "redtra_tinymce.utils.jinja_methods",
# 	"filters": "redtra_tinymce.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "redtra_tinymce.install.before_install"
# after_install = "redtra_tinymce.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "redtra_tinymce.uninstall.before_uninstall"
# after_uninstall = "redtra_tinymce.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "redtra_tinymce.utils.before_app_install"
# after_app_install = "redtra_tinymce.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "redtra_tinymce.utils.before_app_uninstall"
# after_app_uninstall = "redtra_tinymce.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "redtra_tinymce.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"redtra_tinymce.tasks.all"
# 	],
# 	"daily": [
# 		"redtra_tinymce.tasks.daily"
# 	],
# 	"hourly": [
# 		"redtra_tinymce.tasks.hourly"
# 	],
# 	"weekly": [
# 		"redtra_tinymce.tasks.weekly"
# 	],
# 	"monthly": [
# 		"redtra_tinymce.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "redtra_tinymce.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "redtra_tinymce.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "redtra_tinymce.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["redtra_tinymce.utils.before_request"]
# after_request = ["redtra_tinymce.utils.after_request"]

# Job Events
# ----------
# before_job = ["redtra_tinymce.utils.before_job"]
# after_job = ["redtra_tinymce.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"redtra_tinymce.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

