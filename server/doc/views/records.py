from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from doc.models import Chapter, Section, Record


class RecordsGetFirstView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, document_id):
        data = []

        chapter = Chapter.objects.get(document=document_id)
        first_record = Record.objects.filter(chapter=chapter).first()
        data = {
            "id": first_record.id,
            "name": first_record.name,
            "content": first_record.content,
        }

        return Response(
            {
                "message": {
                    "text": "successfully retrieved all chapters.",
                    "type": "success",
                },
                "data": data,
            },
            status=status.HTTP_200_OK,
        )


class RecordsGetAllView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, document_id):
        data = []

        for chapter in Chapter.objects.filter(document=document_id).all():
            records = {
                "records": [],
                "chapter": {"id": chapter.id, "name": chapter.name},
            }
            for record in Record.objects.filter(chapter=chapter.id).all():
                records["records"].append(
                    {
                        "id": record.id,
                        "name": record.name,
                        "content": record.content,
                        "slug": record.slug,
                    }
                )
            data.append(records)

        return Response(
            {
                "message": {
                    "text": "successfully retrieved all chapters.",
                    "type": "success",
                },
                "data": data,
            },
            status=status.HTTP_200_OK,
        )


class RecordsGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, page, chapter_id):
        records = []

        for record in Record.objects.filter(chapter=chapter_id).all():
            records.append(
                {
                    "id": record.id,
                    "name": record.name,
                    "content": record.content,
                    "slug": record.slug,
                    "creationDate": record.creation_date,
                    "modificationDate": record.modification_date,
                    "draft": record.draft,
                    "order": record.order,
                }
            )

        paginate = Paginator(records, 10)

        pag_page = paginate.get_page(page)
        pag_data = list(pag_page.object_list)

        return Response(
            {
                "message": {
                    "text": "successfully retrieved all chapters.",
                    "type": "success",
                },
                "data": pag_data,
                "totalPages": paginate.num_pages,
                "hasNext": pag_page.has_next(),
                "hasPrevious": pag_page.has_previous(),
            },
            status=status.HTTP_200_OK,
        )


class RecordCreationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, chapter_id):
        name = request.data.get("name")
        content = request.data.get("content")
        slug = request.data.get("slug")
        draft = request.data.get("draft")
        section_id = request.data.get("sectionId")

        chapter = Chapter.objects.get(id=chapter_id)
        try:
            section = Section.objects.get(id=section_id)
        except Section.DoesNotExist:
            section = None

        rec = Record.objects.create(
            name=name,
            chapter=chapter,
            section=section,
            content=content,
            slug=slug,
            draft=draft,
        )
        rec.save()

        return Response(
            {
                "message": {
                    "text": "successfully inserted a section.",
                    "type": "success",
                }
            },
            status=status.HTTP_201_CREATED,
        )


class RecordEditView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, record_id):
        Record.objects.filter(id=record_id).delete()

        return Response(
            {
                "message": {
                    "text": f"successfully deleted the chapter '{record_id}'",
                    "type": "success",
                }
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request, section_id):
        name = request.data.get("name")
        chapter_id = request.data.get("chapterId")

        chapter = Chapter.objects.get(id=chapter_id)
        section = Section.objects.get(id=section_id)

        section.name = name
        section.chapter = chapter

        return Response(
            {
                "message": {
                    "text": f"successfully edited the chapter '{section_id}'",
                    "type": "success",
                }
            },
            status=status.HTTP_200_OK,
        )
