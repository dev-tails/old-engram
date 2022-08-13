#include <sys/socket.h>
#include <stdio.h>
#include <netdb.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>
#include <arpa/inet.h>

#define MAX 80
#define PORT 8082
#define SA struct sockaddr

void func(int connfd)
{
  char buff[MAX];
  bzero(buff, MAX);
  read(connfd, buff, sizeof(buff));

  char status = 0;
  write(connfd, &status, 1);
}

int main(void)
{
  struct sockaddr_in servaddr, cli;
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);

  servaddr.sin_family = AF_INET;
  servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
  servaddr.sin_port = htons(PORT);

  if ((bind(sockfd, (SA *)&servaddr, sizeof(servaddr))) != 0)
  {
    printf("socket bind failed...\n");
    exit(0);
  }
  else
  {
    printf("Socket successfully binded..\n");
  }

  if ((listen(sockfd, 5)) != 0)
  {
    printf("Listen failed...\n");
    exit(0);
  }
  else
  {
    printf("Server listening..\n");
  }

  socklen_t len = sizeof(cli);

  // Accept the data packet from client and verification
  int connfd = accept(sockfd, (SA *)&cli, &len);
  char *ip = inet_ntoa(cli.sin_addr);

  printf("%s", ip);

  if (connfd < 0)
  {
    printf("server accept failed...\n");
    exit(0);
  }
  else
  {
    printf("server accept the client...\n");
  }

  func(connfd);

  close(sockfd);

  return 0;
}