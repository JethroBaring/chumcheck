# Generated by Django 4.2.7 on 2024-01-04 06:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('readinesslevel', '0002_alter_levelcriterion_excellent_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='scoringguide',
            name='level_criteria',
        ),
        migrations.AddField(
            model_name='scoringguide',
            name='readiness_level',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='scoring_guides', to='readinesslevel.readinesslevel'),
        ),
    ]
