import os
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

class FileUploadView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Validate File Size (max 5MB)
        max_size = 5 * 1024 * 1024
        if file_obj.size > max_size:
            return Response({"detail": "File size exceeds the 5MB limit."}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Validate File Type
        allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png']
        ext = os.path.splitext(file_obj.name)[1].lower()
        if ext not in allowed_extensions:
            return Response({"detail": "Invalid file type. Only PDF, JPG, JPEG, and PNG are allowed."}, status=status.HTTP_400_BAD_REQUEST)

        # 3. Save File
        file_name = default_storage.save(f'receipts/{file_obj.name}', file_obj)
        file_url = f"{settings.MEDIA_URL}{file_name}"
        absolute_url = request.build_absolute_uri(file_url)

        return Response({
            "url": absolute_url,
            "relative_url": file_url,
            "filename": os.path.basename(file_name)
        }, status=status.HTTP_201_CREATED)
