#include <stdio.h>
#include <string.h>

#define MAX_BLOCK_TITLE_SIZE 256
#define MAX_BLOCKS 1024

typedef struct block
{
  int id;
  char title[MAX_BLOCK_TITLE_SIZE];
} block_t;

int main()
{
  block_t blocks[MAX_BLOCKS];
  unsigned int current_index = 0;

  while (current_index < MAX_BLOCKS)
  {
    block_t *current_block = &blocks[current_index];

    fgets(current_block->title, MAX_BLOCK_TITLE_SIZE, stdin);
    size_t str_len = strlen(current_block->title);
    current_block->title[str_len - 1] = '\0';
    if (str_len == 1)
    {
      break;
    }
    current_index++;
  }

  return 0;
}