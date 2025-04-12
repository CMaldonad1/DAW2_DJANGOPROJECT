# Generated by Django 4.2.19 on 2025-04-09 17:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('botiga', '0009_factura_gtoenvio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='factura',
            name='gtoEnvio',
        ),
        migrations.RemoveField(
            model_name='lineafactura',
            name='talla',
        ),
        migrations.RemoveField(
            model_name='lineafactura',
            name='var',
        ),
        migrations.AddField(
            model_name='lineafactura',
            name='tallavar',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='botiga.tallavariant'),
            preserve_default=False,
        ),
    ]
