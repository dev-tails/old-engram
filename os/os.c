#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

#define NUM_APPS 2

typedef enum State {
  STATE_APP_SELECT = 0,
  STATE_APP_LOG,
  STATE_APP_PAPER,
  STATE_NUM
} State;

typedef struct AppIcon {
  SDL_Rect rect;
  char name[32];
  State state;
} AppIcon;

SDL_Window *window;
SDL_Renderer *renderer;
TTF_Font *font = NULL;

const int font_size = 28;

State state = STATE_APP_SELECT;

AppIcon app_icons[NUM_APPS];

void render()
{
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(renderer);

  if (state == STATE_APP_SELECT) {
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);

    for (int i = 0; i < NUM_APPS; i++) {
      const AppIcon *icon = &app_icons[i];
      SDL_RenderDrawRect(renderer, &icon->rect);

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
  }

  SDL_RenderPresent(renderer);
}

int is_collision_with_rect(int x, int y, const SDL_Rect *rect) {
  if (x >= rect->x && x <= rect->x + rect->w && y >= rect->y && y < rect->y + rect->h) {
    return 1;
  } else {
    return 0;
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

      }
    }
  }
  else if (event->type == SDL_KEYDOWN)
  {
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
  strcpy(app_icons[1].name, "paper");

  int x = 0;
  int padding = 16;
  for (int i = 0; i < NUM_APPS; i++) {
      AppIcon *icon = &app_icons[i];
      icon->rect.x = x;
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