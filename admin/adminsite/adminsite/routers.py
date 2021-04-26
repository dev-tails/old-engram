from notes.models import Note


class DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model == Note:
            return "engram"
        return None

    def db_for_write(self, model, **hints):
        if model == Note:
            return "engram"
        return None
