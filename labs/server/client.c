#include <time.h>
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

#define MAX 80
#define PORT 8082
#define SA struct sockaddr
void func(int sockfd)
{
	char buff[MAX];
  bzero(buff, sizeof(buff));
  // printf("Enter the string: ");
  // n = 0;
  // while ((buff[n++] = getchar()) != '\n');

  buff[0] = 'h';
  buff[1] = 'i';

  write(sockfd, buff, sizeof(buff));

  bzero(buff, sizeof(buff));
  int num_read = read(sockfd, buff, sizeof(buff));
  printf("From Server : %d %d", buff[0], num_read);
}

int main()
{
	int sockfd;
	struct sockaddr_in servaddr;

	// socket create and verification
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if (sockfd == -1) {
		printf("socket creation failed...\n");
		exit(0);
	}
	else
		printf("Socket successfully created..\n");
	bzero(&servaddr, sizeof(servaddr));

	// assign IP, PORT
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(PORT);
  
	// connect the client socket to server socket
	if (connect(sockfd, (SA*)&servaddr, sizeof(servaddr)) != 0) {
		printf("connection with the server failed...\n");
		exit(0);
	}
	else {
		printf("connected to the server..\n");
  }

	// function for chat
	func(sockfd);

	// close the socket
	close(sockfd);
}
