from django.contrib import admin

from .models import Note, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("_id", "username", "email")


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("_id", "type", "body")
