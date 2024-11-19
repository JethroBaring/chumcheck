# Generated by Django 4.2.7 on 2024-01-05 13:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0008_technologycalculator_technologycalculatorscore_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='technologycalculatorscore',
            name='technology_calculator',
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='competitive',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='competitive_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='go_to_market',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='go_to_market_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='product_definition',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='product_definition_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='product_development',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='product_development_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='supply_chain',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='supply_chain_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='team',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='team_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='technology',
            field=models.CharField(default='hello', max_length=200),
        ),
        migrations.AddField(
            model_name='technologycalculator',
            name='technology_score',
            field=models.IntegerField(default=1, max_length=1),
        ),
        migrations.AlterField(
            model_name='technologycalculator',
            name='startup_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='technology_calculator', to='startups.startup'),
        ),
        migrations.DeleteModel(
            name='TechnologyCalculatorAnswer',
        ),
        migrations.DeleteModel(
            name='TechnologyCalculatorScore',
        ),
    ]