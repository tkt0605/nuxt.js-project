# Generated by Django 5.1.6 on 2025-02-21 12:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_librarytodo_title_alter_librarytodo_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='librarytodo',
            old_name='linrary',
            new_name='library',
        ),
    ]
