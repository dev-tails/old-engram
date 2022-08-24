CC = cc
CFLAGS = -Wall -g -I /opt/homebrew/include
TARGET = ceg

LDFLAGS = `pkg-config --libs SDL2 SDL2_ttf`


ceg: main.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: main.c
	install ceg $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)