#include <SDL2/SDL.h>

#define MAX_SEGMENTS 1024
#define MAX_POINTS_IN_SEGMENT 1024

SDL_Window *window;
SDL_Renderer *renderer;

int point = 0;
int current_segment = -1;
SDL_Point points[MAX_SEGMENTS][MAX_POINTS_IN_SEGMENT];
int points_in_segment[MAX_SEGMENTS];

int drawing = 0;

typedef struct DB {
  unsigned int version;
  unsigned int current_drawing;
  unsigned int num_drawings;
} DB;

typedef struct ShortPoint {
  unsigned short int x;
  unsigned short int y;
} ShortPoint;

void save() {
  char *pref_path = SDL_GetPrefPath("xyzdigital", "engram");
  char db_filename_buffer[128];
  sprintf(db_filename_buffer, "%spaper/%s", pref_path, "paper.db");

  DB db = {};
  SDL_RWops *db_read_file = SDL_RWFromFile(db_filename_buffer, "r");
  if (db_read_file == NULL) {
    printf("Failed to open db\n");
    return;
  } else {
    SDL_RWread(db_read_file, &db, sizeof(DB), 1);
    if (db.version == 0) {
      db.version = 1;
      db.num_drawings = 0;
      db.current_drawing = 0;
    }
  }

  db.current_drawing++;

  char drawing_filename_buffer[128];
  sprintf(drawing_filename_buffer, "%spaper/drawings/%d.paper", pref_path, db.current_drawing);
  SDL_RWops *drawing_file = SDL_RWFromFile(drawing_filename_buffer, "w+");
  
  ShortPoint points_for_save[MAX_POINTS_IN_SEGMENT];
  for (int i = 0; i < current_segment + 1; i++) {
    int num_points_in_segment = points_in_segment[i];
    for (int point_index = 0; point_index < num_points_in_segment; point_index++) {
      points_for_save[point_index].x = points[i][point_index].x;
      points_for_save[point_index].y = points[i][point_index].y;
    }
    SDL_RWwrite(drawing_file, &points_for_save, sizeof(short int), num_points_in_segment);
  }
  SDL_RWclose(drawing_file);
  SDL_free(pref_path);

  SDL_RWops *db_write_file = SDL_RWFromFile(db_filename_buffer, "w+");
  SDL_RWwrite(db_write_file, &db, sizeof(DB), 1);
  SDL_RWclose(db_write_file);
}

void render()
{
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, SDL_ALPHA_OPAQUE);
  SDL_RenderClear(renderer);

  SDL_SetRenderDrawColor(renderer, 255, 255, 255, SDL_ALPHA_OPAQUE);
  for (int i = 0; i < current_segment + 1; i++) {
    SDL_RenderDrawLines(renderer, (SDL_Point*) &points[i], points_in_segment[i]);
  }

  SDL_RenderPresent(renderer);
}

static int SDLCALL event_filter(void *userdata, SDL_Event *event)
{
  if (event->type == SDL_QUIT)
  {
    return 1;
  }
  else if (drawing && event->type == SDL_MOUSEMOTION && point < MAX_POINTS_IN_SEGMENT && current_segment < MAX_SEGMENTS)
  {
    const SDL_MouseMotionEvent *mouse_motion_event = (SDL_MouseMotionEvent *)event;

    points[current_segment][point].x = mouse_motion_event->x * 2;
    points[current_segment][point].y = mouse_motion_event->y * 2;

    point++;
    points_in_segment[current_segment] = point;

    render();
  }
  else if (event->type == SDL_MOUSEBUTTONDOWN)
  {
    current_segment++;
    drawing = 1;
  }
  else if (event->type == SDL_MOUSEBUTTONUP)
  {
    points_in_segment[current_segment] = point;
    point = 0;
    drawing = 0;
    render();
  } else if (event->type == SDL_KEYDOWN) {
    if (event->key.keysym.sym == SDLK_BACKSPACE) {
      if (current_segment >= 0) {
        current_segment--;
      }

      render();
    } else if (event->key.keysym.sym == SDLK_s) {
      save();
    }
  }

  return 0;
}

int main(int argc, char *argv[])
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

  SDL_SetEventFilter(event_filter, NULL);

  SDL_Event event;
  SDL_WaitEvent(&event);

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);

  SDL_Quit();

  return 0;
}