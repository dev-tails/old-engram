from notes.models import Note, User

engram_models = [Note, User]


class DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model in engram_models:
            return "engram"
        return None

    def db_for_write(self, model, **hints):
        if model in engram_models:
            return "engram"
        return None
