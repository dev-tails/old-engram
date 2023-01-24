#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

#define NUM_APPS 2
#define MAX_APP_NAME_SIZE 32

typedef enum State {
  STATE_APP_SELECT = 0,
  STATE_APP_LOG,
  STATE_APP_PAPER,
  STATE_NUM
} State;

typedef struct AppIcon {
  SDL_Rect rect;
  char name[MAX_APP_NAME_SIZE];
  State state;
} AppIcon;

SDL_Window *window;
SDL_Renderer *renderer;
TTF_Font *font = NULL;

const int font_size = 28;

State state = STATE_APP_SELECT;

AppIcon app_icons[NUM_APPS];

char search_text[MAX_APP_NAME_SIZE];

int highlight_index = 0;

void render_text(const char* str, int x, int y) {
  SDL_Color color = { 255, 255, 255 };
  SDL_Surface * surface = TTF_RenderText_Solid(font, str, color);

  SDL_Texture * texture = SDL_CreateTextureFromSurface(renderer, surface);

  int texW = 0;
  int texH = 0;
  SDL_QueryTexture(texture, NULL, NULL, &texW, &texH);

  SDL_Rect dstrect = { 0, 0, texW, texH };

  SDL_RenderCopy(renderer, texture, NULL, &dstrect);
  SDL_DestroyTexture(texture);
  SDL_FreeSurface(surface);
}

void render()
{
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(renderer);

  if (state == STATE_APP_SELECT) {
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);

    render_text(search_text, 0, 0);

    for (int i = 0; i < NUM_APPS; i++) {
      const AppIcon *icon = &app_icons[i];

      if (strlen(search_text) > 0 && strstr(icon->name, search_text) == 0) {
        continue;
      }

      if (i == highlight_index) {
        SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);
      } else {
        SDL_SetRenderDrawColor(renderer, 128, 128, 128, SDL_ALPHA_OPAQUE);
      }

      SDL_RenderFillRect(renderer, &icon->rect);

      SDL_Color color = { 255, 255, 255 };
      SDL_Surface * surface = TTF_RenderText_Solid(font, icon->name, color);

      SDL_Texture * texture = SDL_CreateTextureFromSurface(renderer, surface);

      int texW = 0;
      int texH = 0;
      SDL_QueryTexture(texture, NULL, NULL, &texW, &texH);

      int half_icon_width = icon->rect.w * 0.5;

      SDL_Rect dstrect = { icon->rect.x + half_icon_width - texW * 0.5, icon->rect.y + icon->rect.h, texW, texH };

      SDL_RenderCopy(renderer, texture, NULL, &dstrect);
      SDL_DestroyTexture(texture);
      SDL_FreeSurface(surface);
    }
  } else if(state == STATE_APP_LOG) {
    render_text("log", 0, 0);
  }

  SDL_RenderPresent(renderer);
}

void update_state(State new_state) {
  state = new_state;
  render();
}

int is_collision_with_rect(int x, int y, const SDL_Rect *rect) {
  if (x >= rect->x && x <= rect->x + rect->w && y >= rect->y && y < rect->y + rect->h) {
    return 1;
  } else {
    return 0;
  }
}

void update_default_highlight_index() {
  if (strlen(search_text) == 0) {
    highlight_index = 0;
    return;
  }
  highlight_index = -1;
  for (int i = 0; i < NUM_APPS; i++) {
    const AppIcon *icon = &app_icons[i];
    if (strlen(search_text) > 0 && strstr(icon->name, search_text) != 0) {
      highlight_index = i;
      break;
    }
  }
}

static int SDLCALL event_filter(void *userdata, SDL_Event *event)
{
  if (event->type == SDL_QUIT)
  {
    return 1;
  }
  else if (event->type == SDL_MOUSEBUTTONDOWN)
  {
    const SDL_MouseButtonEvent *mouse_down_event = (SDL_MouseButtonEvent *)event;

    for (int i = 0; i < NUM_APPS; i++) {
      const AppIcon *icon = &app_icons[i];
      if (is_collision_with_rect(mouse_down_event->x * 2, mouse_down_event->y * 2, &icon->rect)) {
        update_state(icon->state);
      }
    }
  }
  else if (event->type == SDL_KEYDOWN)
  {
    if (event->key.keysym.sym == SDLK_RETURN) {
      if (highlight_index >= 0) {
        update_state(app_icons[highlight_index].state);
      }
    } else if (event->key.keysym.sym == SDLK_LEFT) {
      if (highlight_index > 0) {
        highlight_index--;
      }
    } else if (event->key.keysym.sym == SDLK_RIGHT) {
      if (highlight_index < NUM_APPS - 1) {
        highlight_index++;
      }
    } else if (event->key.keysym.sym == SDLK_BACKSPACE) {
      int len = strlen(search_text);
      if (len > 0) {
        search_text[len - 1] = 0;
      }
      update_default_highlight_index();
    } else if (event->key.keysym.sym == SDLK_ESCAPE) {
      update_state(STATE_APP_SELECT);
    }
    render();
  } else if (event->type == SDL_TEXTINPUT) {
    strcat(search_text, event->text.text);

    update_default_highlight_index();

    render();
  }

  return 0;
}

void init_sdl()
{
  SDL_Init(SDL_INIT_VIDEO);

  TTF_Init();	
  font = TTF_OpenFont("arial.ttf", font_size);

  SDL_DisplayMode DM;
  SDL_GetCurrentDisplayMode(0, &DM);

  window = SDL_CreateWindow("paper",
                            SDL_WINDOWPOS_UNDEFINED,
                            SDL_WINDOWPOS_UNDEFINED,
                            DM.w,
                            DM.h,
                            SDL_WINDOW_SHOWN | SDL_WINDOW_ALLOW_HIGHDPI | SDL_WINDOW_FULLSCREEN_DESKTOP | SDL_WINDOW_RESIZABLE);

  renderer = SDL_CreateRenderer(window,
                                -1,
                                SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
}

int main(int argc, char *argv[])
{
  init_sdl();

  strcpy(app_icons[0].name, "log");
  app_icons[0].state = STATE_APP_LOG;
  strcpy(app_icons[1].name, "paper");
  app_icons[1].state = STATE_APP_PAPER;

  int x = 0;
  int padding = 16;
  for (int i = 0; i < NUM_APPS; i++) {
      AppIcon *icon = &app_icons[i];
      icon->rect.x = x;
      icon->rect.y = 64;
      icon->rect.w = 200;
      icon->rect.h = 200;
      x += icon->rect.w + padding;
  }

  render();

  SDL_SetEventFilter(event_filter, NULL);

  SDL_Event event;
  SDL_WaitEvent(&event);

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);

  SDL_Quit();

  return 0;
}