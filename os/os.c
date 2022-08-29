#include <SDL2/SDL.h>

SDL_Window *window;
SDL_Renderer *renderer;

SDL_Rect btn_new_rect;
SDL_Rect btn_left_rect;

void render()
{
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(renderer);

  SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);

  SDL_RenderDrawRect(renderer, &btn_new_rect);
  SDL_RenderDrawRect(renderer, &btn_left_rect);

  SDL_RenderPresent(renderer);
}

int is_collision_with_rect(int x, int y, SDL_Rect rect) {
  if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y < rect.y + rect.h) {
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

    if (is_collision_with_rect(mouse_down_event->x * 2, mouse_down_event->y * 2, btn_new_rect)) {
    
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

  render();

  SDL_SetEventFilter(event_filter, NULL);

  SDL_Event event;
  SDL_WaitEvent(&event);

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);

  SDL_Quit();

  return 0;
}