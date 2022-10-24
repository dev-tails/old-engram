CC = cc
CFLAGS = -Wall -I /opt/homebrew/include
TARGET = eg

LDFLAGS = `pkg-config --libs --static SDL2 SDL2_ttf`


eg: main.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: main.c
	install eg $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)