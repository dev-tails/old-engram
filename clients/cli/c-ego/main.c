#include <stdio.h>
#include <string.h>

#define MAX_BLOCK_TITLE_SIZE 128
#define MAX_BLOCKS 1024

typedef struct block
{
  int id;
  char title[MAX_BLOCK_TITLE_SIZE];
} block_t;

unsigned int current_index = 0;
block_t blocks[MAX_BLOCKS];

int read_from_file() {
  FILE *fp = fopen("cego.db", "rb");
  for (int i = 0; i < MAX_BLOCKS; i++) {
    block_t *current_block = &blocks[i];
    fread(current_block, sizeof(char), sizeof(block_t), fp);
    if (strlen(current_block->title) == 0) {
      current_index = i + 1;
      break;
    }
  }
  return fclose(fp);
}

int write_to_file() {
  FILE *fp = fopen("cego.db", "w");
  for (int i = 0; i < current_index; i++) {
    block_t *current_block = &blocks[i];
    fwrite(current_block, sizeof(char), sizeof(block_t), fp);
  }
  return fclose(fp);
}

int main()
{
  read_from_file();

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

  write_to_file();

  return 0;
}