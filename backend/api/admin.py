from django.contrib import admin
from .models import ToDOList, CustomUser, addToDO, Library, LibraryToDO, LibraryToken, LibraryAddToDO
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
class CustomUserAdmin(BaseUserAdmin):
    # model = CustomUser
    # list_display = ['email', 'code_name', 'is_active', 'is_staff', 'is_superuser']
    # list_filter = ('is_active', 'is_staff')
    # fieldsets = (
    #     (None, {'fields': ('email', 'password', "code_name")}),
    #     ('PersonalInfo', {'fields': ()}),
    #     ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')})
    # )
    # add_fieldsets = (
    #     (None, {'fields': {'email', 'code_name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'}})
    # )
    # search_fields = ('email',)
    # ordering = ('email',)
    model = CustomUser
    list_display = ['email', 'code_name', 'is_active', 'is_staff', 'is_superuser']
    list_filter = ('is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ('email', 'password', 'code_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {'fields': ('email', 'code_name', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')}),
    )

    search_fields = ('email',)
    ordering = ('email',)
admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(ToDOList)
admin.site.register(addToDO)
admin.site.register(LibraryToDO)
admin.site.register(LibraryAddToDO)
admin.site.register(Library)
admin.site.register(LibraryToken)
