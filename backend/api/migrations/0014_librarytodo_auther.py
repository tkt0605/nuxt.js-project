# Generated by Django 5.1.6 on 2025-02-21 09:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_librarytoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='librarytodo',
            name='auther',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='作者', to=settings.AUTH_USER_MODEL),
        ),
    ]
