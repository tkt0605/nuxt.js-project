# Generated by Django 5.1.4 on 2025-01-02 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_todolist_title_todolist_auther_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolist',
            name='title',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]