import os
from celery import Celery


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reality_rift_backend.settings")

app = Celery("reality_rift_backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
