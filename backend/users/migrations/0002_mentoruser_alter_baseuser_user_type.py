# Generated by Django 4.2.7 on 2023-12-10 10:26

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="MentorUser",
            fields=[
                (
                    "baseuser_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
            bases=("users.baseuser",),
        ),
        migrations.AlterField(
            model_name="baseuser",
            name="user_type",
            field=models.CharField(
                choices=[("M", "Manager"), ("S", "Startup"), ("ME", "Mentor")],
                max_length=2,
                verbose_name="User Type",
            ),
        ),
    ]
