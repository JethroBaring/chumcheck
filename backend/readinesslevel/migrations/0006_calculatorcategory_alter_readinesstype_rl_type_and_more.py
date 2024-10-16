# Generated by Django 4.2.7 on 2024-01-07 08:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("readinesslevel", "0005_alter_scoringguide_description"),
    ]

    operations = [
        migrations.CreateModel(
            name="CalculatorCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("datetime_updated", models.DateTimeField(auto_now=True)),
                ("datetime_created", models.DateTimeField(auto_now_add=True)),
                ("datetime_deleted", models.DateTimeField(default=None, null=True)),
                ("category", models.CharField(max_length=200)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AlterField(
            model_name="readinesstype",
            name="rl_type",
            field=models.CharField(
                choices=[
                    ("T", "Technology"),
                    ("M", "Market"),
                    ("A", "Acceptance"),
                    ("O", "Organizational"),
                    ("R", "Regulatory"),
                    ("I", "Investment"),
                    ("C", "Commercialization"),
                ],
                max_length=1,
            ),
        ),
        migrations.CreateModel(
            name="CalculatorQuestion",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("datetime_updated", models.DateTimeField(auto_now=True)),
                ("datetime_created", models.DateTimeField(auto_now_add=True)),
                ("datetime_deleted", models.DateTimeField(default=None, null=True)),
                ("question", models.CharField(max_length=500)),
                ("score", models.SmallIntegerField()),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="questions",
                        to="readinesslevel.calculatorcategory",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="calculatorcategory",
            name="readiness_type",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="calculator_categories",
                to="readinesslevel.readinesstype",
            ),
        ),
    ]
