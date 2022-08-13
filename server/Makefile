CC = cc
CFLAGS = -Wall
TARGET = egs

egs: server.c
	$(CC) $(CFLAGS) $^ -o bin/egs

egc: client.c
	$(CC) $(CFLAGS) $^ -o bin/egc

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: server.c
	install bin/egs $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)