# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-12-07 17:58
from __future__ import unicode_literals

from django.db import migrations
from django.db import models

import kolibri.core.content.models
import kolibri.core.fields
import kolibri.core.notifications.models
import kolibri.utils.time


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='LearnerProgressNotification',
            fields=[
                ('id', kolibri.core.content.models.UUIDField(primary_key=True, serialize=False)),
                (
                    'notification_type',
                    models.CharField(
                        blank=True,
                        choices=[
                            (
                                kolibri.core.notifications.models.NotificationType('ResourceIndividualCompletion'),
                                'ResourceIndividualCompletion',
                            ),
                            (
                                kolibri.core.notifications.models.NotificationType('QuizIndividualCompletion'),
                                'QuizIndividualCompletion',
                            ),
                            (
                                kolibri.core.notifications.models.NotificationType(
                                    'LessonResourceIndividualNeedsHelpEvent'
                                ),
                                'LessonResourceIndividualNeedsHelpEvent',
                            ),
                            (
                                kolibri.core.notifications.models.NotificationType(
                                    'LessonResourceIndividualCompletion'
                                ),
                                'LessonResourceIndividualCompletion',
                            ),
                        ],
                        max_length=200,
                    ),
                ),
                ('user_id', kolibri.core.content.models.UUIDField()),
                ('classroom_id', kolibri.core.content.models.UUIDField()),
                ('channel_id', kolibri.core.content.models.UUIDField(null=True)),
                ('contentnode_id', kolibri.core.content.models.UUIDField(null=True)),
                ('lesson_id', kolibri.core.content.models.UUIDField(null=True)),
                ('quiz_id', kolibri.core.content.models.UUIDField(null=True)),
                (
                    'reason',
                    models.CharField(
                        blank=True,
                        choices=[
                            (
                                kolibri.core.notifications.models.HelpReason('MultipleUnsuccessfulAttempts'),
                                'MultipleUnsuccessfulAttempts',
                            )
                        ],
                        max_length=200,
                    ),
                ),
                ('timestamp', kolibri.core.fields.DateTimeTzField(default=kolibri.utils.time.local_now)),
            ],
        )
    ]
