from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

class RegisterView(APIView):
    """
    API endpoint to handle user registration.
    Uses RegisterSerializer to validate input and create a User.
    """
    def post(self, request):
        serializer = RegisterSerializer(
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "status": True,
                    "message": "User registration successful"
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class LoginView(APIView):
    """
    API endpoint to handle user login.
    Verifies credentials and manually generates JWT access and refresh tokens.
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user against the Django auth database
        user = authenticate(username=username, password=password)

        if user is not None:
            # Generate JWT tokens (Access and Refresh) for the logged-in user
            refresh = RefreshToken.for_user(user)
            return Response({
                "status": True,
                "message": "User login successful",
                "username": user.username,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
            
        # Return error if authentication fails
        return Response({
            "status": False,
            "detail": "Invalid username or password"
        }, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """
    API endpoint to handle user logout.
    Accepts the refresh token and blacklists it to terminate the session.
    We don't strictly require IsAuthenticated permission class here so that 
    users can log out even if their short-lived access token has expired.
    """
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({
                    "status": False,
                    "detail": "Refresh token is required to logout"
                }, status=status.HTTP_400_BAD_REQUEST)

            # Initialize the RefreshToken object with the token string
            token = RefreshToken(refresh_token)
            
            # Blacklist the token, which writes it to the database blacklist table 
            # and prevents it from being used to obtain new access tokens.
            token.blacklist()

            return Response({
                "status": True,
                "message": "User logged out successfully"
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            # Handle token errors (e.g. if the token is already expired/blacklisted or invalid)
            return Response({
                "status": False,
                "detail": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
