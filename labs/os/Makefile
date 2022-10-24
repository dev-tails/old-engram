CC = cc
CFLAGS = -Wall -I /opt/homebrew/include
TARGET = os

LDFLAGS = `pkg-config --libs SDL2 SDL2_ttf`


os: os.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: os.c
	install os $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)