from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from doc.models import Document


class DocumentsGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, page):
        documents = []

        for document in Document.objects.filter(user=request.user).all():
            documents.append(
                {
                    "id": document.id,
                    "name": document.name,
                    "description": document.description,
                    "slug": document.slug,
                    "creationDate": document.creation_date,
                }
            )

        paginate = Paginator(documents, 10)

        pag_page = paginate.get_page(page)
        pag_data = list(pag_page.object_list)

        return Response(
            {
                "message": {
                    "text": "successfully retrieved all documents.",
                    "type": "success",
                },
                "data": pag_data,
                "totalPages": paginate.num_pages,
                "hasNext": pag_page.has_next(),
                "hasPrevious": pag_page.has_previous(),
            },
            status=status.HTTP_200_OK,
        )


class DocumentCreationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get("name")
        description = request.data.get("description")
        slug = request.data.get("slug")
        user = request.user

        doc = Document.objects.create(
            name=name, description=description, slug=slug, user=user
        )
        doc.save()

        return Response(
            {
                "message": {
                    "text": "successfully inserted a document.",
                    "type": "success",
                }
            },
            status=status.HTTP_201_CREATED,
        )


class DocumentEditView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, document_id):
        Document.objects.filter(id=document_id).delete()

        return Response(
            {
                "message": {
                    "text": f"successfully deleted the document '{document_id}'",
                    "type": "success",
                }
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request, document_id):
        name = request.data.get("name")
        description = request.data.get("description")
        slug = request.data.get("slug")

        document = Document.objects.get(id=document_id)

        document.name = name
        document.description = description
        document.slug = slug

        return Response(
            {
                "message": {
                    "text": f"successfully edited the document '{document_id}'",
                    "type": "success",
                }
            },
            status=status.HTTP_200_OK,
        )
