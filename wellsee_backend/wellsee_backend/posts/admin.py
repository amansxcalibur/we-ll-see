from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'deadline', 'status')
    search_fields = ('content', 'user__username')
    list_filter = ('status', 'deadline')
