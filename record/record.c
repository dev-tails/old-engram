#include <SDL2/SDL.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <time.h>

const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;

// Maximum recording time
const int MAX_RECORDING_SECONDS = 180;

// Maximum recording time plus padding
const int RECORDING_BUFFER_SECONDS = MAX_RECORDING_SECONDS + 1;

int recordingDeviceId = -1;

SDL_Window *gWindow = NULL;
SDL_Renderer *gRenderer = NULL;

int gRecordingDeviceCount = 0;

// Recieved audio spec
SDL_AudioSpec gReceivedRecordingSpec;
SDL_AudioSpec gReceivedPlaybackSpec;

// Recording data buffer
Uint8 *gRecordingBuffer = NULL;

// Size of data buffer
Uint32 gBufferByteSize = 0;

// Position in data buffer
Uint32 gBufferBytePosition = 0;

// Maximum position in data buffer for recording
Uint32 gBufferByteMaxPosition = 0;

struct soundhdr
{
  char riff[4];          /* "RIFF"                                  */
  Uint32 flength;        /* file length in bytes                    */
  char wave[4];          /* "WAVE"                                  */
  char fmt[4];           /* "fmt "                                  */
  Uint32 chunk_size;     /* size of FMT chunk in bytes (usually 16) */
  Uint16 format_tag;     /* 1=PCM, 257=Mu-Law, 258=A-Law, 259=ADPCM */
  Uint16 num_chans;      /* 1=mono, 2=stereo                        */
  Uint32 srate;          /* Sampling rate in samples per second     */
  Uint32 bytes_per_sec;  /* bytes per second = srate*bytes_per_samp */
  Uint16 bytes_per_samp; /* 2=16-bit mono, 4=16-bit stereo          */
  Uint16 bits_per_samp;  /* Number of bits per sample               */
  char data[4];          /* "data"                                  */
  Uint32 dlength;        /* data length in bytes (filelength - 44)  */
};

struct soundhdr wavh;

void audioRecordingCallback(void *userdata, Uint8 *stream, int len)
{
  memcpy(&gRecordingBuffer[gBufferBytePosition], stream, len);

  gBufferBytePosition += len;
}

void start_recording()
{
  memset(gRecordingBuffer, 0, gBufferByteSize);

  SDL_PauseAudioDevice(recordingDeviceId, SDL_FALSE);
}

void stop_recording()
{
  SDL_PauseAudioDevice(recordingDeviceId, SDL_TRUE);

  time_t seconds = time(NULL);
  struct tm *current_time = localtime(&seconds);

  const char *home_dir = getenv("HOME");
  char engram_dir[128];

  sprintf(engram_dir, "%s/%s", home_dir, ".engram");

  char day_folder_name[64];
  sprintf(
      day_folder_name,
      "%s/%02d-%02d-%02d",
      engram_dir,
      current_time->tm_year + 1900,
      current_time->tm_mon + 1,
      current_time->tm_mday);

  mkdir(engram_dir, 0777);
  mkdir(day_folder_name, 0777);

  char recording_file_name[128];
  sprintf(recording_file_name, "%s/%02d_%02d_%02d-%ld.wav", day_folder_name, current_time->tm_hour, current_time->tm_min, current_time->tm_sec, seconds);

  wavh.flength = gBufferByteSize + 44;
  wavh.dlength = gBufferByteSize;

  SDL_RWops *file = SDL_RWFromFile(recording_file_name, "w");
  SDL_RWwrite(file, (char *)&wavh, 44, 1);

  SDL_RWwrite(file, gRecordingBuffer, gBufferBytePosition, 1);
  SDL_RWclose(file);

  gBufferBytePosition = 0;
}

int main()
{
  SDL_zero(wavh);
  strncpy(wavh.riff, "RIFF", 4);
  strncpy(wavh.wave, "WAVE", 4);
  strncpy(wavh.fmt, "fmt ", 4);
  strncpy(wavh.data, "data", 4);

  wavh.chunk_size = 16;
  wavh.format_tag = 1;
  wavh.num_chans = 1;
  wavh.srate = 16000;
  wavh.bits_per_samp = 16;

  if (SDL_Init(SDL_INIT_AUDIO) < 0)
  {
    printf("SDL could not initialize! SDL Error: %s\n", SDL_GetError());
    return 1;
  }
  else
  {
    gWindow = SDL_CreateWindow("Record", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if (gWindow == NULL)
    {
      printf("Window could not be created! SDL Error: %s\n", SDL_GetError());
      return 1;
    }
  }

  gRecordingDeviceCount = SDL_GetNumAudioDevices(SDL_TRUE);

  SDL_AudioSpec desiredRecordingSpec;
  SDL_zero(desiredRecordingSpec);
  desiredRecordingSpec.freq = 16000;
  desiredRecordingSpec.format = AUDIO_S16;
  desiredRecordingSpec.channels = 1;
  desiredRecordingSpec.samples = 2048;
  desiredRecordingSpec.callback = audioRecordingCallback;

  recordingDeviceId = SDL_OpenAudioDevice(SDL_GetAudioDeviceName(0, SDL_TRUE), SDL_TRUE, &desiredRecordingSpec, &gReceivedRecordingSpec, SDL_AUDIO_ALLOW_FORMAT_CHANGE);

  int bytesPerSample = gReceivedRecordingSpec.channels * (SDL_AUDIO_BITSIZE(gReceivedRecordingSpec.format) / 8);
  int bytesPerSecond = gReceivedRecordingSpec.freq * bytesPerSample;
  gBufferByteSize = RECORDING_BUFFER_SECONDS * bytesPerSecond;
  gBufferByteMaxPosition = MAX_RECORDING_SECONDS * bytesPerSecond;

  gRecordingBuffer = malloc(sizeof(int8_t) * gBufferByteSize);

  SDL_Event e;
  int quit = 0;
  while (!quit)
  {
    // Handle events on queue
    while (SDL_PollEvent(&e) != 0)
    {
      // User requests quit
      if (e.type == SDL_QUIT)
      {
        quit = 1;
      }
      else if (e.type == SDL_KEYDOWN)
      {
        switch (e.key.keysym.sym)
        {
        case SDLK_ESCAPE:
          stop_recording();
          break;
        default:
          break;
        }
      }
      else if (e.type == SDL_KEYUP)
      {
        switch (e.key.keysym.sym)
        {
        case SDLK_SPACE:
          SDL_Delay(200);
          start_recording();
          break;
        }
      }
    }

    if (gBufferBytePosition > gBufferByteMaxPosition)
    {
      stop_recording();
    }

    SDL_Delay(50);
  }

  return 0;
}