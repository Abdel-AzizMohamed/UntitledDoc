from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Document(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="Documents", null=True
    )


class Chapter(models.Model):
    name = models.CharField(max_length=100)
    document = models.ForeignKey(
        Document, on_delete=models.CASCADE, related_name="chapters"
    )
    creation_date = models.DateTimeField(auto_now_add=True)


class Section(models.Model):
    name = models.CharField(max_length=100)
    chapter = models.ForeignKey(
        Chapter, on_delete=models.CASCADE, related_name="sections"
    )
    creation_date = models.DateTimeField(auto_now_add=True)

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]


class Record(models.Model):
    name = models.CharField(max_length=100)
    section = models.ForeignKey(
        Section, on_delete=models.CASCADE, related_name="records", blank=True, null=True
    )
    chapter = models.ForeignKey(
        Chapter, on_delete=models.CASCADE, related_name="records"
    )
    content = models.TextField(blank=True, null=True)
    slug = models.SlugField(unique=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    modification_date = models.DateTimeField(auto_now=True)
    draft = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
