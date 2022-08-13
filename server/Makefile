CC = cc
CFLAGS = -Wall
TARGET = egs

egs: server.c
	$(CC) $(CFLAGS) $^ -o $@

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: server.c
	install egs $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)