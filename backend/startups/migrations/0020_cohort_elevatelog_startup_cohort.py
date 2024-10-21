# Generated by Django 4.2.7 on 2024-10-18 11:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        (
            "readinesslevel",
            "0006_calculatorcategory_alter_readinesstype_rl_type_and_more",
        ),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("startups", "0019_startuprna_is_ai_generated"),
    ]

    operations = [
        migrations.CreateModel(
            name="Cohort",
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
                ("name", models.CharField(max_length=100)),
            ],
            options={
                "db_table": "cohorts",
            },
        ),
        migrations.CreateModel(
            name="ElevateLog",
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
                ("previous_level", models.IntegerField()),
                ("new_level", models.IntegerField()),
                (
                    "mentor",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="elevate_logs",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "readiness_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="elevate_logs",
                        to="readinesslevel.readinesstype",
                    ),
                ),
                (
                    "startup",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="elevate_logs",
                        to="startups.startup",
                    ),
                ),
            ],
            options={
                "db_table": "elevate_logs",
            },
        ),
        migrations.AddField(
            model_name="startup",
            name="cohort",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="startups",
                to="startups.cohort",
            ),
        ),
    ]
