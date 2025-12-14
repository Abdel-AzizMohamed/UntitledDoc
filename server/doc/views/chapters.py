from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from doc.models import Document, Chapter


class ChaptersGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, page, document_id):
        chapters = []

        for document in Chapter.objects.filter(document=document_id).all():
            chapters.append(
                {
                    "id": document.id,
                    "name": document.name,
                    "creationDate": document.creation_date,
                }
            )

        paginate = Paginator(chapters, 10)

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


class ChapterCreationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, document_id):
        name = request.data.get("name")

        document = Document.objects.get(id=document_id)

        chp = Chapter.objects.create(name=name, document=document)
        chp.save()

        return Response(
            {
                "message": {
                    "text": "successfully inserted a chapter.",
                    "type": "success",
                }
            },
            status=status.HTTP_201_CREATED,
        )


class ChapterEditView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, chapter_id):
        Chapter.objects.filter(id=chapter_id).delete()

        return Response(
            {
                "message": {
                    "text": f"successfully deleted the chapter '{chapter_id}'",
                    "type": "success",
                }
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request, chapter_id):
        name = request.data.get("name")
        document_id = request.data.get("documentId")

        document = Document.objects.get(id=document_id)
        chapter = Document.objects.get(id=chapter_id)

        chapter.name = name
        chapter.document = document

        return Response(
            {
                "message": {
                    "text": f"successfully edited the chapter '{chapter_id}'",
                    "type": "success",
                }
            },
            status=status.HTTP_200_OK,
        )
