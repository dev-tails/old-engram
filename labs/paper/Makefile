CC = cc
CFLAGS = -Wall -g -I /opt/homebrew/include
TARGET = paper

LDFLAGS = `pkg-config --libs SDL2`


paper: paper.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: paper.c
	install paper $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)