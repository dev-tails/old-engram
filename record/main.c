#include <SDL2/SDL.h>
#include <stdio.h>
#include <string.h>

const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;

// Maximum recording time
const int MAX_RECORDING_SECONDS = 5;

// Maximum recording time plus padding
const int RECORDING_BUFFER_SECONDS = MAX_RECORDING_SECONDS + 1;

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

void audioRecordingCallback(void *userdata, Uint8 *stream, int len)
{
  memcpy(&gRecordingBuffer[gBufferBytePosition], stream, len);

  gBufferBytePosition += len;
}

int main()
{
  if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) < 0)
  {
    printf("SDL could not initialize! SDL Error: %s\n", SDL_GetError());
    return 1;
  }
  else
  {
    gWindow = SDL_CreateWindow("SDL Tutorial", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if (gWindow == NULL)
    {
      printf("Window could not be created! SDL Error: %s\n", SDL_GetError());
      return 1;
    }
    else
    {
      gRenderer = SDL_CreateRenderer(gWindow, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
      if (gRenderer == NULL)
      {
        printf("Renderer could not be created! SDL Error: %s\n", SDL_GetError());
        return 1;
      }
    }
  }

  gRecordingDeviceCount = SDL_GetNumAudioDevices(SDL_TRUE);

  SDL_AudioSpec desiredRecordingSpec;
  SDL_zero(desiredRecordingSpec);
  desiredRecordingSpec.freq = 8000;
  desiredRecordingSpec.format = AUDIO_F32;
  desiredRecordingSpec.channels = 1;
  desiredRecordingSpec.samples = 4096;
  desiredRecordingSpec.callback = audioRecordingCallback;

  int recordingDeviceId = SDL_OpenAudioDevice(SDL_GetAudioDeviceName(0, SDL_TRUE), SDL_TRUE, &desiredRecordingSpec, &gReceivedRecordingSpec, SDL_AUDIO_ALLOW_FORMAT_CHANGE);

  int bytesPerSample = gReceivedRecordingSpec.channels * (SDL_AUDIO_BITSIZE(gReceivedRecordingSpec.format) / 8);
  int bytesPerSecond = gReceivedRecordingSpec.freq * bytesPerSample;
  gBufferByteSize = RECORDING_BUFFER_SECONDS * bytesPerSecond;
  gBufferByteMaxPosition = MAX_RECORDING_SECONDS * bytesPerSecond;

  gRecordingBuffer = malloc(sizeof(int8_t) * gBufferByteSize);
  memset(gRecordingBuffer, 0, gBufferByteSize);

  SDL_PauseAudioDevice(recordingDeviceId, SDL_FALSE);

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
    }

    SDL_LockAudioDevice( recordingDeviceId );

    if( gBufferBytePosition > gBufferByteMaxPosition )
    {
      SDL_PauseAudioDevice( recordingDeviceId, SDL_TRUE );
      quit = 1;
      printf("quit");
    }

    SDL_UnlockAudioDevice( recordingDeviceId );
  }

  return 0;
}