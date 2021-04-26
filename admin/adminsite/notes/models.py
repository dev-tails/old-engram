from django.db import models
from djongo.models import ObjectIdField

NOTE_TYPE_CHOICES = [
    ("note", "Note"),
    ("event", "Event"),
    ("task", "Task"),
    ("task_completed", "Completed Task"),
    ("page", "Page"),
    ("workspace", "Workspace"),
]


class User(models.Model):
    _id = ObjectIdField()
    username = models.CharField(max_length=60)
    email = models.EmailField()

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.email


class Note(models.Model):
    _id = ObjectIdField()
    localId = models.CharField(max_length=37)

    user = models.ForeignKey("User", on_delete=models.CASCADE)

    type = models.CharField(max_length=15, choices=NOTE_TYPE_CHOICES, default="note")
    body = models.TextField()

    start = models.DateTimeField()

    createdAt = models.DateTimeField()
    syncedAt = models.DateTimeField()
    updatedAt = models.DateTimeField()

    class Meta:
        db_table = "notes"

    def __str__(self):
        return self.body
