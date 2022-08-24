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

int main(int argc, char *argv[])
{
  clrscr();

  struct stat st = {0};

  const char *home_dir = getenv("HOME");
  char engram_dir[128];

  sprintf(engram_dir, "%s/%s", home_dir, ".engram");

  if (stat(engram_dir, &st) == -1)
  {
    mkdir(engram_dir, 0700);
  }

  int running = 1;
  int consecutive_newlines = 0;

  char notes_file_path[128];
  sprintf(notes_file_path, "%s/%s", engram_dir, "notes.txt");

  char buffer[MAX_LINE_SIZE];

  do
  {
    fgets(buffer, MAX_LINE_SIZE, stdin);

    if (buffer[0] == '\n')
    {
      if (consecutive_newlines > 0)
      {
        running = 0;
      }
      else
      {
        consecutive_newlines++;
        clrscr();
      }
    } else if (buffer[0] == 'l' && buffer[1] == '\n') {
      consecutive_newlines = 0;

      const int MAX_LINES = 10000;
      char lines[MAX_LINES][MAX_LINE_SIZE];
      int index = 0;

      FILE *notes_read_file_pointer = fopen(notes_file_path, "r");

      while(fgets(lines[index], MAX_LINE_SIZE, notes_read_file_pointer) != NULL) {
        index++;
        if (index >= MAX_LINES) {
          printf("Exceeded MAX_LINES\n");
          break;
        }
      }

      int start_index = 0;
      if (index - 50 > 0) {
        start_index = index - 50;
      }

      for (int i = start_index; i < index; i++) {
        printf("%s", lines[i]);
      }
    }
    else
    {
      consecutive_newlines = 0;
      FILE *fp = fopen(notes_file_path, "a");
      fputs(buffer, fp);
      fclose(fp);
    }
  } while (running);

  return 0;
}