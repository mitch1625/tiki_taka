# Generated by Django 5.0 on 2023-12-15 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post_app', '0008_remove_post_lang'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='date_created',
            field=models.DateField(blank=True, null=True),
        ),
    ]