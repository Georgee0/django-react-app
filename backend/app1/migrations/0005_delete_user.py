# Generated by Django 4.2.1 on 2023-07-27 10:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0004_user_groups_user_is_active_user_is_admin_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
