CC = cc
CFLAGS = -Wall -I /opt/homebrew/include
TARGET = main

LDFLAGS = `pkg-config --libs SDL2`

main: main.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

.PHONY: clean
clean:
	$(RM) $(TARGET)