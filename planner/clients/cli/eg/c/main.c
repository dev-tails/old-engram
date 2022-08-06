#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <pwd.h>
#include <stdlib.h>
#include <sys/stat.h>

#ifdef _WIN32
#include <conio.h>
#else
#include <stdio.h>
#define clrscr() printf("\e[1;1H\e[2J")
#endif
#define MAX_LINE_SIZE 512

const char* notes_path = "~/.engram/notes.txt";

int main(int argc, char *argv[])
{
  clrscr();

  struct stat st = {0};

  const char *home_dir = getenv("HOME");
  char engram_dir[128];
  
  sprintf(engram_dir, "%s/%s", home_dir, ".engram");

  if (stat(engram_dir, &st) == -1) {
      mkdir(engram_dir, 0700);
  }

  int running = 1;
  int consecutive_newlines = 0;

  char notes_file_path[128];
  sprintf(notes_file_path, "%s/%s", engram_dir, "notes.txt");

  FILE *fp = fopen(notes_file_path, "a");
  if (fp == NULL) {
    return 1;
  }

  char buffer[MAX_LINE_SIZE];

  do {
    fgets(buffer, MAX_LINE_SIZE, stdin);

    if (buffer[0] == '\n') {
      if (consecutive_newlines > 0) {
        running = 0;
      } else {
        consecutive_newlines++;
        clrscr();
      }
    } else {
      consecutive_newlines = 0;
      fputs(buffer, fp);
    }
  } while(running);

  return 0;
}