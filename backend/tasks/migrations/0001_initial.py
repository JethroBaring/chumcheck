# Generated by Django 4.2.7 on 2024-05-12 13:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        (
            "readinesslevel",
            "0006_calculatorcategory_alter_readinesstype_rl_type_and_more",
        ),
        ("startups", "0014_alter_readinesslevelcriterionanswer_startup"),
    ]

    operations = [
        migrations.CreateModel(
            name="Task",
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
                ("priority_number", models.SmallIntegerField()),
                ("description", models.CharField(blank=True, max_length=500)),
                (
                    "status",
                    models.IntegerField(
                        choices=[
                            (1, "For Review"),
                            (2, "Discontinued"),
                            (3, "Delayed"),
                            (4, "Scheduled"),
                            (5, "On Track"),
                            (6, "Completed"),
                        ],
                        default=1,
                    ),
                ),
                (
                    "task_type",
                    models.IntegerField(choices=[(1, "Short Term"), (2, "Long Term")]),
                ),
                (
                    "readiness_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tasks",
                        to="readinesslevel.readinesstype",
                    ),
                ),
                (
                    "startup",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tasks",
                        to="startups.startup",
                    ),
                ),
                (
                    "target_level",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="target_levels",
                        to="readinesslevel.readinesslevel",
                    ),
                ),
                (
                    "target_level_score",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="target_level_scores",
                        to="readinesslevel.readinesslevel",
                    ),
                ),
            ],
            options={
                "db_table": "tasks",
                "ordering": ["priority_number"],
            },
        ),
        migrations.CreateModel(
            name="Roadblock",
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
                ("risk_number", models.SmallIntegerField()),
                ("description", models.CharField(blank=True, max_length=500)),
                ("fix", models.CharField(blank=True, max_length=500)),
                (
                    "assignee",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="roadblocks",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "startup",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="roadblocks",
                        to="startups.startup",
                    ),
                ),
            ],
            options={
                "db_table": "roadblocks",
                "ordering": ["risk_number"],
            },
        ),
        migrations.CreateModel(
            name="Initiative",
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
                ("initiative_number", models.SmallIntegerField()),
                ("description", models.CharField(blank=True, max_length=500)),
                ("measures", models.CharField(blank=True, max_length=200)),
                ("targets", models.CharField(blank=True, max_length=200)),
                ("remarks", models.CharField(blank=True, max_length=200)),
                (
                    "status",
                    models.IntegerField(
                        choices=[
                            (1, "For Review"),
                            (2, "Discontinued"),
                            (3, "Delayed"),
                            (4, "Scheduled"),
                            (5, "On Track"),
                            (6, "Completed"),
                        ],
                        default=1,
                    ),
                ),
                (
                    "task",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="initiatives",
                        to="tasks.task",
                    ),
                ),
            ],
            options={
                "db_table": "initiatives",
                "ordering": ["initiative_number"],
            },
        ),
    ]
