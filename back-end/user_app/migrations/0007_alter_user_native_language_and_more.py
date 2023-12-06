# Generated by Django 5.0 on 2023-12-05 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0006_alter_user_native_language_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='native_language',
            field=models.CharField(blank=True, choices=[('en', 'English'), ('ko', 'Korean'), ('es', 'Spanish')], null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='target_language',
            field=models.CharField(blank=True, choices=[('en', 'English'), ('ko', 'Korean'), ('es', 'Spanish')], null=True),
        ),
    ]