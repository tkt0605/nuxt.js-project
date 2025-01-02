# Generated by Django 5.1.4 on 2025-01-02 11:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_addtodo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todolist',
            name='title',
        ),
        migrations.AddField(
            model_name='todolist',
            name='auther',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='todos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='addtodo',
            name='todo_tag',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tasks', to='api.todolist'),
        ),
    ]
