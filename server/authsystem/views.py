from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.settings import api_settings

from .serializer import RegisterSerializer, UserSerializer


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": {"text": "Account created successfully!", "type": "success"}},
            status=status.HTTP_201_CREATED,
        )

    errors = serializer.errors
    first_field = next(iter(errors))
    first_error = {"message": {"text": errors[first_field][0], "type": "error"}}

    return Response(first_error, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    max_age = int(api_settings.REFRESH_TOKEN_LIFETIME.total_seconds())
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"message": "Email and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(email=email, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response(
            {
                "message": {"text": "Logged in successfully!", "type": "success"},
                "accessToken": str(access),
            },
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=settings.PRODUCTION,
            samesite="None" if settings.PRODUCTION else "Lax",
            max_age=max_age,
        )

        return response

    return Response(
        {"message": {"text": "Invalid email or password.", "type": "error"}},
        status=status.HTTP_401_UNAUTHORIZED,
    )


@api_view(["POST"])
def refresh_token(request):
    refresh_token = request.COOKIES.get("refresh_token")

    if refresh_token is None:
        return Response(
            {
                "message": {
                    "text": "Refresh token not found in cookie.",
                    "type": "error",
                }
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        refresh = RefreshToken(refresh_token)
        access_token = refresh.access_token

        return Response(
            {
                "message": {"text": "Refreshed token successfully!", "type": "success"},
                "access": str(access_token),
                "access_expires_at": access_token["exp"],
            },
            status=status.HTTP_200_OK,
        )
    except TokenError:
        return Response(
            {"message": {"text": "Invalid or expired refresh token.", "type": "error"}},
            status=status.HTTP_401_UNAUTHORIZED,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    refresh_token = request.COOKIES.get("refresh_token")
    print(request.COOKIES)

    if not refresh_token:
        return Response(
            {"message": {"text": "No refresh token found.", "type": "error"}},
            status=400,
        )

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
    except TokenError:
        return Response(
            {"message": {"text": "Invalid or expired refresh token.", "type": "error"}},
            status=status.HTTP_400_BAD_REQUEST,
        )

    response = Response(
        {"message": {"text": "Logged out successfully.", "type": "success"}},
        status=status.HTTP_200_OK,
    )
    response.delete_cookie("refresh_token")

    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_token(request):
    return Response(
        {
            "message": {"text": "Access token is valid!", "type": "success"},
            "user": {"id": request.user.id, "username": request.user.username},
        },
        status=status.HTTP_200_OK,
    )
