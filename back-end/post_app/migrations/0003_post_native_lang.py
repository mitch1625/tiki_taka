# Generated by Django 5.0 on 2023-12-11 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post_app', '0002_post_post_content_post_poster'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='native_lang',
            field=models.TextField(null=True),
        ),
    ]