from django.apps import AppConfig


class GamificationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "wellsee_backend.gamification"

    def ready(self):
        try:
            import wellsee_backend.gamification.signals  # noqa F401
        except ImportError:
            pass
