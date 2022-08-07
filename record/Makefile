CC = cc
CFLAGS = -Wall -g -I /opt/homebrew/include
TARGET = main

LDFLAGS = `pkg-config --libs SDL2 SDL2_ttf SDL2_mixer`

main: main.c
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

.PHONY: clean
clean:
	$(RM) $(TARGET)