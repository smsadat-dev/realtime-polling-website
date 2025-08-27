from django.contrib import admin

from .models.poll import Poll , Choice
from .models.vote import Vote

# Register models to admin panel

admin.site.register(Poll)
admin.site.register(Choice)
admin.site.register(Vote)
