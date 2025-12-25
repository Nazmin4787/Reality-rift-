from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ErrorTestView(APIView):
    def get(self, request):
        raise ValueError("This is a test error for DRF exception handler.")
    from django.shortcuts import render

# Create your views here.
