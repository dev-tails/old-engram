#include <SDL2/SDL.h>

#define MAX_SEGMENTS 1024
#define MAX_POINTS_IN_SEGMENT 1024

SDL_Window *window;
SDL_Renderer *renderer;

int point = 0;
int current_segment = -1;
SDL_Point points[MAX_SEGMENTS][MAX_POINTS_IN_SEGMENT];
int points_in_segment[MAX_SEGMENTS];

int is_drawing = 0;
int current_drawing_id = 0;

SDL_Rect btn_new_rect;

void render()
{
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(renderer);

  SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);

  SDL_RenderDrawRect(renderer, &btn_new_rect);

  for (int i = 0; i < current_segment + 1; i++)
  {
    SDL_RenderDrawLines(renderer, (SDL_Point *)&points[i], points_in_segment[i]);
  }

  SDL_RenderPresent(renderer);
}

void load_drawing(int id)
{
  char *pref_path = SDL_GetPrefPath("xyzdigital", "engram");
  char drawing_filename_buffer[128];
  sprintf(drawing_filename_buffer, "%spaper/drawings/%d.paper", pref_path, id);

  SDL_RWops *drawing_file = SDL_RWFromFile(drawing_filename_buffer, "r");
  if (drawing_file == NULL)
  {
    printf("drawing %d does not exist", id);
    return;
  }

  SDL_RWread(drawing_file, &current_segment, sizeof(current_segment), 1);
  for (int i = 0; i < current_segment; i++)
  {
    SDL_RWread(drawing_file, &points_in_segment[i], sizeof(int), 1);
    SDL_RWread(drawing_file, points[i], sizeof(SDL_Point), points_in_segment[i]);
  }

  SDL_RWclose(drawing_file);

  SDL_free(pref_path);

  current_drawing_id = id;

  render();
}

void save()
{
  char *pref_path = SDL_GetPrefPath("xyzdigital", "engram");

  char drawing_filename_buffer[128];
  sprintf(drawing_filename_buffer, "%spaper/drawings/%d.paper", pref_path, current_drawing_id);
  SDL_RWops *drawing_file = SDL_RWFromFile(drawing_filename_buffer, "w+");

  int num_segments = current_segment + 1;
  SDL_RWwrite(drawing_file, &num_segments, sizeof(int), 1);
  for (int i = 0; i < num_segments; i++)
  {
    int num_points_in_segment = points_in_segment[i];
    SDL_RWwrite(drawing_file, &num_points_in_segment, sizeof(int), 1);
    SDL_RWwrite(drawing_file, &points[i], sizeof(SDL_Point), num_points_in_segment);
  }
  SDL_RWclose(drawing_file);
  SDL_free(pref_path);
}

int is_collision_with_rect(int x, int y, SDL_Rect rect) {
  if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y < rect.y + rect.h) {
    return 1;
  } else {
    return 0;
  }
}

void clear_current_points() {
  memset(&points, 0, sizeof(SDL_Point) * MAX_SEGMENTS * MAX_POINTS_IN_SEGMENT);
}

void add_point(int x, int y) {
  points[current_segment][point].x = x;
  points[current_segment][point].y = y;

  point++;
  points_in_segment[current_segment] = point;
}

static int SDLCALL event_filter(void *userdata, SDL_Event *event)
{
  if (event->type == SDL_QUIT)
  {
    return 1;
  }
  else if (is_drawing && event->type == SDL_MOUSEMOTION && point < MAX_POINTS_IN_SEGMENT && current_segment < MAX_SEGMENTS)
  {
    const SDL_MouseMotionEvent *mouse_motion_event = (SDL_MouseMotionEvent *)event;

    add_point(mouse_motion_event->x * 2, mouse_motion_event->y * 2);

    render();
  }
  else if (event->type == SDL_MOUSEBUTTONDOWN)
  {
    const SDL_MouseButtonEvent *mouse_down_event = (SDL_MouseButtonEvent *)event;

    if (is_collision_with_rect(mouse_down_event->x * 2, mouse_down_event->y * 2, btn_new_rect)) {
      current_drawing_id++;
      clear_current_points();
    } else {
      current_segment++;
      is_drawing = 1;
      add_point(mouse_down_event->x * 2, mouse_down_event->y * 2);
    }
    render();
  }
  else if (event->type == SDL_MOUSEBUTTONUP)
  {
    if (is_drawing) {
      points_in_segment[current_segment] = point;
      point = 0;
      is_drawing = 0;
    }
  }
  else if (event->type == SDL_KEYDOWN)
  {
    if (event->key.keysym.sym == SDLK_BACKSPACE)
    {
      if (current_segment >= 0)
      {
        current_segment--;
      }

      render();
    }
    else if (event->key.keysym.sym == SDLK_s)
    {
      save();
    }
    else if (event->key.keysym.sym == SDLK_l)
    {
      load_drawing(0);
    }
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

void init_app()
{
  btn_new_rect.x = 50;
  btn_new_rect.y = 0;
  btn_new_rect.w = 36;
  btn_new_rect.h = 36;
}

int main(int argc, char *argv[])
{
  init_sdl();

  init_app();

  render();

  SDL_SetEventFilter(event_filter, NULL);

  SDL_Event event;
  SDL_WaitEvent(&event);

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);

  SDL_Quit();

  return 0;
}