# Generated by Django 3.1.1 on 2020-09-19 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Posts', '0002_auto_20200919_1915'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='post',
            name='reason',
            field=models.TextField(blank=True, default=''),
        ),
    ]
