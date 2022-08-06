CC = cc
CFLAGS = -Wall
TARGET = ceg

ceg: main.c
	$(CC) $(CFLAGS) $^ -o $@

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: main.c
	install ceg $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)