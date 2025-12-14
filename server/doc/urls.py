from django.urls import path
from .views import documents, chapters, sections, records


documents_patterns = [
    path(
        "documents/<int:page>/",
        documents.DocumentsGetView.as_view(),
        name="document-retrieval",
    ),
    path(
        "document/", documents.DocumentCreationView.as_view(), name="document-creation"
    ),
    path(
        "document/<int:document_id>/",
        documents.DocumentEditView.as_view(),
        name="document-edit",
    ),
]

chapters_patterns = [
    path(
        "chapters/<int:page>/<int:document_id>/",
        chapters.ChaptersGetView.as_view(),
        name="chapter-retrieval",
    ),
    path(
        "document/<int:document_id>/chapter/",
        chapters.ChapterCreationView.as_view(),
        name="chapter-creation",
    ),
    path(
        "chapter/<int:chapter_id>/",
        chapters.ChapterEditView.as_view(),
        name="chapter-edit",
    ),
]

sections_patterns = [
    path(
        "sections/<int:page>/<int:chapter_id>/",
        sections.SectionsGetView.as_view(),
        name="section-retrieval",
    ),
    path(
        "chapter/<int:chapter_id>/section/",
        sections.SectionCreationView.as_view(),
        name="section-creation",
    ),
    path(
        "section/<int:section_id>/",
        sections.SectionEditView.as_view(),
        name="section-edit",
    ),
]

records_patterns = [
    path(
        "records/<int:page>/<int:chapter_id>/",
        records.RecordsGetView.as_view(),
        name="records-retrieval",
    ),
    path(
        "records/<int:document_id>/",
        records.RecordsGetAllView.as_view(),
        name="records-retrieval",
    ),
    path(
        "record/<int:document_id>/",
        records.RecordsGetFirstView.as_view(),
        name="records-retrieval",
    ),
    path(
        "chapter/<int:chapter_id>/record/",
        records.RecordCreationView.as_view(),
        name="records-creation",
    ),
    path(
        "record/<int:record_id>/",
        records.RecordEditView.as_view(),
        name="records-edit",
    ),
]

urlpatterns = (
    documents_patterns + chapters_patterns + sections_patterns + records_patterns
)
