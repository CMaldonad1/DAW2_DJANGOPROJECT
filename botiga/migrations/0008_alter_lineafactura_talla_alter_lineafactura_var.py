# Generated by Django 4.2.19 on 2025-04-09 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('botiga', '0007_rename_iva_ivafactura_tipusiva_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lineafactura',
            name='talla',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='lineafactura',
            name='var',
            field=models.CharField(max_length=100),
        ),
    ]
