#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <pwd.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/socket.h> /* socket, connect */
#include <netinet/in.h> /* struct sockaddr_in, struct sockaddr */
#include <netdb.h> /* struct hostent, gethostbyname */
#include <arpa/inet.h>


#ifdef _WIN32
#include <conio.h>
#else
#include <stdio.h>
#define clrscr() printf("\e[1;1H\e[2J")
#endif
#define MAX_LINE_SIZE 512

void error(const char * message) {
  printf("%s", message);
}

// https://stackoverflow.com/questions/22077802/simple-c-example-of-doing-an-http-post-and-consuming-the-response
void post_to_engram(const char* body) {
  int portno =        4000;
  char *host =        "localhost";
  char content[MAX_LINE_SIZE];
  sprintf(content, "{\"body\": \"%s\"}\r\n", body);
  int content_length = strlen(content);
  char *message_fmt = "POST /api/notes HTTP/1.0\r\n"
    "Host: %s\r\n"
    "Accept: application/json\r\n"
    "Content-Type: application/json\r\n"
    "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjI1OTIwMDAsInVzZXIiOiI2MmVlYTBlNmRiYjNlMTY0NzFmYjI4MjQiLCJpYXQiOjE2NTk4MDU5NzJ9.T2ryUZF_S1U578dNJIfCKX8Or5P9p74z7DmHt8SzDNY\r\n"
    "Content-Length: %d\r\n\r\n"
    "%s\r\n";

  struct hostent *server;
  struct sockaddr_in serv_addr;
  int sockfd, bytes, sent, received, total;
  char message[1024], response[4096];

  sprintf(message, message_fmt, host, content_length, content);

  sockfd = socket(AF_INET, SOCK_STREAM, 0);
  if (sockfd < 0) {
    error("ERROR opening socket");
  }

  server = gethostbyname(host);
  if (server == NULL) {
    error("ERROR, no such host");
  }

  memset(&serv_addr,0,sizeof(serv_addr));
  serv_addr.sin_family = AF_INET;
  serv_addr.sin_port = htons(portno);
  // memcpy(&serv_addr.sin_addr.s_addr,server->h_addr,server->h_length);
  serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

  int connect_res = connect(sockfd,(struct sockaddr *)&serv_addr,sizeof(serv_addr));
  if (connect_res < 0) {
    error("ERROR connecting");
  }

  total = strlen(message);
  sent = 0;
  do {
      bytes = write(sockfd,message+sent,total-sent);
      if (bytes < 0)
          error("ERROR writing message to socket");
      if (bytes == 0)
          break;
      sent+=bytes;
  } while (sent < total);

  memset(response,0,sizeof(response));
    total = sizeof(response)-1;
    received = 0;
    do {
        bytes = read(sockfd,response+received,total-received);
        if (bytes < 0)
            error("ERROR reading response from socket");
        if (bytes == 0)
            break;
        received+=bytes;
    } while (received < total);

  close(sockfd);
}

int main(int argc, char *argv[])
{
  clrscr();

  struct stat st = {0};

  const char *home_dir = getenv("HOME");
  char engram_dir[128];

  sprintf(engram_dir, "%s/%s", home_dir, ".engram");

  if (stat(engram_dir, &st) == -1)
  {
    mkdir(engram_dir, 0700);
  }

  char config_file_path[128];
  sprintf(config_file_path, "%s/%s", engram_dir, "config");

  FILE *config_fp = fopen(config_file_path, "r");
  if (config_fp == NULL)
  {
    return 1;
  }

  char username[128];
  char password[128];

  int current_line_index = 0;
  char *line = NULL;
  size_t len = 0;
  ssize_t read;
  while ((read = getline(&line, &len, config_fp)) != -1)
  {
    if (current_line_index == 0) {
      strcpy(username, line);
    } else if (current_line_index == 1) {
      strcpy(password, line);
      break;
    }
    current_line_index++;
  }

  int running = 1;
  int consecutive_newlines = 0;

  char notes_file_path[128];
  sprintf(notes_file_path, "%s/%s", engram_dir, "notes.txt");

  FILE *fp = fopen(notes_file_path, "a");
  if (fp == NULL)
  {
    return 1;
  }

  char buffer[MAX_LINE_SIZE];

  do
  {
    fgets(buffer, MAX_LINE_SIZE, stdin);

    if (buffer[0] == '\n')
    {
      if (consecutive_newlines > 0)
      {
        running = 0;
      }
      else
      {
        consecutive_newlines++;
        clrscr();
      }
    }
    else
    {
      consecutive_newlines = 0;
      fputs(buffer, fp);

      buffer[strlen(buffer) - 1] = '\0';

      post_to_engram(buffer);
    }
  } while (running);

  return 0;
}