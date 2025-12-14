from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from doc.models import Chapter, Section


class SectionsGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, page, chapter_id):
        sections = []

        for section in Section.objects.filter(chapter=chapter_id).all():
            sections.append(
                {
                    "id": section.id,
                    "name": section.name,
                    "creationDate": section.creation_date,
                    "order": section.order,
                }
            )

        paginate = Paginator(sections, 10)

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


class SectionCreationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, chapter_id):
        name = request.data.get("name")

        chapter = Chapter.objects.get(id=chapter_id)

        sec = Section.objects.create(name=name, chapter=chapter)
        sec.save()

        return Response(
            {
                "message": {
                    "text": "successfully inserted a section.",
                    "type": "success",
                }
            },
            status=status.HTTP_201_CREATED,
        )


class SectionEditView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, section_id):
        Section.objects.filter(id=section_id).delete()

        return Response(
            {
                "message": {
                    "text": f"successfully deleted the chapter '{section_id}'",
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
