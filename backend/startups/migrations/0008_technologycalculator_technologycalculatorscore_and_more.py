# Generated by Django 4.2.7 on 2024-01-05 13:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0007_alter_uratquestionanswer_score'),
    ]

    operations = [
        migrations.CreateModel(
            name='TechnologyCalculator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_updated', models.DateTimeField(auto_now=True)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('datetime_deleted', models.DateTimeField(default=None, null=True)),
                ('technology_level', models.IntegerField()),
                ('commercialization_level', models.IntegerField()),
                ('startup_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='startups.startup')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TechnologyCalculatorScore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_updated', models.DateTimeField(auto_now=True)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('datetime_deleted', models.DateTimeField(default=None, null=True)),
                ('technology_score', models.IntegerField(max_length=1)),
                ('product_development_score', models.IntegerField(max_length=1)),
                ('product_definition_score', models.IntegerField(max_length=1)),
                ('competitive_scorfe', models.IntegerField(max_length=1)),
                ('team_score', models.IntegerField(max_length=1)),
                ('go_to_market_score', models.IntegerField(max_length=1)),
                ('supply_chain_score', models.IntegerField(max_length=1)),
                ('technology_calculator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calculator_score', to='startups.technologycalculator')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TechnologyCalculatorAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_updated', models.DateTimeField(auto_now=True)),
                ('datetime_created', models.DateTimeField(auto_now_add=True)),
                ('datetime_deleted', models.DateTimeField(default=None, null=True)),
                ('technology', models.CharField(max_length=200)),
                ('product_development', models.CharField(max_length=200)),
                ('product_definition', models.CharField(max_length=200)),
                ('competitive', models.CharField(max_length=200)),
                ('team', models.CharField(max_length=200)),
                ('go_to_market', models.CharField(max_length=200)),
                ('supply_chain', models.CharField(max_length=200)),
                ('technology_calculator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calculator_answer', to='startups.technologycalculator')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
