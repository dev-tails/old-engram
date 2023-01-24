CC = cc
CFLAGS = -Wall -I /opt/homebrew/include
TARGET = record

LDFLAGS = `pkg-config --libs SDL2`

record: record.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

# https://stackoverflow.com/questions/39892692/how-to-implement-make-install-in-a-makefile
ifeq ($(PREFIX),)
    PREFIX := /usr/local
endif

install: record.c
	install record $(DESTDIR)$(PREFIX)/bin/

.PHONY: clean
clean:
	$(RM) $(TARGET)