# Generated by Django 5.1.7 on 2025-03-28 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_alter_addtodo_todo_alter_library_goal_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='library',
            name='name_plain',
            field=models.CharField(db_index=True, default='', max_length=50),
        ),
    ]
