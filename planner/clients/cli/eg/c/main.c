#include <stdio.h>

#define MAX_LINE_SIZE 512

int main(int argc, char *argv[])
{
  FILE *fp = fopen("notes.txt", "a");

  char buffer[MAX_LINE_SIZE];

  fgets(buffer, MAX_LINE_SIZE, stdin);
  printf("%s", buffer);
  fputs(buffer, fp);

  return 0;
}