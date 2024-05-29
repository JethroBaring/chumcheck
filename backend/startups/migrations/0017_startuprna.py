# Generated by Django 4.2.7 on 2024-05-29 08:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        (
            "readinesslevel",
            "0006_calculatorcategory_alter_readinesstype_rl_type_and_more",
        ),
        ("startups", "0016_capsuleproposalinfo"),
    ]

    operations = [
        migrations.CreateModel(
            name="StartupRNA",
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
                ("rna", models.TextField()),
                (
                    "readiness_level",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="startup_rnas",
                        to="readinesslevel.readinesslevel",
                    ),
                ),
                (
                    "startup",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="rnas",
                        to="startups.startup",
                    ),
                ),
            ],
            options={
                "db_table": "startup_rnas",
            },
        ),
    ]