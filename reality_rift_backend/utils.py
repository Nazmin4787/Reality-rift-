from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    logger = logging.getLogger("django")
    if response is not None:
        logger.error(f"DRF Exception: {exc} | Context: {context}")
        return response
    # For unhandled exceptions, return a generic error
    logger.critical(f"Unhandled Exception: {exc} | Context: {context}")
    return Response({"detail": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
