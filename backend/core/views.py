import os
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated


# Allowed upload types and the folder they should be stored in
UPLOAD_TYPE_DIRS = {
    'photo': 'drivers/photos/',
    'license': 'drivers/licenses/',
    'medical': 'drivers/medical/',
    'receipt': 'receipts/',
}

ALLOWED_EXTENSIONS = {
    'photo': ['.jpg', '.jpeg', '.png', '.webp'],
    'license': ['.pdf', '.jpg', '.jpeg', '.png'],
    'medical': ['.pdf', '.jpg', '.jpeg', '.png'],
    'receipt': ['.pdf', '.jpg', '.jpeg', '.png'],
}


class FileUploadView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"detail": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        # Determine upload type (defaults to 'receipt')
        upload_type = request.data.get('upload_type', 'receipt')
        if upload_type not in UPLOAD_TYPE_DIRS:
            upload_type = 'receipt'

        upload_dir = UPLOAD_TYPE_DIRS[upload_type]
        allowed_exts = ALLOWED_EXTENSIONS[upload_type]

        # Validate file size (max 10MB for license/medical, 5MB for others)
        max_size = 10 * 1024 * 1024 if upload_type in ('license', 'medical') else 5 * 1024 * 1024
        if file_obj.size > max_size:
            mb = max_size // (1024 * 1024)
            return Response(
                {"detail": f"File size exceeds the {mb}MB limit."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate file extension
        ext = os.path.splitext(file_obj.name)[1].lower()
        if ext not in allowed_exts:
            return Response(
                {"detail": f"Invalid file type. Allowed: {', '.join(allowed_exts).upper()}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save file to storage
        file_name = default_storage.save(f'{upload_dir}{file_obj.name}', file_obj)
        file_url = f"{settings.MEDIA_URL}{file_name}"
        absolute_url = request.build_absolute_uri(file_url)

        return Response({
            "url": absolute_url,
            "relative_url": file_url,
            "filename": os.path.basename(file_name),
        }, status=status.HTTP_201_CREATED)
