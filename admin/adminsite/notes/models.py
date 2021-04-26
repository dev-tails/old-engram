from django.db import models
from djongo.models import ObjectIdField

NOTE_TYPE_CHOICES = [
    ("note", "Note"),
    ("event", "Event"),
    ("task", "Task"),
    ("task_completed", "Completed Task"),
]


class Note(models.Model):
    _id = ObjectIdField()
    type = models.CharField(max_length=15, choices=NOTE_TYPE_CHOICES, default="note")
    body = models.TextField()

    class Meta:
        db_table = "notes"

    def __str__(self):
        return self.body
