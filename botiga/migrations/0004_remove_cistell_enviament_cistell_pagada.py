# Generated by Django 4.2.19 on 2025-04-09 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('botiga', '0003_alter_cistell_enviament'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cistell',
            name='enviament',
        ),
        migrations.AddField(
            model_name='cistell',
            name='pagada',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
