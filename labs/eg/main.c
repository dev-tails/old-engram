#include <stdbool.h>
#include <string.h>

#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

#define MAX_LINE_SIZE 512

const int max_lines = 50;

char lines[max_lines][MAX_LINE_SIZE];

bool done = false;
const int font_size = 28;
int line_index = 0;

SDL_Window *window;
SDL_Renderer *renderer;
TTF_Font *font = NULL;

void clear();
void render();

static int SDLCALL event_filter(void *userdata, SDL_Event *event)
{
  if (event->type == SDL_QUIT)
  {
    return 1;
  }
  else if (event->type == SDL_KEYDOWN)
  {
    if (event->key.keysym.sym == SDLK_RETURN)
    {
      char *pref_path = SDL_GetPrefPath("xyzdigital", "engram");
      char notes_filename_buffer[128];
      sprintf(notes_filename_buffer, "%s%s", pref_path, "notes.txt");
      SDL_free(pref_path);

      if (strlen(lines[line_index]) == 0)
      {
        line_index = 0;
        for (int i = 0; i < max_lines; i++)
        {
          lines[i][0] = 0;
        }
        render();
      }
      else if (lines[line_index][0] == 'l' && lines[line_index][1] == 0) {
        const int MAX_LINES = 10000;
        char read_lines[MAX_LINES][MAX_LINE_SIZE];
        int read_line_index = 0;

        SDL_RWops *file = SDL_RWFromFile(notes_filename_buffer, "r");

        const int buffer_read_block_size = 1024;
        char read_file_buffer[buffer_read_block_size];
        int num_read = 0;
        int current_char_index = 0;
        do {
          num_read = SDL_RWread(file, read_file_buffer, 1, buffer_read_block_size);

          for (int i = 0; i < num_read; i++) {
            char c = read_file_buffer[i];
            read_lines[read_line_index][current_char_index] = c;
            current_char_index++;
            
            if (c == '\n') {
              current_char_index = 0;
              read_line_index++;
            }
          }

          if (read_line_index >= MAX_LINES) {
            printf("Exceeded MAX_LINES\n");
            break;
          }
        } while(num_read > 0);

        SDL_RWclose(file);

        const int num_lines_to_show = 40;
        int start_index = 0;
        if (read_line_index - num_lines_to_show > 0) {
          start_index = read_line_index - num_lines_to_show;
        }

        line_index = 0;
        for (int i = 0; i < max_lines; i++)
        {
          lines[i][0] = 0;
        }

        for (int i = start_index; i < read_line_index; i++) {
          strcpy(lines[line_index], read_lines[i]);
          line_index++;
        }
        render();
      }
      else
      {
        strcat(lines[line_index], "\n");

        SDL_RWops *file = SDL_RWFromFile(notes_filename_buffer, "a");
        SDL_RWwrite(file, lines[line_index], 1, strlen(lines[line_index]));
        SDL_RWclose(file);

        line_index += 1;

        render();
      }
    }
    else if (event->key.keysym.sym == SDLK_BACKSPACE)
    {
      if (SDL_GetModState() & (KMOD_CTRL | KMOD_LGUI)) {
        lines[line_index][0] = 0;
      } else {
        lines[line_index][strlen(lines[line_index]) - 1] = 0;
      }
      render();
    }
    else if (event->key.keysym.sym == SDLK_ESCAPE)
    {
    }
    else if( event->key.keysym.sym == SDLK_v && SDL_GetModState() & (KMOD_CTRL | KMOD_LGUI) )
    {
        char* clipboard_text = SDL_GetClipboardText();
        const int current_length = strlen(lines[line_index]);

        const int max_characters_to_copy = MAX_LINE_SIZE - current_length;

        strncpy(lines[line_index] + current_length, clipboard_text, max_characters_to_copy);
        SDL_free(clipboard_text);

        render();
    }
  }
  else if (event->type == SDL_TEXTINPUT)
  {
    strcat(lines[line_index], event->text.text);
    render();
  }

  return 0;
}

int main(int argc, char *argv[])
{
  SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO);

  TTF_Init();	
  font = TTF_OpenFont("arial.ttf", font_size);
  if (!font) {
    return 1;
  }

  SDL_ShowCursor(0);

  SDL_DisplayMode DM;
  SDL_GetCurrentDisplayMode(0, &DM);

  window = SDL_CreateWindow("engram",
                            SDL_WINDOWPOS_UNDEFINED,
                            SDL_WINDOWPOS_UNDEFINED,
                            DM.w,
                            DM.h,
                            SDL_WINDOW_SHOWN | SDL_WINDOW_ALLOW_HIGHDPI | SDL_WINDOW_FULLSCREEN_DESKTOP | SDL_WINDOW_RESIZABLE);

  renderer = SDL_CreateRenderer(window,
                                -1,
                                SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);

  clear();

  SDL_SetEventFilter(event_filter, NULL);

  render();

  SDL_Event event;
  SDL_WaitEvent(&event);

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);

  TTF_CloseFont(font);
  TTF_Quit();
  SDL_Quit();

  return 0;
}

void clear()
{
  SDL_RenderClear(renderer);
}

void render()
{
  clear();

  for (int i = 0; i < line_index + 1; i++) {
    SDL_Color color = { 255, 255, 255 };
    SDL_Surface * surface = TTF_RenderText_Solid(font, lines[i], color);

    SDL_Texture * texture = SDL_CreateTextureFromSurface(renderer, surface);

    int texW = 0;
    int texH = 0;
    SDL_QueryTexture(texture, NULL, NULL, &texW, &texH);
    SDL_Rect dstrect = { 0, font_size * (i + 1), texW, texH };

    SDL_RenderCopy(renderer, texture, NULL, &dstrect);
    SDL_DestroyTexture(texture);
    SDL_FreeSurface(surface);
  }

  SDL_RenderPresent(renderer);
}